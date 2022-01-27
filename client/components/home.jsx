import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom"
import { Row, Toast } from 'react-bootstrap'
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
                    <div className={"welcome-msg-toast"}>
                        <Toast className="d-inline-block m-1" bg={"secondary"} key={"welcome-msg"}>
                            <Toast.Header closeButton={false}>
                                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                                <strong className="me-auto">Welcome, {this.props.user.firstName}!</strong>
                            </Toast.Header>
                            <Toast.Body className={'text-white'}>
                                Create and share your slambook with friends and read their submissions, all here :)
                            </Toast.Body>
                        </Toast>
                    </div>
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
