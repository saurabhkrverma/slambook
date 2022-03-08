import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik'
import { connect } from 'react-redux';
import { registerUserAction} from '../actions/user';
import {userRegistrationValidationSchema, userRegistrationWithOTPValidationSchema } from "../config/validationSchemas"

import * as yup from 'yup';

class UserRegistration extends React.Component {

    constructor(props) {
        super(props);
        this.componentRefs = {
            otpTimerRef: React.createRef()
        }

        this.validationSchema = userRegistrationValidationSchema;
        this.onRegisterUserFormSubmit = this.onRegisterUserFormSubmit.bind(this);
        this.renderUserRegistrationForm = this.renderUserRegistrationForm.bind(this);
        this.startOTPTimer = this.startOTPTimer.bind(this);
    }

    componentDidMount() {
        this.startOTPTimer();
    }

    onRegisterUserFormSubmit(values, actions) {
        if(values && values.preventDefault) {
            // otp resend case
            const user = _.get(this, 'props.app.defaultUser', {});
            this.props.registerUser(user);
        } else {
            this.props.registerUser(values);
        }
    }

    startOTPTimer(duration=60) {
        let timer = duration, seconds;
        let display = this.componentRefs.otpTimerRef;

        const handler = setInterval( () => {
            seconds = parseInt(timer % 60, 10);
            seconds = seconds < 10 ? "0" + seconds : seconds;
            if(display && display.current) {
                display.current.innerText =  `, resend in ${seconds}`;
            }
            if (--timer < 0) {
                const resendLinkHTML = "<a href=\'#\'>Resend</a>";
                if(display && display.current) {
                    display.current.innerHTML = resendLinkHTML;
                    display.current.addEventListener("click", (e)=>{
                        if(e.target) {
                            e.target.hidden = true;
                        }
                        this.onRegisterUserFormSubmit();
                    });
                }
                clearInterval(handler);
            }
        }, 1000);
    }

    renderUserRegistrationForm(){
        const registerUserFormDefaultValues = _.get(this, 'props.app.defaultUser', {});
        const otpHash = _.get(this, 'props.app.defaultUser.otpHash');
        let validationSchema = this.validationSchema;
        if(otpHash) {
            validationSchema =  userRegistrationWithOTPValidationSchema;
        }
        return (
            <Formik initialValues={registerUserFormDefaultValues} validationSchema={validationSchema} onSubmit={this.onRegisterUserFormSubmit}>
                    {(props)=>(
                        <Form noValidate onSubmit={props.handleSubmit}>

                            <Form.Group className="mb-3" controlId="user-registration-form-first-name" hidden={ otpHash }>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control name="firstName" type="text" placeholder="Enter first name" value={props.values.firstName}  onChange={props.handleChange} isValid={!props.errors.firstName} isInvalid={!!props.errors.firstName}/>
                                <Form.Control.Feedback type="invalid">{props.errors.firstName}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="user-registration-form-last-name" hidden={ otpHash }>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control name="lastName" type="text" placeholder="Enter last Name" value={props.values.lastName}  onChange={props.handleChange} isValid={!props.errors.lastName} isInvalid={!!props.errors.lastName}/>
                                <Form.Control.Feedback type="invalid">{props.errors.lastName}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="user-registration-form-email-id" hidden={ otpHash }>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" type="email" placeholder="Enter email" value={props.values.email}  onChange={props.handleChange} isValid={!props.errors.email} isInvalid={!!props.errors.email}/>
                                <Form.Control.Feedback type="invalid">{props.errors.email}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="user-registration-form-password" hidden={ otpHash }>
                                <Form.Label>Password</Form.Label>
                                <Form.Control name={"password"} type="password" placeholder="Password" value={props.values.password}  onChange={props.handleChange} isValid={!props.errors.password} isInvalid={!!props.errors.password}/>
                                <Form.Control.Feedback type="invalid">{props.errors.password}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="user-registration-form-password-confirm" hidden={ otpHash }>
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control name={"confirmPassword"} type="confirmPassword" placeholder="Password" value={props.values.confirmPassword}  onChange={props.handleChange} isValid={!props.errors.confirmPassword} isInvalid={!!props.errors.confirmPassword}/>
                                <Form.Control.Feedback type="invalid">{props.errors.confirmPassword}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3 form-inline"  key={"otpValue"} hidden={!otpHash}>
                                <Form.Label><i>{"Enter OTP sent to your email"}</i> <b ref={this.componentRefs.otpTimerRef}></b></Form.Label>
                                <Form.Control className="form-control" name={`otpValue`} placeholder={"enter OTP"}
                                              onChange={(e)=>{
                                                  // find a better way to pass otp hash values to submit handler
                                                  if((props.values && !props.values.otpHash) || (otpHash && (props.values.otpHash !== otpHash))){
                                                      props.values.otpHash = otpHash
                                                  }
                                                  props.handleChange(e);
                                              }}
                                              value={props.values.otpValue}
                                              isValid={!props.errors.otpValue}
                                              isInvalid={!!props.errors.otpValue}/>
                                <Form.Control.Feedback type="invalid">{props.errors.otpValue}</Form.Control.Feedback>
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

const mapStateToProps = (state) => {
    return {
        app: state.app
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (userInfo) => dispatch(registerUserAction(userInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration);
