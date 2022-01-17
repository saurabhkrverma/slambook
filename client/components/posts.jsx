import React from 'react';
import { connect } from "react-redux"
import {Row} from "react-bootstrap";


class Posts extends React.Component {
    constructor(props) {
        super(props);
    }

    renderCollections(){
        const posts = this.props.data.posts;
        if(posts){
            return null;
        } else {
            return null;
        }

    }

    render(){
        return (
            <Row className={"collections-cards"}>
                your posts here
            </Row>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        app:state.app,
        data: state.data,
        user: state.user
    }
}

export default connect(mapStateToProps)(Posts);
