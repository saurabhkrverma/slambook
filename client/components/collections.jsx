import React from 'react';
import { connect } from "react-redux"
import {Navigate} from "react-router-dom";
import {Row, Card, Spinner, Form} from "react-bootstrap";
import { loadCollectionsAction }  from "../actions/collection";
import {Formik} from "formik";

class Collections extends React.Component {
    constructor(props) {
        super(props);
        this.renderCollection = this.renderCollection.bind(this);
    }

    componentDidMount() {
        this.props.loadCollections();
    }

    renderQuestions(collection){
        const defaultQuestions = ["what do you like in me", "where would you like the two of us fo go"];
        const initialQuestions = collection.form || defaultQuestions;
        const questionsFormElements = initialQuestions.map((question,questionIdx)=>{
            questionIdx=questionIdx+1;
            return (
                <Form.Group className="mb-3" controlId={`${collection.collectionId}-question-${questionIdx}`}>
                    <Form.Label>{`Question ${questionIdx}`}</Form.Label>
                    <Form.Control name={`Question ${questionIdx}`} type="text" placeholder="your question here" value={question}/>
                </Form.Group>
            )
        });
        return questionsFormElements;
    }

    renderCollection() {
        const collections = _.get(this.props,'data.collections',[]);
        const collectionForms = collections.map((collection,collectionIdx)=>{
            const collectionDefaultValue = collection;
            // const
            return (
                <Card bg={"light"}
                      key={collection.collectionId}
                      text={"dark"}
                      className="col-10  col-md-5 collections-card">
                    <Card.Header as="h5">{collectionDefaultValue.name}</Card.Header>
                    <Card.Body>
                        <Formik initialValues={collectionDefaultValue}>
                            {(props)=>(
                                <Form noValidate onSubmit={props.handleSubmit}>
                                    {this.renderQuestions(props.values)}
                                </Form>
                            )}
                        </Formik>
                    </Card.Body>
                </Card>
            )
        });
        return collectionForms;
    }

    render(){

        if(!this.props.user.name) {
            return (<Navigate to={"/login"}></Navigate>)
        }
        if(this.props.data && this.props.data.collections) {
            return (
                <Row className={"collections-cards"}>
                    {this.renderCollection()}
                </Row>
            )
        }
        return(
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }

}

const mapStateToProps = (state) => {

    return {
        data: state.data,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadCollections: () => dispatch(loadCollectionsAction())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Collections);
