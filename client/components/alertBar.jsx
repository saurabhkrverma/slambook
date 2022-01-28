import React from 'react';
import { Row, Col, Alert, Collapse, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ACTIONS } from "../config/constants"
import {showLoader} from "../actions/app";

class AlertBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showAlert: false
        }
        this.closeAlertBar = this.closeAlertBar.bind(this);
    }

    closeAlertBar () {
        this.props.closeAlertBarAction();
    }

    renderAlertMessages () {
        let consolidateErrors, consolidateMessages;

        if (this.props.errors && this.props.errors.length > 0) {
             consolidateErrors =  this.props.errors.map((err,idx)=>{
                return (
                    <div key={`alertbar-error-${idx}`}>
                        <span>
                            {err}
                        </span>
                    </div>
                )
            });
        } else if (this.props.messages && this.props.messages.length > 0) {
             consolidateMessages =  this.props.messages.map((msg,idx)=>{
                return (
                    <div key={`alertbar-message-${idx}`}>
                        <span>
                            {msg}
                        </span>
                    </div>
                )
            });
        }

        if(consolidateErrors || consolidateMessages){
            const closeAlertBox = setTimeout(this.closeAlertBar,5000);
        }

        return (
            <Collapse in={(consolidateErrors || consolidateMessages)}>
                <div>
                    <Alert key={"alertbar-error"} variant={(consolidateErrors ? 'danger' : 'success')}  onClick={this.closeAlertBar} dismissible>
                        {(consolidateErrors ? consolidateErrors : consolidateMessages)}
                    </Alert>
                </div>
            </Collapse>
        )
    }

    render() {
        return (
            <Row>
                <Col>
                    {this.renderAlertMessages()}
                </Col>
            </Row>
        )
    }

}

const mapStateToProps = (state)=> {
    return {
        messages: state.messages,
        errors: state.errors
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {
        closeAlertBarAction: () => dispatch({type: ACTIONS.DISMISS_ALERT_BOX})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertBar)
