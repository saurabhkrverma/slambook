import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik'
import { updateUserPasswordAction } from '../actions/user';
import * as yup from 'yup';

class ResetPassword extends React.Component {

    constructor(props) {
        super(props);

        this.resetPasswordSchema = yup.object().shape({
            email: yup.string().required().matches(/^\S+@\S+\.\S+$/, 'not a valid email'),
            password: yup.string().required().min(6),
            confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match')
        });

        this.onResetPasswordSubmit = this.onResetPasswordSubmit.bind(this);
        this.renderResetPasswordForm = this.renderResetPasswordForm.bind(this);
    }

    onResetPasswordSubmit(values, actions) {
        // make call to submit this credentials to server;
        const credentials = {
            email: values.email,
            password: values.password
        }
        this.props.resetPassword(credentials);
    }

    renderResetPasswordForm(){
        const resetPasswordFormDefaultValues = {
            "email": "",
            "password": "",
            "confirmPassword": ""
        };
        return (
            <Formik initialValues={resetPasswordFormDefaultValues} validationSchema={this.resetPasswordSchema} onSubmit={this.onResetPasswordSubmit}>
                {(props)=>(
                    <Form noValidate onSubmit={props.handleSubmit}>

                        <Form.Group className="mb-3" controlId="reset-password-form-email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Enter email" value={props.values.email}  onChange={props.handleChange} isValid={!props.errors.email} isInvalid={!!props.errors.email}/>
                            <Form.Control.Feedback type="invalid">{props.errors.email}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="reset-password-form-password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Enter password" value={props.values.password}  onChange={props.handleChange} isValid={!props.errors.password} isInvalid={!!props.errors.password}/>
                            <Form.Control.Feedback type="invalid">{props.errors.password}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="reset-password-form-password-confirm">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control name={"confirmPassword"} type="confirmPassword" placeholder="Password" value={props.values.confirmPassword}  onChange={props.handleChange} isValid={!props.errors.confirmPassword} isInvalid={!!props.errors.confirmPassword}/>
                            <Form.Control.Feedback type="invalid">{props.errors.confirmPassword}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3 text-align-center" controlId="login-form-submit">
                            <Button variant="secondary" type="submit" disabled={!(props.isValid && props.dirty)}>
                                Reset
                            </Button>
                        </Form.Group>

                    </Form>
                )}
            </Formik>
        )
    }

    render() {
        return this.renderResetPasswordForm();
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        resetPassword: (credentials) => dispatch(updateUserPasswordAction(credentials))
    }
}

export default connect(null, mapDispatchToProps)(ResetPassword);
