import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'react-bootstrap'
import { getNotificationsAction, clearNotificationAction } from "../actions/notification";


class Notifications extends React.Component {
    constructor(props) {
        super(props);
        this.clearNotification = this.clearNotification.bind(this);
        this.renderNotifications = this.renderNotifications.bind(this);
    }

    componentDidMount() {
        this.props.loadNotifications();
    }

    clearNotification(notification) {
        // todo: trigger action to remove notification
        this.props.clearNotification(notification);
    }

    renderNotifications() {
        const notifications = this.props.notifications.map((notification, index)=> {
            const submitter = notification.submitterName || notification.submitterEmail;
            return (
                <Row className={"notification-alert"}>
                    <Col className={"col-sm-10 col-md-3"}>
                        <Alert variant={(index % 2 === 0) ? "dark": "light"} onClick={()=>{this.clearNotification(notification)}} dismissible>
                            {`Hi, ${submitter} have submitted an entry for ${notification.collectionName}`}
                        </Alert>
                    </Col>
                </Row>
            )
        });
        return notifications;
    }

    render() {
        return (
            <div>
                {this.renderNotifications()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        notifications: state.data.notifications
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadNotifications: () => dispatch(getNotificationsAction()),
        clearNotification: (notification) => dispatch(clearNotificationAction(notification))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
