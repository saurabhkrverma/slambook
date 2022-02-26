import {Button, Card, Col, Form} from "react-bootstrap";
import { FieldArray, Formik } from "formik";
import React from "react";

const _renderNameField = (post, props) => {
    return (
        <Form.Group className="mb-3 form-inline"  key={"submitterName"}>
            <Form.Label><i>{"Your name"}</i></Form.Label>
            <Form.Control className="form-control" name={`submitterName`} placeholder={"your name"}
                          onChange={props.handleChange}
                          isValid={!props.errors.submitterName}
                          isInvalid={!!props.errors.submitterName}/>
            <Form.Control.Feedback type="invalid">{props.errors.submitterName}</Form.Control.Feedback>
        </Form.Group>
    )
}

const _renderEmailField = (post, props) => {
    return (
        <Form.Group className="mb-3 form-inline"  key={"submitterEmail"}>
            <Form.Label><i>{"Your email"}</i></Form.Label>
            <Form.Control className="form-control" name={`submitterEmail`} placeholder={"your email"}
                          onChange={props.handleChange}
                          isValid={!props.errors.submitterEmail}
                          isInvalid={!!props.errors.submitterEmail}/>
            <Form.Control.Feedback type="invalid">{props.errors.submitterEmail}</Form.Control.Feedback>
        </Form.Group>
    )
}

const  _renderSubmitButton = (post, props) => {
    return (
        <div className="form-group card-action-button" key={`formik-${post.collectionId}-submit`}>
            <Button type="submit" variant="outline-primary" disabled={!(props.isValid && props.dirty)}>Submit</Button>
        </div>
    )
}

const  _renderPosts = (post, props) => {
    const posts = props.values.questionnaire.map((obj, index) => {
        const fieldError = _.get(props, `errors.questionnaire.${index}.answer`);
        return (
            <Form.Group className="mb-3" key={`${index}-answer`}>
                <Form.Label><i>{obj.question}</i></Form.Label>
                <Form.Control className="form-control" name={`questionnaire.${index}.answer`}
                        onChange={props.handleChange}
                        isValid={!fieldError}
                        isInvalid={!!fieldError}/>
                <Form.Control.Feedback type="invalid">{fieldError}</Form.Control.Feedback>
            </Form.Group>
        )

    });
    return posts;
}

export const Post = (post, handleSubmit, validationSchema) => {
    return (
        <Card bg={"light"}
              key={`${post.collectionId}-post`}
              text={"dark"}
              className="collections-card col-sm-10 col-md-3"
              border="secondary">
            <Card.Header as="h5">{`${post.collectionName}`}</Card.Header>
            <Card.Body>
                <Formik initialValues={post} onSubmit={handleSubmit}  validationSchema={validationSchema} key={`formik-${post.collectionId}-post`}>
                    {(props)=>(
                        <Form noValidate onSubmit={props.handleSubmit} key={`form-${post.collectionId}-post`}>

                            {_renderNameField(post,props)}

                            {_renderEmailField(post, props)}

                            <FieldArray
                                name="posts"
                                render={arrayHelpers => _renderPosts(post, props)} />

                            {_renderSubmitButton(post, props)}

                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    )
};

export default Post;
