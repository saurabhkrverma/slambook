import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom"
import { Col, Row, Image } from 'react-bootstrap'
import renderCollectionsLinkWidget from "./functionalComponents/collectionsLinkWidget.js"
import Posts from "./posts.jsx"
import { getNotificationsCountAction } from "../actions/notification"

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadNotificationsCount();
    }

    renderCollections () {
        return renderCollectionsLinkWidget();
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
                                        {(this.props.user && this.props.user.profilePic) ? <Image className={"profile-pic"} src={this.props.user.profilePic} roundedCircle={true} fluid={true}></Image> :
                                            <i className="bi bi-person-circle profile-pic"></i>}
                                        <br/>
                                        Welcome {this.props.user.firstName} &#128512; !!<br/>
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
                        &nbsp;
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

const mapDispatchToProps = (dispatch) => {
    return {
        loadNotificationsCount: ()=> dispatch(getNotificationsCountAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
