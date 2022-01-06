import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { DISMISS_ALERT_BOX } from '../actions/user'

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
        if (this.props.errors && this.props.errors.length > 0) {
            const consolidateErrors =  this.props.errors.map((err,idx)=>{
                return (
                    <div>
                        <span>
                            {err}
                        </span>
                    </div>
                )
            });
            return (
                <Alert key={"errorAlert"} variant={'danger'}  onClick={this.closeAlertBar} dismissible>
                    {consolidateErrors}
                </Alert>
            );

        } else if (this.props.messages && this.props.messages.length > 0) {
            const consolidateMessages =  this.props.messages.map((msg,idx)=>{
                return (
                    <div>
                        <span>
                            {msg}
                        </span>
                    </div>
                )
            });
            return (
                <Alert key={"messageAlert"} variant={'success'} onClick={this.closeAlertBar} dismissible>
                    {consolidateMessages}
                </Alert>
            );
        } else {
            return null;
        }
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
        closeAlertBarAction: () => dispatch({type: DISMISS_ALERT_BOX})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertBar)
