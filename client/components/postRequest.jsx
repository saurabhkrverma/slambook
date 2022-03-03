import React from 'react';
import {Col, Row} from 'react-bootstrap';
import { connect } from 'react-redux';
import {Navigate} from "react-router-dom";
import _ from "lodash";
import Post from "./functionalComponents/postRequest";
import { submitPostAction }  from "../actions/post"
import { postRequestValidationSchema, postRequestWithOTPValidationSchema } from "../config/validationSchemas"

class PostRequest extends React.Component {

    constructor(props) {
        super(props);

        this.validationSchema = postRequestValidationSchema;
        this.renderPosts = this.renderPosts.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values, actions) {
        this.props.submitPost(values);
    }

    renderPosts(){
        const posts = this.props.requests;
        const user = this.props.user;
        const defaultValues = {};
        if(user && user.email) {
            defaultValues.submitterName= user.firstName;
            defaultValues.submitterEmail = user.email;
        }
        if(posts && posts.length>0){
            return posts.map(post => {
                let validationSchema = this.validationSchema;
                if(post.collectOTP) {
                    validationSchema =  postRequestWithOTPValidationSchema;
                }
                return Post({...post,...defaultValues}, this.handleSubmit, validationSchema)
            });
        } else {
            return null;
        }
    }

    render(){
        if(!(this.props.requests && this.props.requests.length > 0)) {
            return (<Navigate to={"/"}></Navigate>);
        }
        const user = _.get(this.props, "requests[0].user", {});
        return (
            <Row>
                <Col className={"welcome-msg-container"}>
                    <div className="jumbotron jumbotron-fluid">
                        <div className="container">
                            <p className="lead">
                                Hi, <b>{user.firstName}</b> requested you to fill this slambook.
                            </p>
                        </div>
                    </div>
                </Col>
                <Row className={"collections-cards"}>
                    {this.renderPosts()}
                </Row>
            </Row>
        )
    }

}

const mapStateToProps = (state)=> {
    return {
        requests: state.data.requests,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {
        submitPost: (post) => dispatch(submitPostAction(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostRequest)
