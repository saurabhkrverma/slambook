import React from 'react';
import { connect } from "react-redux"
import {Row, Dropdown, Button, Image} from "react-bootstrap";
import { getPostsAction, deletePostAction  } from "../actions/post";
import Post from "./functionalComponents/posts.js";
import { sortPosts } from "../utils/commonUtils";
import { CONSTANTS } from "../config/constants"

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = { posts : [], search:'' };
        this.copyPosts = [];
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sortPosts = this.sortPosts.bind(this);
        this.loadMorePosts = this.loadMorePosts.bind(this);
        this.renderSortingDropdown = this.renderSortingDropdown.bind(this);
        this.renderSearchSortOptions = this.renderSearchSortOptions.bind(this)
        this.renderPaginationOptions = this.renderPaginationOptions.bind(this);
    }

    componentDidMount() {
        if(this.props.posts && this.props.posts.length>0) {
            // posts are already in state and no need to call the API again
            this.setState({
                posts: this.props.posts
            })
            this.copyPosts = this.props.posts
            return
        }
        this.props.loadPosts(this.props.app.currentPage);
    }

    componentDidUpdate(props) {
        if(this.props.posts.length !== props.posts.length) {
            this.setState({
                posts: this.props.posts
            })
            this.copyPosts = this.props.posts
        }
    }

    handleSubmit(values, actions) {
        this.props.deletePost(values);
    }

    sortPosts(order = CONSTANTS.ORDER_MOST_RECENT_FIRST) {
        if(this.state.posts) {
            this.setState({
                posts: sortPosts(this.state.posts, order)
            });
        }
    }

    renderSortingDropdown() {
        return (
            <Dropdown>
                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                    Posts order
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dark">
                    <Dropdown.Item href="#/action-1"  onClick={()=>{this.sortPosts(CONSTANTS.ORDER_MOST_RECENT_FIRST)}}>Recent First</Dropdown.Item>
                    <Dropdown.Item href="#/action-2" onClick={()=>{this.sortPosts(CONSTANTS.ORDER_OLDEST_FIRST)}}>Oldest First</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    searchResults(e) {
        let lowerCase = e.target.value.toLowerCase();
        const filteredData = this.copyPosts.filter((el) => {
            //if no input the return the original
            if (lowerCase === '') {
                this.setState({posts: this.copyPosts, search: ''})
                return el;
            }
            //return the item which contains the user input
            else {
                return el.collectionName.toLowerCase().includes(lowerCase) || el.submitterName.toLowerCase().includes(lowerCase)
            }
        })
        this.setState({posts: filteredData, search: lowerCase})
    }

    renderSearch() {
        if(this.copyPosts && this.copyPosts.length > 0) {
            return (
                <input  style={{width: 'auto'}} className="form-control" onChange={this.searchResults.bind(this)} aria-describedby="emailHelp"
                       placeholder="Search" />
            )
        } else {
            return null;
        }
    }

    renderSearchSortOptions() {
        return (
            <div className={"post-options"}>
                {this.renderSearch()}
                {this.renderSortingDropdown()}
            </div>
        )
    }

    loadMorePosts() {
        const nextPage = _.get(this, "props.app.currentPage", 1) + 1;
        this.props.loadPosts(nextPage);
    }

    renderPaginationOptions() {
        if(this.props.posts.length < this.props.postsCount) {
            return (
                <div className={"post-pagination-tab"}>
                    <Button variant="outline-secondary" onClick={this.loadMorePosts}>Load More</Button>
                </div>
            )
        } else {
            return (
                <div className={"post-pagination-tab"}>
                    <Image className="no-more-posts" src={"/icons/no-more-posts.png"} roundedCircle={true} fluid={true}></Image>
                </div>
            )
        }
    }

    renderPosts() {
        if(this.copyPosts && this.copyPosts.length > 0){
            return (
                <>
                    {/*{this.renderSearchSortOptions()}*/}
                    {this.state.posts.map((post,postIndex) => {
                        post.index = postIndex;
                        return Post(post, this.handleSubmit)
                    })}
                    {this.state.posts.length === 0 && this.copyPosts.length > 0 && <div style={{textAlign:'center', padding:'30px'}}><p>No Results</p></div>}
                    {this.renderPaginationOptions()}
                </>
            )
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

    render() {
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
        postsCount: state.data.postsCount,
        user: state.user,
        app: state.app
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadPosts: (pageNumber) => dispatch(getPostsAction(pageNumber)),
        deletePost: (post) => dispatch(deletePostAction(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
