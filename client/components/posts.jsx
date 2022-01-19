import React from 'react';
import { connect } from "react-redux"
import {Row} from "react-bootstrap";
import { getPostsAction } from "../actions/post";
import Post from "./post";

class Posts extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadPosts();
    }

    renderCollections(){
        const posts = this.props.posts;

        if(posts && posts.length>0){
            return posts.map(post => Post(post, this.handleSubmit));
        } else {
            return null;
        }

    }

    render(){
        return (
            <Row className={"collections-cards"}>
                {this.renderCollections()}
            </Row>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        posts: state.data.posts,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadPosts: () => dispatch(getPostsAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
