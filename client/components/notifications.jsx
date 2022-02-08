import React from 'react';
import { connect } from 'react-redux';
import { getNotificationsAction } from "../actions/notification";


class Notifications extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadNotifications();
    }

    render() {
        return (
            <div>
                {JSON.stringify(this.props.notifications)}
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
        loadNotifications: () => dispatch(getNotificationsAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
