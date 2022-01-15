import React from 'react';
import { connect } from "react-redux"
import {Navigate} from "react-router-dom";
import {Row, Card, Form, Button, Carousel} from "react-bootstrap";
import { addCollectionAction, loadCollectionsAction, deleteCollectionAction }  from "../actions/collection";
import { DEFAULT_COLLECTION } from "../config/constants"
import { Formik, Field, FieldArray } from 'formik'

class Collections extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.loadCollections();
    }

    renderFooter(collection, props) {
        if(!collection.sampleCollection) {
            return (
                <Card.Footer className="text-muted">
                   share this collection with friends
                </Card.Footer>
            )
        } else {
            return null;
        }
    }

    handleSubmit(values, actions) {
        if(values.sampleCollection){
            values.name = values.collection_name;
            this.props.addCollection(values);
        } else {
            this.props.deleteCollection(values);
        }
    }

    renderNameField(collection, props){
        if(collection.sampleCollection){
            return (
                <Form.Group className="mb-3 form-inline"  key={"collection_name"}>
                    <Form.Label><i>slambook's name</i></Form.Label>
                    <Field className="form-control" name={"collection_name"} placeholder={"name for your slambook"} />
                </Form.Group>
            )
        } else {
            return null;

        }
    }

    renderSubmitButton(collection, props) {
        if(collection.sampleCollection){
            return (
                <div className="form-group card-action-button" key={`formik-${collection.collectionId}-submit`}>
                    <Button type="submit" disabled={!(props.isValid && props.dirty)} variant="outline-success">Save</Button>
                </div>
            )
        } else {
            return (
                <div className="form-group card-action-button" key={`formik-${collection.collectionId}-submit`}>
                    <Button type="submit" variant="outline-danger">Delete</Button>
                </div>
            )
        }
    }

    renderQuestions(collection, props) {
        return (
            <div>
                {
                    props.values.questionnaire.map((obj, index) => (
                        <Form.Group className="mb-3" key={index}>
                            <Field className="form-control" name={`questionnaire.${index}.question`} disabled={!collection.sampleCollection}/>
                            <></>
                        </Form.Group>
                    ))
                }
            </div>
        )
    }

    renderCollection(collection) {
        return (
            <Carousel.Item>
                <Card bg={"light"}
                      key={collection.collectionId}
                      text={"dark"}
                      className="collections-card"
                      border="secondary">
                    <Card.Header as="h5">{`${collection.name}`}</Card.Header>
                    <Card.Body>
                        <Formik initialValues={collection} onSubmit={this.handleSubmit} key={`formik-${collection.collectionId}`}>
                            {(props)=>(
                                <Form noValidate onSubmit={props.handleSubmit} key={`form-${collection.collectionId}`}>
                                    {this.renderNameField(collection,props)}
                                    {(collection.sampleCollection ? <hr/>: null)}
                                    <FieldArray
                                        name="questionnaire"
                                        render={arrayHelpers => this.renderQuestions(collection, props)} />

                                    {this.renderSubmitButton(collection, props)}

                                </Form>
                            )}
                        </Formik>
                    </Card.Body>
                    {this.renderFooter(collection)}
                </Card>
            </Carousel.Item>
        )
    }

    renderCollections(){
        const collections = this.props.data.collections;
        if(collections){
            collections.push(DEFAULT_COLLECTION);
            return collections.map(collection => this.renderCollection(collection));
        } else {
            return null;
        }

    }

    render(){
        if(!this.props.user.name) {
            return (<Navigate to={"/login"}></Navigate>)
        } else {
            return (
             <Row className={"collections-cards"}>
                 <Carousel variant="dark" className={"col-sm-10, col-md-3"}>
                    {this.renderCollections()}
                 </Carousel>
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
        addCollection: (collection) => dispatch(addCollectionAction(collection)),
        loadCollections: () => dispatch(loadCollectionsAction()),
        deleteCollection: (collection)=> dispatch(deleteCollectionAction(collection))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Collections);
