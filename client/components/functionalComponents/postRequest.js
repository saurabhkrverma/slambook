import {Button, Card, Col, Form} from "react-bootstrap";
import { FieldArray, Formik } from "formik";
import React from "react";

const _renderNameField = (post, props) => {
    return (
        <Form.Group className="mb-3 form-inline"  key={"submitterName"} hidden={post.submitterName || post.otpHash}>
            <Form.Label><i>{"Your name"}</i></Form.Label>
            <Form.Control className="form-control" name={`submitterName`} placeholder={"your name"}
                        onChange={props.handleChange}
                        value={props.values.submitterName}
                        isValid={!props.errors.submitterName}
                        isInvalid={!!props.errors.submitterName}
                        disabled={post.submitterName}/>
            <Form.Control.Feedback type="invalid">{props.errors.submitterName}</Form.Control.Feedback>
        </Form.Group>
    )
}

const _renderEmailField = (post, props) => {
    return (
        <Form.Group className="mb-3 form-inline"  key={"submitterEmail"} hidden={post.submitterEmail || post.otpHash}>
            <Form.Label><i>{"Your email"}</i></Form.Label>
            <Form.Control className="form-control" name={`submitterEmail`} placeholder={"your email"}
                          onChange={props.handleChange}
                          value={props.values.submitterEmail}
                          isValid={!props.errors.submitterEmail}
                          isInvalid={!!props.errors.submitterEmail}
                          disabled={post.submitterEmail}/>
            <Form.Control.Feedback type="invalid">{props.errors.submitterEmail}</Form.Control.Feedback>
        </Form.Group>
    )
}

const _renderOTPField = (post, props) => {
    return (
        <Form.Group className="mb-3 form-inline"  key={"otpValue"} hidden={!post.otpHash}>
            <Form.Label><i>{"Enter OTP sent to your email"}</i></Form.Label>
            <Form.Control className="form-control" name={`otpValue`} placeholder={"enter OTP"}
                          onChange={(e)=>{
                              // find a better way to pass otp hash values to submit handler
                              if(props.values && !props.values.otpHash){
                                  props.values.otpHash = post.otpHash
                              }
                              props.handleChange(e);
                          }}
                          value={props.values.otpValue}
                          isValid={!props.errors.otpValue}
                          isInvalid={!!props.errors.otpValue}/>
            <Form.Control.Feedback type="invalid">{props.errors.otpValue}</Form.Control.Feedback>
        </Form.Group>
    )
}

const _renderSubmitButton = (post, props) => {
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
            <Form.Group className="mb-3" key={`${index}-answer`} hidden={post.otpHash}>
                <Form.Label><i>{obj.question}</i></Form.Label>
                <Form.Control className="form-control" name={`questionnaire.${index}.answer`}
                        placeholder={"your answer"}
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
        <Card bg={"dark"}
              key={`${post.collectionId}-post`}
              text={"light"}
              className="collections-card col-sm-10 col-md-3"
              border="secondary">
            <Card.Header as="h5">{`${post.collectionName}`}</Card.Header>
            <Card.Body>
                <Formik initialValues={post} onSubmit={handleSubmit}  validationSchema={validationSchema} key={`formik-${post.collectionId}-post`}>
                    {(props)=>(
                        <Form noValidate onSubmit={props.handleSubmit} key={`form-${post.collectionId}-post`}>

                            { _renderNameField(post,props)}

                            { _renderEmailField(post, props)}

                            <FieldArray
                                name="posts"
                                render={arrayHelpers => _renderPosts(post, props)} />

                            {_renderOTPField(post, props)}

                            {_renderSubmitButton(post, props)}

                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    )
};

export default Post;

