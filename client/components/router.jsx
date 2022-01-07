import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "./home.jsx";
import Welcome from "./welcome.jsx";
import Collections  from "./collections.jsx"


class Router extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Routes>
                    <Route path="/login" element={<Welcome />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/collections" element={<Collections />} />
                    <Route path="*" element={<Welcome />} />
                </Routes>
            </div>
        )
    }

}

const mapStateToProps = ({ session: { userId} }) => ({
    loggedIn: Boolean(userId)
});

export default Router;
