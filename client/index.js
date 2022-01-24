import React from "react";
import ReactDom from "react-dom";
import Container from 'react-bootstrap/Container';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import createSlamBookStore from './store';
import Header from './components/header.jsx'
import AlertBar from './components/alertBar.jsx'
import Loader from "./components/loader.jsx";
import Router from "./components/router.jsx";
import './css/index.scss';
import { initializeAppAction }  from "./actions/app";

const Init =  async () => {
    const slamBookStore =  await createSlamBookStore();
    slamBookStore.dispatch(initializeAppAction());
    return ReactDom.render(
        <Provider store={slamBookStore}>
            <Container fluid>
                <BrowserRouter>
                    <Header/>
                    <AlertBar />
                    <Loader/>
                    <Router/>
                </BrowserRouter>
            </Container>

        </Provider>, document.getElementById('root'));
}

Init();
