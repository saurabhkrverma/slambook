import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
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
        console.log("is this a good approach");
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
        if(this.props.user && this.props.user.name){
            return (<Navigate to={"/home"}></Navigate>);
        }

        return (
            <Row>
                <Col className={"col-12  col-md-6"}>
                    Welcome to slambook !! we help you connect with your friends and create memories 90s style :)
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
        user: state.user
    };
};

export default connect(mapStateToProps, null)(Welcome);