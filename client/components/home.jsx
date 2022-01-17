import React from 'react';
import { connect } from 'react-redux';
import {Row} from 'react-bootstrap'
import Collections from "./collections.jsx"
import Posts from "./posts.jsx"

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    renderCollections () {
        return (
            <Row>
                {<Collections {...this.props}/>}
            </Row>
        );
    }

    renderPosts () {
        return (
            <Row>
                {<Posts {...this.props}/>}
            </Row>
        );
    }

    render() {
        return(
            <Row>
                {this.renderPosts()}
            </Row>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Home);
