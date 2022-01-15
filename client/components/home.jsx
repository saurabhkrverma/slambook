import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import {Row, Col, Carousel, Card} from 'react-bootstrap'
import Collections from "./collections.jsx"

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    logoutUser() {

    }

    render() {
        if(!this.props.user.name) {
            return (<Navigate to={"/login"}></Navigate>)
        }
        return (
            <Row>
                {<Collections {...this.props}/>}
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
