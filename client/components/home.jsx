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
                Welcome to the Home page, {this.props.user.name} !! <br/>
                posts your slambook will show up here...coming soon :)

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
