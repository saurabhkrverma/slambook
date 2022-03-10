import React from "react";
import {Row, Card, Nav, Image} from "react-bootstrap";
import { Link } from "react-router-dom";

const renderCollectionsLinkWidget = () => {
    return (
        <Row className={"collections-cards collections-card-widget"}>
            <Card className={"col-sm-10, col-md-3"}>
                <Card.Body>
                    <div className={"add-slambook-icon add-slambook-icon-pulse"}>
                        <Image className="pulse-button" src={"/icons/add-slambook.png"} roundedCircle={true} fluid={true}></Image>
                    </div>
                    <div className={"add-slambook-options"}>
                        <Nav.Link as={Link} to="/collections">Create new slambook</Nav.Link>
                        <hr></hr>
                        <Nav.Link as={Link} to="/collections">Select existing one to share</Nav.Link>
                    </div>
                </Card.Body>
            </Card>
        </Row>
    )
}

export default renderCollectionsLinkWidget;
