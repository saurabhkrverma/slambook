import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Alert, Button, Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { getNotificationsAction, clearNotificationAction, clearAllNotificationsAction } from "../actions/notification";


class Notifications extends React.Component {
    constructor(props) {
        super(props);
        this.clearNotification = this.clearNotification.bind(this);
        this.clearAllNotification = this.clearAllNotification.bind(this);
        this.renderNotifications = this.renderNotifications.bind(this);
        this.renderClearAllButton = this.renderClearAllButton.bind(this);
    }

    componentDidMount() {
        this.props.loadNotifications();
    }

    clearNotification(notification) {
        this.props.clearNotification(notification);
    }

    clearAllNotification() {
        this.props.clearAllNotifications();
    }

    noNotificationMessage() {
        return (
            <Row className={"notification-alert"}>
                <Col className={"col-sm-10 col-md-3"}>
                    <Alert variant={"dark"}>
                        No new notifications !
                    </Alert>
                </Col>
            </Row>
        )
    }

    renderClearAllButton() {
        return (
            <Row className={"notification-clear-button"}>
                <Col className={"col-sm-10 col-md-3"}>
                    <Button variant="link" onClick={this.clearAllNotification}>Clear all</Button>
                </Col>
            </Row>
        )
    }

    renderHomepageLink() {
        return (
            <Row className={"notification-clear-button"}>
                <Col className={"col-sm-10 col-md-3"}>
                    <Nav.Link as={Link} to="/home">home</Nav.Link>
                </Col>
            </Row>
        )
    }

    renderNotifications() {
        const notifications = this.props.notifications.map((notification, index)=> {
            notification.index = index;
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
        if(notifications.length > 0) {
            const clearAllButton = this.renderClearAllButton();
            notifications.push(clearAllButton);
        } else {
            const noNotificationsMessage =this.noNotificationMessage()
            notifications.push(noNotificationsMessage);
            const homePageLink = this.renderHomepageLink();
            notifications.push(homePageLink);
        }
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
        clearNotification: (notification) => dispatch(clearNotificationAction(notification)),
        clearAllNotifications: () => dispatch(clearAllNotificationsAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
