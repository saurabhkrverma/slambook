import React from 'react';
import { Navbar, Nav, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import {loginUserAction, logoutUserAction} from '../actions/user';


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.renderRightPanel = this.renderRightPanel.bind(this);
    }

    handleLogout() {
        this.props.logoutUser();
    }

    renderRightPanel() {
        if(this.props.user && this.props.user.name){
            return(
                <Nav variant="pills" defaultActiveKey="/home">
                    <Nav.Item>
                        <Nav.Link to="/home" disabled>home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link to="/settings" disabled>settings</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link to="/notifications" disabled>notifications</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={this.handleLogout} >logout</Nav.Link>
                    </Nav.Item>
                </Nav>
            )
        } else {
            return null;
        }
    }

    render() {
        return (
            <Row>
                <Navbar expand="lg" variant={"light"}  collapseOnSelect expand={"lg"} className={"header"}>
                    <Navbar.Brand href="/">slambook</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        {this.renderRightPanel()}
                    </Navbar.Collapse>
                </Navbar>
            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
        errors: state.errors,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUserAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
