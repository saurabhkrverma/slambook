import React from 'react';
import { connect } from "react-redux"
import {Navigate} from "react-router-dom";
import {Row, Card, Form, Button} from "react-bootstrap";
import { addCollectionAction, loadCollectionsAction, updateCollectionAction, deleteCollectionAction }  from "../actions/collection";
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
                <Form.Group className="mb-3" key={"collection_name"}>
                    <Form.Label>slambook's name</Form.Label>
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
                    <Button type="submit" disabled={!(props.isValid && props.dirty)}>Save</Button>
                </div>
            )
        } else {
            return (
                <div className="form-group card-action-button" key={`formik-${collection.collectionId}-submit`}>
                    <Button type="submit">Delete</Button>
                </div>
            )
        }
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

    renderCollection(collection) {
        return (
            <Card bg={"light"}
                  key={collection.collectionId}
                  text={"dark"}
                  className="col-10  col-md-3 collections-card">
                <Card.Header as="h5">{`${collection.name}`}</Card.Header>
                <Card.Body>
                    <Formik initialValues={collection} onSubmit={this.handleSubmit} key={`formik-${collection.collectionId}`}>
                        {(props)=>(
                            <Form noValidate onSubmit={props.handleSubmit} key={`form-${collection.collectionId}`}>
                                {this.renderNameField(collection,props)}

                                <FieldArray
                                    name="questionnaire"
                                    render={arrayHelpers => this.renderQuestions(props)} />

                                {this.renderSubmitButton(collection, props)}

                            </Form>
                        )}
                    </Formik>
                </Card.Body>
            </Card>
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
                 {this.renderCollections()}
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
