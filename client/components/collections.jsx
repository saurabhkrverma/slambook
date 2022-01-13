import React from 'react';
import { connect } from "react-redux"
import {Navigate} from "react-router-dom";
import {Row, Card, Spinner, Form, Button} from "react-bootstrap";
import { addCollectionAction, loadCollectionsAction, updateCollectionAction, deleteCollectionAction }  from "../actions/collection";
import { loadCollectionSpinnerAction }  from "../actions/spinner";
import { DEFAULT_COLLECTION } from "../config/constants"
import { Formik, Field, FieldArray } from 'formik'

class Collections extends React.Component {
    constructor(props) {
        super(props);

        this.createCollection = this.createCollection.bind(this);
        this.renderCollection = this.renderCollection.bind(this);
        this.deleteCollection = this.deleteCollection.bind(this);
        this.updateCollection = this.updateCollection.bind(this);
    }



    componentDidMount() {
        // this.props.showLoadCollectionsSpinner();
        this.props.loadCollections();
    }

    deleteCollection(collection) {
        if (confirm("Delete this slambook collection?") == true) {
            this.props.deleteCollection(collection);
        }
    }

    updateCollection(values, actions) {
        this.props.updateCollection(values);
    }

    createCollection(values, actions) {
        console.log("now we talking");
        console.log(values,actions);
        this.props.addCollection(values);
    }

    renderCollection() {
        const collections = _.get(this.props,'data.collections',[]);
        const collectionForms = collections.map((collection,collectionIdx)=>{
            return (
                <Card bg={"light"}
                      key={collection.collectionId}
                      text={"dark"}
                      className="col-10  col-md-5 collections-card">
                    <Card.Header as="h5">{collection.name}</Card.Header>
                    <Card.Body>
                        <Formik initialValues={collection} onSubmit={this.updateCollection} key={`formik-${collection.collectionId}`} onDelete>
                            {(props)=>(
                                <Form noValidate onSubmit={props.handleSubmit} key={`form-${collection.collectionId}`}>
                                    <FieldArray
                                        name="questionnaire"
                                        render={arrayHelpers => this.renderQuestions(props)} />

                                    <div className="form-group card-action-button" key={`formik-${collection.collectionId}-submit`}>
                                        <Button type="submit" disabled={!(props.isValid && props.dirty)}>Submit</Button>
                                        <Button type="button" onClick={()=>{this.deleteCollection(collection)}} variant="danger">Delete</Button>
                                    </div>

                                </Form>
                            )}
                        </Formik>
                    </Card.Body>
                </Card>
            )
        });
        return collectionForms;
    }

    renderQuestions(props) {
        return (
            <div>
                {
                    props.values.questionnaire.map((obj, index) => (
                        <Form.Group className="mb-3" key={index}>
                            <Form.Label>{ `Question ${index+1}` }</Form.Label>
                            <Field className="form-control" name={`questionnaire.${index}.question`} />
                        </Form.Group>
                    ))
                }
            </div>
        )
    }

    renderLoadedCollections() {
        if (this.props.app.spinner && this.props.app.spinner.loadCollectionSpinner) {
            return (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )
        } else if (this.props.data && this.props.data.collections) {
            return this.renderCollection();
        } else return null;
    }

    renderAddCollection() {
        const collection = DEFAULT_COLLECTION;
        return (
            <Card bg={"light"}
                  key={collection.collectionId}
                  text={"dark"}
                  className="col-10  col-md-5 collections-card">
                <Card.Header as="h5">{"Add a new collection"}</Card.Header>
                <Card.Body>
                    <Formik initialValues={collection} onSubmit={this.createCollection} key={`formik-${collection.collectionId}`} onDelete>
                        {(props)=>(
                            <Form noValidate onSubmit={props.handleSubmit} key={`form-${collection.collectionId}`}>

                                <Form.Group className="mb-3" controlId="new-collection-name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control name="new-collection-name" type="email" placeholder="Enter name of the collection" defaultValue={props.values.name}  onChange={props.handleChange}/>
                                </Form.Group>

                                <FieldArray
                                    name="questionnaire"
                                    render={arrayHelpers => this.renderQuestions(props)} />

                                <div className="form-group card-action-button" key={`formik-${collection.collectionId}-submit`}>
                                    <Button type="submit" disabled={!(props.isValid && props.dirty)}>Submit</Button>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </Card.Body>
            </Card>
        )
    }

    render(){
        if(!this.props.user.name) {
            return (<Navigate to={"/login"}></Navigate>)
        } else {
            return (
             <Row className={"collections-cards"}>
                 {this.renderLoadedCollections()}
                 {this.renderAddCollection()}
             </Row>
            )
        }

    }

}

const mapStateToProps = (state) => {
    return {
        app:state.app,
        data: state.data,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showLoadCollectionsSpinner: () => dispatch(loadCollectionSpinnerAction()),
        addCollection: (collection) => dispatch(addCollectionAction(collection)),
        loadCollections: () => dispatch(loadCollectionsAction()),
        updateCollection: (collection)=> dispatch(updateCollectionAction(collection)),
        deleteCollection: (collection)=> dispatch(deleteCollectionAction(collection))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Collections);
