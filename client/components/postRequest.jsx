import React from 'react';
import {Col, Row} from 'react-bootstrap';
import { connect } from 'react-redux';
import {Navigate} from "react-router-dom";
import _ from "lodash";
import Post from "./functionalComponents/postRequest";
import { submitPostAction }  from "../actions/post"
import * as yup from "yup";

class PostRequest extends React.Component {

    constructor(props) {
        super(props);

        this.validationSchema = yup.object().shape({
            submitterName: yup.string().required("your name is required"),
            submitterEmail: yup.string().required().matches(/^\S+@\S+\.\S+$/, 'not a valid email'),
            questionnaire: yup.array()
                .of(
                    yup.object().shape({
                        question: yup.string(),
                        answer: yup.string().required("Required")
                    })
                )
        });

        this.renderPosts = this.renderPosts.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values, actions) {
        this.props.submitPost(values);
    }

    renderPosts(){
        const posts = this.props.requests;

        if(posts && posts.length>0){
            return posts.map(post => Post(post, this.handleSubmit, this.validationSchema));
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
        requests: state.data.requests
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {
        submitPost: (post) => dispatch(submitPostAction(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostRequest)
