import React from "react";
import _ from "lodash";
import {Button, Card, Form, Image} from "react-bootstrap";
import { FieldArray, Formik} from "formik";

const _renderCardHeader = (post) => {
    const user = _.get(post, 'user', {});
    if(_.isEmpty(user)) {
        let userName = _.get(post,"submitterName", "Anonymous");
        return (
            <div className={"card-header-post"}>
                <i className="bi bi-person-circle profile-pic"></i>
                <span> {`${post.collectionName} by ${userName}`} </span>
            </div>
        )
    } else {
        return (
            <div className={"card-header-post"}>
                <Image className={"profile-pic"} src={post.user.profilePic} roundedCircle={true} fluid={true}></Image>
                <span> {`${post.collectionName} by ${post.user.firstName}`} </span>
            </div>
        )
    }
}

const _renderDeleteButton = (post) => {
    return (
        <div className="form-group card-action-button" key={`formik-${post.collectionId}-delete`}>
            <Button type="submit" variant="outline-danger">Delete</Button>
        </div>
    )
}

const  _renderPosts = (post, props) => {
    return (
        <div>
            {
                props.values.questionnaire.map((obj, index) => (
                    <div>
                        <Form.Group className="mb-3" key={`${index}-question`}>
                            <Form.Label><b>{obj.question}</b></Form.Label>
                            <br/>
                            <Form.Label><i>{obj.answer}</i></Form.Label>
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
              className="collections-card collections-card-post  col-sm-10 col-md-3"
              border="secondary">
            <Card.Header as="h5">{_renderCardHeader(post)}</Card.Header>
            <Card.Body>
                <Formik initialValues={post} onSubmit={handleSubmit} key={`formik-${post.collectionId}-post`}>
                    {(props)=>(
                        <Form noValidate onSubmit={props.handleSubmit} key={`form-${post.collectionId}-post`}>

                            <FieldArray
                                name="posts"
                                render={arrayHelpers => _renderPosts(post, props)} />

                            {_renderDeleteButton(post)}

                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    )
};

export default Post;

