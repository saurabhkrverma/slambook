import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom"
import {Col, Row, Toast} from 'react-bootstrap'
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
        if(!this.props.user.firstName) {
            return (<Navigate to={"/login"}></Navigate>)
        } else {
            return(
                <div>
                    <Row>
                        <Col className={"welcome-msg-container"}>
                            <div className="jumbotron jumbotron-fluid">
                                <div className="container">
                                    <p className="lead">
                                        Welcome {this.props.user.firstName} &#128512; !! <br/>
                                        Create your slambook, share it with your friends and see their submissions all at same place.
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <div>
                            {this.renderCollections()}
                        </div>
                        <br/>
                        <h5 className={"posts-section-header"}>Posts</h5>
                        <hr></hr>
                        <div>
                            {this.renderPosts()}
                        </div>
                    </Row>
                </div>
            )
        }
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Home);
