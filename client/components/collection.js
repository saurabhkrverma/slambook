import {Button, Card, Carousel, Form} from "react-bootstrap";
import {Field, FieldArray, Formik} from "formik";
import React from "react";

const  _questionnaire = (collection, props) => {
    return (
        <div>
            {
                props.values.questionnaire.map((obj, index) => (
                    <Form.Group className="mb-3" key={index}>
                        <Field className="form-control" name={`questionnaire.${index}.question`} disabled={!collection.sampleCollection}/>
                    </Form.Group>
                ))
            }
        </div>
    );
}

const _renderNameField = (collection, props) => {
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

const  _renderSubmitButton = (collection, props) => {
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

const _renderFooter = (collection, props) => {
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

export const Collection = (collection, handleSubmit) => {
    return (
        <Carousel.Item>
            <Card bg={"light"}
                  key={`${collection.collectionId}-collection`}
                  text={"dark"}
                  className="collections-card"
                  border="secondary">
                <Card.Header as="h5">{`${collection.name}`}</Card.Header>
                <Card.Body>
                    <Formik initialValues={collection} onSubmit={handleSubmit} key={`formik-${collection.collectionId}-collection`}>
                        {(props)=>(
                            <Form noValidate onSubmit={props.handleSubmit} key={`form-${collection.collectionId}-collection`}>
                                {_renderNameField(collection,props)}
                                {(collection.sampleCollection ? <hr/>: null)}
                                <FieldArray
                                    name="questionnaire"
                                    render={arrayHelpers => _questionnaire(collection, props)} />

                                {_renderSubmitButton(collection, props)}

                            </Form>
                        )}
                    </Formik>
                </Card.Body>
                {_renderFooter(collection)}
            </Card>
        </Carousel.Item>
    )
};

export default Collection;

