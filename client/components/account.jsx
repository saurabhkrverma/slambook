import React from 'react';
import { connect } from 'react-redux';
import { Row } from "react-bootstrap";
import * as yup from "yup";
import { UserDetails } from "./functionalComponents/account.js";
import { updateUserAction } from "../actions/user";
import {Navigate} from "react-router-dom";


class Account extends React.Component {
    constructor(props) {
        super(props);
        this.userSchema = yup.object().shape({
            firstName: yup.string().required("This is a mandatory field"),
            lastName: yup.string().required("This is a mandatory field"),
            email: yup.string().required().matches(/^\S+@\S+\.\S+$/, 'not a valid email')
        });
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values, props) {
        this.props.updateUserInfo(values);
    }

    render() {

        if(this.props.requests && this.props.requests.length > 0) {
            return (<Navigate to={"/request"}></Navigate>);
        }

        if(this.props.user && this.props.user.firstName){
            return (<Navigate to={"/home"}></Navigate>);
        }

        return (
            <Row className={"collections-cards"}>
                {UserDetails(this.props.user, this.handleSubmit, this.userSchema)}
            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserInfo: (userInfo) => dispatch(updateUserAction(userInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
