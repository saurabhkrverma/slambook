import {Button, Card, Carousel, Row, Form, InputGroup, FormControl} from "react-bootstrap";
import { FieldArray, Formik} from "formik";
import React from "react";

const _copyLink = (collection) => {
    const shareLink = window.location.origin + "/public/post/" + collection.collectionId;
    const copyClipboard = document.getElementById(`share_link_${collection.collectionId}_clipboard`);
    const copyClipboardCheck = document.getElementById(`share_link_${collection.collectionId}_clipboard_check`);
    if(navigator && navigator.clipboard) {
        navigator.clipboard.writeText(shareLink).then(function() {
            copyClipboard.hidden = true;
            copyClipboardCheck.hidden = false;
        }, function() {
            copyClipboard.hidden = false;
            copyClipboardCheck.hidden = true;
        });
    }
}

const _renderFooter = (collection, props) => {
    if(!collection.sampleCollection) {
        const shareLink = window.location.origin + "/public/post/" + collection.collectionId;
        return (
            <Card.Footer className="text-muted card-collection-footer">

                <div>copy link and share with your friends </div>

                <InputGroup className="mb-3">
                    <FormControl aria-describedby="basic-addon2" type="text" id={`share_link_${collection.collectionId}`} value={shareLink} disabled={true}/>
                    <Button variant="outline-success" id="button-addon1" onClick={()=>{_copyLink(collection)}} >
                        <span id={`share_link_${collection.collectionId}_clipboard`}>
                            <i className="bi bi-clipboard"></i>
                        </span>
                        <span id={`share_link_${collection.collectionId}_clipboard_check`} hidden={true}>
                            <i className="bi bi-clipboard-check"></i>
                        </span>
                    </Button>
                </InputGroup>

            </Card.Footer>
        )
    } else {
        return null;
    }
}

const  _questionnaire = (collection, props) => {
    const questionnaires = props.values.questionnaire.map((obj, index) => {
        const fieldError = _.get(props, `errors.questionnaire.${index}.question`);
        const fieldValue = _.get(obj, "question");
        return (
            <Form.Group className="mb-3" key={`questionnaire.${index}.question`}>
                <Form.Control className="form-control" name={`questionnaire.${index}.question`}
                              placeholder={"question here"}
                              onChange={props.handleChange}
                              value={fieldValue}
                              disabled={!collection.sampleCollection}
                              isValid={!fieldError}
                              isInvalid={!!fieldError}/>
                <Form.Control.Feedback type="invalid">{fieldError}</Form.Control.Feedback>
            </Form.Group>
        )
    });

    return questionnaires;
}

const _renderNameField = (collection, props) => {
    if(collection.sampleCollection){
        return (
            <Form.Group className="mb-3 form-inline"  key={"collectionName"}>
                <Form.Label><i>{"slambook's name"}</i></Form.Label>
                <Form.Control className="form-control" name={`collectionName`} placeholder={"name for your slambook"}
                              onChange={props.handleChange}
                              isValid={!props.errors.collectionName}
                              isInvalid={!!props.errors.collectionName}/>
                <Form.Control.Feedback type="invalid">{props.errors.collectionName}</Form.Control.Feedback>
            </Form.Group>
        )
    } else {
        return null;

    }
}

const  _renderSubmitButton = (collection, props) => {
    if(collection.sampleCollection){
        return (
            <div className="form-group card-action-button" key={`formik-${collection.collectionId}-submit`}>
                <Button type="submit" disabled={!(props.isValid && props.dirty)} variant="outline-success">Save</Button>
            </div>
        )
    } else {
        return (
            <div className="form-group card-action-button" key={`formik-${collection.collectionId}-submit`}>
                <Button type="submit" variant="outline-danger">Delete</Button>
            </div>
        )
    }
}

export const Collection = (collection, handleSubmit, validationSchema={}) => {
    return (
        <Carousel.Item>
            <Card bg={"light"}
                  key={`${collection.collectionId}-collection`}
                  text={"dark"}
                  className="collections-card"
                  border="secondary">
                <Card.Header as="h5">{(collection.sampleCollection) ? collection.name : `${collection.collectionName}`}</Card.Header>
                <Card.Body>
                    <Formik initialValues={collection} onSubmit={handleSubmit}  validationSchema={validationSchema} key={`formik-${collection.collectionId}-collection`}>
                        {(props)=>(
                            <Form noValidate onSubmit={props.handleSubmit} key={`form-${collection.collectionId}-collection`}>

                                {_renderNameField(collection,props)}

                                {(collection.sampleCollection ? <hr/>: null)}

                                <FieldArray
                                    name="questionnaire"
                                    render={arrayHelpers => _questionnaire(collection, props)} />

                                {_renderSubmitButton(collection, props)}

                            </Form>
                        )}
                    </Formik>
                </Card.Body>
                {_renderFooter(collection)}
            </Card>
        </Carousel.Item>
    )
};

export default Collection;

