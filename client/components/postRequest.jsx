import React from 'react';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import {Navigate} from "react-router-dom";
import Post from "./postRequest";
import { submitPostAction }  from "../actions/post"

class PostRequest extends React.Component {

    constructor(props) {
        super(props);

        this.renderPosts = this.renderPosts.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values, actions) {
        this.props.submitPost(values);
    }

    renderPosts(){
        const posts = this.props.requests;

        if(posts && posts.length>0){
            return posts.map(post => Post(post, this.handleSubmit));
        } else {
            return null;
        }

    }

    render(){
        if(!(this.props.requests && this.props.requests.length > 0)) {
            return (<Navigate to={"/"}></Navigate>);
        }

        return (
            <Row className={"collections-cards"}>
                {this.renderPosts()}
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