import React from "react";
import _ from "lodash";
import {Button, Card, Form, Image} from "react-bootstrap";
import {Field, FieldArray, Formik} from "formik";

const _renderCardHeader = (post) => {
    const user = _.get(post, 'user', {});
    if(_.isEmpty(user)) {
        let userName = _.get(post,"name", "Anonymous");
        return (
            <span> {`${post.collectionName} by ${userName}`} </span>
        )
    } else {
        return (
            <span>
                <Image className={"profile-pic"} src={post.user.profilePic} roundedCircle={true} fluid={true}></Image> &nbsp;
                <span> {`${post.collectionName} by ${post.user.firstName}`} </span>
            </span>
        )
    }
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
              className="collections-card col-sm-10 col-md-3"
              border="secondary">
            <Card.Header as="h5">{_renderCardHeader(post)}</Card.Header>
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

