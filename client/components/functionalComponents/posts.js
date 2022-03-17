import React from "react";
import _ from "lodash";
import {Button, Card, Form, Image, Popover, OverlayTrigger} from "react-bootstrap";
import { FieldArray, Formik} from "formik";

const _renderCardHeader = (post) => {
    const user = _.get(post, 'user', {});
    const submitterEmail = _.get(post, 'submitterEmail', "unknown");
    const popover = (
        <Popover id={`${post.collectionId}-${submitterEmail}-popover`}>
            <Popover.Header as="h3">Post details</Popover.Header>
            <Popover.Body>
                This post was submitted from {submitterEmail}.
            </Popover.Body>
        </Popover>
    );
    if(_.isEmpty(user)) {
        let userName = _.get(post,"submitterName", "Anonymous");
        return (
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                <div className={"card-header-post"}>
                    <Image className="profile-pic" src={"/icons/default-user-icon.png"} roundedCircle={true} fluid={true}></Image>
                    <span> {`${post.collectionName} by ${userName}`} </span>
                </div>
            </OverlayTrigger>
        )
    } else {
        return (
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                <div className={"card-header-post"}>
                    <Image className={"profile-pic"} src={post.user.profilePic} roundedCircle={true} fluid={true}></Image>
                    <span> {`${post.collectionName} by ${post.user.firstName}`} </span>
                </div>
            </OverlayTrigger>

        )
    }
}

const _renderFooter = (post) => {
    const creationTimestamp = new Date(post.createdOn);
    const creationDate = creationTimestamp.toLocaleDateString('en-IN');
    const creationTime = creationTimestamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return (
        <Card.Footer className="text-muted card-collection-footer card-collection-footer-post">
            <div>submitted on {`${creationDate} @ ${creationTime}`} </div>
        </Card.Footer>
    )
}

const _renderDeleteButton = (post, handleSubmit) => {
    return (
        <div className="form-group card-action-button" key={`formik-${post.collectionId}-delete`}>
            <Button variant="outline-danger" onClick={()=>{handleSubmit(post)}}>Delete</Button>
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
        <Card bg={"dark"}
              key={`${post.collectionId}-post`}
              text={"white"}
              className="collections-card collections-card-post  col-sm-10 col-md-3"
              border="secondary">
            <Card.Header as="h5" className={"card-header-post-container"}>{_renderCardHeader(post)}</Card.Header>
            <Card.Body>
                <Formik initialValues={post} onSubmit={handleSubmit.apply} key={`formik-${post.collectionId}-post`}>
                    {(props)=>(
                        <Form noValidate onSubmit={props.handleSubmit} key={`form-${post.collectionId}-post`}>

                            <FieldArray
                                name="posts"
                                render={arrayHelpers => _renderPosts(post, props)} />

                            {_renderDeleteButton(post, handleSubmit)}

                        </Form>
                    )}
                </Formik>
            </Card.Body>

            {_renderFooter(post)}

        </Card>
    )
};

export default Post;

