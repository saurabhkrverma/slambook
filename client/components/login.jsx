import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik'
import { loginUserAction } from '../actions/user';
import * as yup from 'yup';
import { Navigate } from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.schema = yup.object().shape({
            email: yup.string().required(),
            password: yup.string().required()
        });
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(values, actions) {
        // make call to submit this credentials to server;
        const credentials = {
            email: values.email,
            password: values.password
        }
        this.props.loginUser(credentials);
    }

    render() {
        const defaultValues = {};
        if(this.props.user.name){
            return (<Navigate to={"/home"}></Navigate>);
        }
        return (
            <Formik initialValues={defaultValues} validationSchema={this.schema} onSubmit={this.onFormSubmit}>
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
