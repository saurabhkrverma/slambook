import React from 'react';
import { connect } from "react-redux"
import {Row} from "react-bootstrap";
import { getPostsAction } from "../actions/post";
import Post from "./posts.js";

class Posts extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadPosts();
    }

    renderPosts(){
        const posts = this.props.posts;

        if(posts && posts.length>0){
            return posts.map(post => Post(post, this.handleSubmit));
        } else {
            return (
                <Row className={"posts-no-post"}>
                    <div className="jumbotron jumbotron-fluid">
                        <div className="container">
                            <p className="lead">
                                No posts yet, share the slambook with friends now and get started !
                            </p>
                        </div>
                    </div>
                </Row>
            )
        }

    }

    render(){
        return (
            <Row className={"collections-cards"}>
                {this.renderPosts()}
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
