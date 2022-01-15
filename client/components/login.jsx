import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik'
import { loginUserAction } from '../actions/user';
import * as yup from 'yup';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.loginSchema = yup.object().shape({
            email: yup.string().required().matches(/^\S+@\S+\.\S+$/, 'not a valid email'),
            password: yup.string().required()
        });

        this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
        this.renderUserLoginForm = this.renderUserLoginForm.bind(this);
    }

    onLoginFormSubmit(values, actions) {
        // make call to submit this credentials to server;
        const credentials = {
            email: values.email,
            password: values.password
        }
        this.props.loginUser(credentials);
    }

    renderUserLoginForm(){
        const loginFormDefaultValues = {
            "email": "",
            "password": ""
        };
        return (
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

                            <Form.Group className="mb-3 text-align-center" controlId="login-form-submit">
                                <Button variant="secondary" type="submit" disabled={!(props.isValid && props.dirty)}>
                                    Login
                                </Button>
                            </Form.Group>

                        </Form>
                    )}
                </Formik>
        )
    }

    render() {
        return this.renderUserLoginForm();
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (credentials) => dispatch(loginUserAction(credentials))
    }
}

export default connect(null, mapDispatchToProps)(Login);
