import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik'
import { connect } from 'react-redux';
import { registerUserAction} from '../actions/user'

import * as yup from 'yup';

class UserRegistration extends React.Component {

    constructor(props) {
        super(props);

        this.registerUserSchema = yup.object().shape({
            firstName: yup.string().required(),
            lastName: yup.string().required(),
            email: yup.string().required().matches(/^\S+@\S+\.\S+$/, 'not a valid email'),
            password: yup.string().required(),
            confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match')
        });
        this.onRegisterUserFormSubmit = this.onRegisterUserFormSubmit.bind(this);
        this.renderUserRegistrationForm = this.renderUserRegistrationForm.bind(this);
    }

    onRegisterUserFormSubmit(values, actions) {
        const userInfo = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password
        }

        this.props.registerUser(userInfo);
    }

    renderUserRegistrationForm(){
        const registerUserFormDefaultValues = {};
        return (
            <Formik initialValues={registerUserFormDefaultValues} validationSchema={this.registerUserSchema} onSubmit={this.onRegisterUserFormSubmit}>
                    {(props)=>(
                        <Form noValidate onSubmit={props.handleSubmit}>

                            <Form.Group className="mb-3" controlId="user-registration-form-first-name">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control name="firstName" type="text" placeholder="Enter first name" value={props.values.firstName}  onChange={props.handleChange} isValid={!props.errors.firstName} isInvalid={!!props.errors.firstName}/>
                                <Form.Control.Feedback type="invalid">{props.errors.firstName}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="user-registration-form-last-name">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control name="lastName" type="text" placeholder="Enter last Name" value={props.values.lastName}  onChange={props.handleChange} isValid={!props.errors.lastName} isInvalid={!!props.errors.lastName}/>
                                <Form.Control.Feedback type="invalid">{props.errors.lastName}</Form.Control.Feedback>
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

                            <Form.Group className="mb-3" controlId="user-registration-form-password-confirm">
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control name={"confirmPassword"} type="confirmPassword" placeholder="Password" value={props.values.confirmPassword}  onChange={props.handleChange} isValid={!props.errors.confirmPassword} isInvalid={!!props.errors.confirmPassword}/>
                                <Form.Control.Feedback type="invalid">{props.errors.confirmPassword}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3 text-align-center" controlId="user-registration-form-submit">
                                <Button variant="secondary" type="submit" disabled={!(props.isValid && props.dirty)}>
                                    Register
                                </Button>
                            </Form.Group>

                        </Form>
                    )}
                </Formik>
        )
    }

    render() {
        return this.renderUserRegistrationForm();
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (userInfo) => dispatch(registerUserAction(userInfo))
    }
}

export default connect(null, mapDispatchToProps)(UserRegistration);
