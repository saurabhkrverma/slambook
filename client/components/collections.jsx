import React from 'react';
import { connect } from "react-redux"
import {Navigate} from "react-router-dom";
import {Row, Card, Spinner, Form, Button} from "react-bootstrap";
import { loadCollectionsAction, updateCollectionAction, deleteCollectionAction }  from "../actions/collection";
import { Formik, Field, FieldArray } from 'formik'

class Collections extends React.Component {
    constructor(props) {
        super(props);

        this.renderCollection = this.renderCollection.bind(this);
        this.deleteCollection = this.deleteCollection.bind(this);
        this.updateCollection = this.updateCollection.bind(this);
    }

    componentDidMount() {
        this.props.loadCollections();
    }

    deleteCollection(collection) {
        console.log(collection);
        if (confirm("Delete this slambook collection?") == true) {
            this.props.deleteCollection(collection);
        }
    }

    updateCollection(values, actions) {
        console.log(values);
        this.props.updateCollection(values);
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

    render(){

        if(!this.props.user.name) {
            return (<Navigate to={"/login"}></Navigate>)
        }
        if(this.props.data && this.props.data.collections) {
            return (
                <Row className={"collections-cards"}>
                    {this.renderCollection()}
                </Row>
            )
        }
        return(
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }

}

const mapStateToProps = (state) => {

    return {
        data: state.data,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadCollections: () => dispatch(loadCollectionsAction()),
        updateCollection: (collection)=> dispatch(updateCollectionAction(collection)),
        deleteCollection: (collection)=> dispatch(deleteCollectionAction(collection))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Collections);
