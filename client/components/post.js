import {Button, Card, Form} from "react-bootstrap";
import {Field, FieldArray, Formik} from "formik";
import React from "react";

const  _renderPosts = (post, props) => {
    return (
        <div>
            {
                props.values.questionnaire.map((obj, index) => (
                    <div>
                        <Form.Group className="mb-3" key={`${index}-question`}>
                            <Form.Label><i>{obj.question}</i></Form.Label>
                        </Form.Group>

                        <Form.Group className="mb-3" key={`${index}-answer`}>
                            <Field className="form-control" name={`questionnaire.${index}.answer`} disabled/>
                        </Form.Group>

                    </div>
                ))
            }
        </div>
    );
}

export const Post = (post, handleSubmit) => {
    return (
        <Card bg={"light"}
              key={`${post.collectionId}-post`}
              text={"dark"}
              className="collections-card col-sm-10 col-md-3"
              border="secondary">
            <Card.Header as="h5">{`${post.slambookName} by ${post.name}`}</Card.Header>
            <Card.Body>
                <Formik initialValues={post} onSubmit={handleSubmit} key={`formik-${post.collectionId}-post`}>
                    {(props)=>(
                        <Form noValidate onSubmit={props.handleSubmit} key={`form-${post.collectionId}-post`}>

                            <FieldArray
                                name="posts"
                                render={arrayHelpers => _renderPosts(post, props)} />

                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    )
};

export default Post;

