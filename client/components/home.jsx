import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'

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
            <div>
                Welcome to the Home page, {this.props.user.name} !!
                <Button variant="primary" onClick={this.logoutUser}>Primary</Button>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Home);
