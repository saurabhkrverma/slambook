import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom'

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(!this.props.session.name) {
            return (<Navigate to={"/login"}></Navigate>)
        }
        return (
            <div>Welcome to the home page, {this.props.session.name} !!</div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        session: state.session
    }
}

export default connect(mapStateToProps)(Home);
