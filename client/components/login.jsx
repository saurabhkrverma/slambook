import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik'
import { loginUserAction } from '../actions/user';
import * as yup from 'yup';
import { Navigate } from "react-router-dom";

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            registerUser: false
        };

        this.loginSchema = yup.object().shape({
            email: yup.string().required(),
            password: yup.string().required()
        });

        this.registerUserSchema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().required(),
            password: yup.string().required()
        });

        this.toggleForm = this.toggleForm.bind(this);
        this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
        this.onRegisterUserFormSubmit = this.onRegisterUserFormSubmit.bind(this);
        this.renderUserRegistrationForm = this.renderUserRegistrationForm.bind(this);
        this.renderUserLoginForm = this.renderUserLoginForm.bind(this);
    }

    toggleForm(){
        this.setState((prevState)=>({
            registerUser: !prevState.registerUser
        }));
    }

    onLoginFormSubmit(values, actions) {
        // make call to submit this credentials to server;
        const credentials = {
            email: values.email,
            password: values.password
        }
        this.props.loginUser(credentials);
    }

    onRegisterUserFormSubmit(values, actions) {
        // make call to submit this credentials to server;
        console.log("chalo bhai yahan to aa gaya : ", actions);
    }

    renderUserRegistrationForm(){
        const registerUserFormDefaultValues = {};
        return (
            <div>
                <Formik initialValues={registerUserFormDefaultValues} validationSchema={this.registerUserSchema} onSubmit={this.onRegisterUserFormSubmit}>
                    {(props)=>(
                        <Form noValidate onSubmit={props.handleSubmit}>

                            <Form.Group className="mb-3" controlId="user-registration-form-name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control name="email" type="email" placeholder="Enter name" value={props.values.name}  onChange={props.handleChange} isValid={!props.errors.name} isInvalid={!!props.errors.name}/>
                                <Form.Control.Feedback type="invalid">{props.errors.name}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="user-registration-form-email-id">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" type="email" placeholder="Enter email" value={props.values.email}  onChange={props.handleChange} isValid={!props.errors.email} isInvalid={!!props.errors.email}/>
                                <Form.Control.Feedback type="invalid">{props.errors.email}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="user-registration-form-password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name={"password"} type="password" placeholder="Password" value={props.values.password}  onChange={props.handleChange} isValid={!props.errors.password} isInvalid={!!props.errors.password}/>
                                <Form.Control.Feedback type="invalid">{props.errors.password}</Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>

                        </Form>
                    )}
                </Formik>
                <div onClick={this.toggleForm}>
                    <label>have an account already, login</label>
                </div>
            </div>

        )
    }

    renderUserLoginForm(){
        const loginFormDefaultValues = {};
        return (
            <div>
                <Formik initialValues={loginFormDefaultValues} validationSchema={this.loginSchema} onSubmit={this.onLoginFormSubmit}>
                    {(props)=>(
                        <Form noValidate onSubmit={props.handleSubmit}>

                            <Form.Group className="mb-3" controlId="login-form-email-id">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" type="email" placeholder="Enter email" value={props.values.email}  onChange={props.handleChange} isValid={!props.errors.email} isInvalid={!!props.errors.email}/>
                                <Form.Control.Feedback type="invalid">{props.errors.email}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="login-form-password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name={"password"} type="password" placeholder="Password" value={props.values.password}  onChange={props.handleChange} isValid={!props.errors.password} isInvalid={!!props.errors.password}/>
                                <Form.Control.Feedback type="invalid">{props.errors.password}</Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>

                        </Form>
                    )}
                </Formik>
                <div onClick={this.toggleForm}>
                    <label>don't have an account yet, click here to register now</label>
                </div>
            </div>
        )
    }

    renderForm(){
        if(this.state.registerUser){
            return this.renderUserRegistrationForm()
        } else {
            return this.renderUserLoginForm();
        }
    }

    render() {
        if(this.props.user.name){
            return (<Navigate to={"/home"}></Navigate>);
        }

        return (
            <Row>
                <Col>
                    Welcome to slambook !! we help you connect with your friends and create memories 90s style :)
                </Col>
                <Col>
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

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (credentials) => dispatch(loginUserAction(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
