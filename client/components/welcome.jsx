import React from 'react';
import { connect } from 'react-redux';
import {Row, Col, Spinner, Modal} from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import UserRegistration from './userRegistration.jsx';
import Login from './login.jsx';
import {registerUser} from "../utils/apiUtils";

class Welcome extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            registerUser: false
        };

        this.toggleForm = this.toggleForm.bind(this);
    }

    toggleForm(){
        this.setState((prevState)=>({
            registerUser: !prevState.registerUser
        }));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if((!this.props.user || !this.props.user.name) && prevState.registerUser === true){
            this.setState((prevState)=>({
                registerUser:false
            }));
        }
    }

    renderForm(){
        if(this.state.registerUser){
            return (
                <div>
                    <UserRegistration {...this.props} />
                    <br/>
                    <div className={"text-align-center"}>
                        <strong>Already have an account? </strong>
                        <span>
                            <a href="#" onClick={this.toggleForm}>Login</a>
                        </span>
                    </div>
                </div>

            )
        } else {
            return (
                <div>
                    <Login {...this.props} />
                    <br/>
                    <div className={"text-align-center"}>
                        <strong>Don't have an account? </strong>
                        <span>
                            <a href="#" onClick={this.toggleForm}>Register</a>
                        </span>
                    </div>
                </div>

            )
        }
    }

    render() {

        if(this.props.requests && this.props.requests.length > 0) {
            return (<Navigate to={"/request"}></Navigate>);
        }

        if(this.props.user && this.props.user.name){
            return (<Navigate to={"/home"}></Navigate>);
        }

        return (
            <Row>
                <Col className={"col-12  col-md-6"}>
                    <div className="jumbotron jumbotron-fluid">
                        <div className="container">
                            <h1 className="display-4">Slambook</h1>
                            <p className="lead">
                                Welcome to slambook !! we help you connect with your friends and relive the 90s &#128512;
                            </p>
                        </div>
                    </div>
                </Col>
                <Col className={"col-12  col-md-6"}>
                    {this.renderForm()}
                </Col>
            </Row>

        )
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        requests: state.data.requests
    };
};

export default connect(mapStateToProps, null)(Welcome);
