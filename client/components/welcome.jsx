import React from 'react';
import { connect } from 'react-redux';
import {Row, Col, Spinner, Modal, Image} from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import UserRegistration from './userRegistration.jsx';
import Login from './login.jsx';
import ResetPassword from "./resetPassword.jsx";

class Welcome extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            registerUser: false,
            resetPassword: false
        };

        this.toggleForm = this.toggleForm.bind(this);
    }

    toggleForm(registerUser = false, resetPassword = false){
        this.setState(()=>({
            registerUser,
            resetPassword
        }));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if((!this.props.user || !this.props.user.firstName) && prevState.registerUser === true){
            this.setState((prevState)=>({
                registerUser:false
            }));
        }
    }

    renderForm(){
        if(this.state.registerUser || this.props.app.defaultUser.email) {
            return (
                <div>
                    <UserRegistration {...this.props} />
                    <br/>
                    <div className={"text-align-center"}>
                        <strong>Already have an account? </strong>
                        <span>
                            <a href="#" onClick={()=>{this.toggleForm(false, false)}}>Login</a>
                        </span>
                    </div>
                </div>

            )
        }
        else if(this.state.resetPassword){
            return (
                <div>
                    <ResetPassword {...this.props} />
                    <br/>
                    <div className={"text-align-center"}>
                        <strong>Already have an account? </strong>
                        <span>
                        <a href="#" onClick={()=>{this.toggleForm(false, false)}}>Login</a>
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
                            <a href="#" onClick={()=>{this.toggleForm(true, false)}}>Register</a>
                        </span>
                    </div>
                    <div className={"text-align-center"}>
                        <strong>Forgot password? </strong>
                        <span>
                        </span>
                        <a href="#" onClick={()=>{this.toggleForm(false, true)}}>Reset</a>
                    </div>
                </div>
            )
        }
    }

    render() {

        if(this.props.requests && this.props.requests.length > 0) {
            return (<Navigate to={"/request"}></Navigate>);
        }

        if(this.props.user && this.props.user.firstName){
            return (<Navigate to={"/home"}></Navigate>);
        }

        return (
            <Row className={"welcome-page-container"}>
                <Col className={"col-12  col-md-4"}>
                    <div className="jumbotron jumbotron-fluid">
                        <div className="container">
                            <h1 className="display-4">Slambook</h1>
                            <p className="lead">
                                Welcome to slambook !! we help you connect with your friends and bring the attention back to you &#128512;
                            </p>
                        </div>
                    </div>
                </Col>
                <Col className={"col-12  col-md-4"}>
                    {this.renderForm()}
                </Col>
            </Row>

        )
    }

}

const mapStateToProps = (state) => {
    return {
        app: state.app,
        user: state.user,
        requests: state.data.requests
    };
};

export default connect(mapStateToProps, null)(Welcome);
