import React from "react";
import {Modal, Spinner} from "react-bootstrap";
import { connect } from 'react-redux';

class Loader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                show={this.props.showLoader}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className={"loader"}
            >
                <Modal.Body>
                    <Spinner animation="border" role="status" className="spinner-full-screen">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Modal.Body>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        showLoader: state.app.showLoader
    }
}


export default connect(mapStateToProps)(Loader);
