import React from "react";
import {Button, Card, Form, Image} from "react-bootstrap";
import {Formik} from "formik";

const _renderFirstNameField = (props) => {
    return (
        <Form.Group className="mb-3 form-inline"  key={"firstName"}>
            <Form.Label><i>{"First name"}</i></Form.Label>
            <Form.Control className="form-control"
                          name={"firstName"}
                          placeholder={"first name"}
                          onChange={props.handleChange}
                          value={props.values.firstName}
                          isValid={!props.errors.firstName}
                          isInvalid={!!props.errors.firstName}/>
            <Form.Control.Feedback type="invalid">{props.errors.firstName}</Form.Control.Feedback>
        </Form.Group>
    )
}

const _renderLastNameField = (props) => {
    return (
        <Form.Group className="mb-3 form-inline"  key={"lastName"}>
            <Form.Label><i>{"Last name"}</i></Form.Label>
            <Form.Control className="form-control"
                          name={"lastName"}
                          onChange={props.handleChange}
                          placeholder={"your last name"}
                          value={props.values.lastName}
                          isValid={!props.errors.lastName}
                          isInvalid={!!props.errors.lastName}/>
            <Form.Control.Feedback type="invalid">{props.errors.lastName}</Form.Control.Feedback>
        </Form.Group>
    )
}

const _renderEmailField = (props) => {
    return (
        <Form.Group className="mb-3 form-inline"  key={"email"}>
            <Form.Label><i>{"Your email"}</i></Form.Label>
            <Form.Control className="form-control"
                          name={`email`}
                          value={props.values.email}
                          placeholder={"your email"}
                          isValid={!props.errors.email}
                          isInvalid={!!props.errors.email}
                          disabled/>
        </Form.Group>
    )
}

const _renderSubmitButton = (props) => {
    return (
        <div className="form-group card-action-button">
            <Button type="submit" variant="outline-primary" disabled={!(props.isValid && props.dirty)}>Update</Button>
        </div>
    )
}


export const UserDetails = (user, handleSubmit, validationSchema) => {
    const defaultValues = {
        "firstName": user.firstName,
        "lastName": user.lastName,
        "email":user.email
    };
    return (
        <Card bg={"dark"}
              key={"text"}
              text={"light"}
              className="collections-card col-sm-10 col-md-3"
              border="secondary">
            <Card.Header as="h5">{"User Details"}</Card.Header>
            <Card.Body>
                <Formik initialValues={defaultValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize={true}>
                    {(props)=>(
                        <Form noValidate onSubmit={props.handleSubmit}>
                            {_renderFirstNameField(props)}
                            {_renderLastNameField(props)}
                            {_renderEmailField(props)}
                            {_renderSubmitButton(props)}
                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    )
};

