import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import Login from "./login.jsx";
import Home from "./home.jsx";


class Router extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="*" element={<Login />} />
                </Routes>
            </div>
        )
    }

}

const mapStateToProps = ({ session: { userId} }) => ({
    loggedIn: Boolean(userId)
});

export default Router;
