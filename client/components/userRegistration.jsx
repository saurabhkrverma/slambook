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
            name: yup.string().required(),
            email: yup.string().required(),
            password: yup.string().required()
        });
        this.onRegisterUserFormSubmit = this.onRegisterUserFormSubmit.bind(this);
        this.renderUserRegistrationForm = this.renderUserRegistrationForm.bind(this);
    }

    onRegisterUserFormSubmit(values, actions) {
        const userInfo = {
            name: values.name,
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

                            <Form.Group className="mb-3" controlId="user-registration-form-name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control name="name" type="email" placeholder="Enter name" value={props.values.name}  onChange={props.handleChange} isValid={!props.errors.name} isInvalid={!!props.errors.name}/>
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
