import React from "react";
import ReactDom from "react-dom";
import Container from 'react-bootstrap/Container';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import createSlamBookStore from './store';
import Header from './components/header.jsx'
import AlertBar from './components/alertBar.jsx'
import Router from "./components/router.jsx";
import './css/index.scss'

const Init =  async () => {
    const slamBookStore =  await createSlamBookStore();
    return ReactDom.render(
        <Provider store={slamBookStore}>
            <Container fluid>
                <BrowserRouter>
                    <Header/>
                    <AlertBar />
                    <Router/>
                </BrowserRouter>
            </Container>

        </Provider>, document.getElementById('root'));
}

Init();
