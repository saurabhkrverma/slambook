import {Button, Card, Dropdown, DropdownButton, Form, InputGroup, FormControl} from "react-bootstrap";
import { FieldArray, Formik} from "formik";
import React from "react";
import { SAMPLE_QUESTIONS }  from "../../config/constants";

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

const _openShare = async (collection) => {
    const url = window.location.origin + "/public/post/" + collection.collectionId
    const shareData = {
        title: 'Share the slambook',
        text: `Select the available option to share it with your friends`,
        url: `${url}`
      }
      await navigator.share(shareData)
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
                    {navigator.share && <Button variant="outline-success" id="button-addon1" onClick={async ()=>{_openShare(collection)}} >
                        <span>
                            <i className="bi bi-share"></i>
                        </span>
                    </Button>}
                </InputGroup>

            </Card.Footer>
        )
    } else {
        return null;
    }
}

const _createSampleQuestionsDropdownOptions = (sampleQuestions = SAMPLE_QUESTIONS) => {
    const questionOptions = sampleQuestions.map((sampleQuestion, index)=>{
        return (
            <Dropdown.Item eventKey={sampleQuestion.question}>{sampleQuestion.question}</Dropdown.Item>
        )
    })
    questionOptions.push(<Dropdown.Divider />);
    questionOptions.push(<Dropdown.Item eventKey="">Write new question</Dropdown.Item>);
    return questionOptions;
}

const _renderSampleQuestionsDropdown = (collection, props, index) => {
    if(!collection.sampleCollection) {
        return null;
    }
    const onSelectHandler = (eventKey, event) => {
        props.values.questionnaire[index].question = eventKey;
        let elem = document.getElementById(`${collection.collectionId}.questionnaire.${index}.question`);
        elem.value = eventKey;
        props.handleChange(`questionnaire.${index}.question`);
    }
    return (
        <DropdownButton variant="primary" title="Questions" id={`questionnaire.${index}.question-dropdown`} onSelect={onSelectHandler}>
            {_createSampleQuestionsDropdownOptions(SAMPLE_QUESTIONS)}
        </DropdownButton>
    )
}

const _test = (collection, props, index, fieldError, fieldValue) => {
    if(collection.sampleCollection) {
        return (
            <>
                <Form.Control className="form-control" name={`questionnaire.${index}.question`}
                              placeholder={"your question here"}
                              onChange={props.handleChange}
                              value={fieldValue}
                              disabled={!collection.sampleCollection}
                              isValid={!fieldError}
                              isInvalid={!!fieldError}
                              id={`${collection.collectionId}.questionnaire.${index}.question`}/>
                <Form.Control.Feedback type="invalid">{fieldError}</Form.Control.Feedback>
            </>
        )
    } else {
        return (
            <Form.Control className="form-control slambook-questionnaire-static" name={`questionnaire.${index}.question`}
                          placeholder={"your question here"}
                          onChange={props.handleChange}
                          value={fieldValue}
                          disabled={!collection.sampleCollection}
                          isValid={!fieldError}
                          isInvalid={!!fieldError}
                          id={`${collection.collectionId}.questionnaire.${index}.question`}/>
        )
    }
}

const  _questionnaire = (collection, props) => {
    const questionnaires = props.values.questionnaire.map((obj, index) => {
        const fieldError = _.get(props, `errors.questionnaire.${index}.question`);
        let fieldValue = _.get(obj, "question");
        return (
            <Form.Group className="mb-3" key={`questionnaire.${index}.question`}>
                <InputGroup className="mb-3">

                    { _renderSampleQuestionsDropdown(collection, props, index) }
                    { _test(collection, props, index, fieldError, fieldValue) }

                </InputGroup>
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
                <Button type="submit" disabled={!(props.isValid && props.dirty)} variant="outline-success">Create</Button>
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
            <Card bg={"dark"}
                  key={`${collection.collectionId}-collection`}
                  text={"light"}
                  className="collections-card col-sm-10 col-md-3"
                  border="secondary">
                <Card.Header as="h5">{(collection.sampleCollection) ? collection.name : `${collection.collectionName}`}</Card.Header>
                <Card.Body>
                    <Formik initialValues={collection} onSubmit={handleSubmit}  validationSchema={validationSchema} key={`formik-${collection.collectionId}-collection`}>
                        {(props)=>(
                            <Form noValidate onSubmit={props.handleSubmit} key={`form-${collection.collectionId}-collection`}>

                                {_renderNameField(collection,props)}

                                {(collection.sampleCollection ? <hr/>: null)}

                                {(collection.sampleCollection ? <Form.Label><i>{`Questions: select from sample or write your very own`}</i></Form.Label> : <Form.Label><i>{"Questions in your slambook"}</i></Form.Label>)}

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
    )
};

export default Collection;

