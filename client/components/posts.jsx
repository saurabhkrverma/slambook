import React from 'react';
import { connect } from "react-redux"
import { Row, Dropdown } from "react-bootstrap";
import { getPostsAction, deletePostAction  } from "../actions/post";
import Post from "./posts.js";
import { sortPosts } from "../utils/commonUtils";
import { CONSTANTS } from "../config/constants"

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = { posts : [], search:'' };
        this.copyPosts = [];
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sortPosts = this.sortPosts.bind(this);
        this.renderSortingDropdown = this.renderSortingDropdown.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
    }

    componentDidMount() {
        this.props.loadPosts();
    }

    componentDidUpdate(props) {
        if(this.props.posts.length !== props.posts.length) {
            this.setState({
                posts: sortPosts(this.props.posts)
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
                    Select order
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dark">
                    <Dropdown.Item href="#/action-1"  onClick={()=>{this.sortPosts(CONSTANTS.ORDER_MOST_RECENT_FIRST)}}>Most recent first</Dropdown.Item>
                    <Dropdown.Item href="#/action-2" onClick={()=>{this.sortPosts(CONSTANTS.ORDER_OLDEST_FIRST)}}>Oldest first</Dropdown.Item>
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

    renderOptions() {
        return (
            <div className={"post-options"}>
                {this.renderSearch()}
                {this.renderSortingDropdown()}
            </div>
        )
    }

    renderPosts() {
        if(this.copyPosts && this.copyPosts.length > 0){
            return (
                <>
                    {this.renderOptions()}
                    {this.state.posts.map(post => Post(post, this.handleSubmit))}
                    {this.state.posts.length === 0 && this.copyPosts.length > 0 && <div style={{textAlign:'center', padding:'30px'}}><p>No Results</p></div>}
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
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadPosts: () => dispatch(getPostsAction()),
        deletePost: (post) => dispatch(deletePostAction(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
