import React from 'react';
import { connect } from "react-redux"
import {Row, Carousel, Card, Spinner} from "react-bootstrap";
import { addCollectionAction, loadCollectionsAction, deleteCollectionAction }  from "../actions/collection";
import Collection from './collection';
import * as yup from "yup";

class Collections extends React.Component {
    constructor(props) {
        super(props);

        this.validationSchema = yup.object().shape({
            collectionName: yup.string().required("slambook name is required"),
            questionnaire: yup.array()
                .of(
                    yup.object().shape({
                        question: yup.string().required("Required")
                    })
                )
        });

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderCollections = this.renderCollections.bind(this);
    }

    componentDidMount() {
        this.props.loadCollections();
    }

    handleSubmit(values, actions) {
        if(values.sampleCollection){
            values.name = values.collection_name;
            this.props.addCollection(values);
        } else {
            this.props.deleteCollection(values);
        }
    }

    renderCollections(){
        const collections = this.props.collections;
        if(collections){
            return collections.map(collection => Collection(collection, this.handleSubmit, this.validationSchema));
        } else {
            return (
                <Carousel.Item>
                    <Card bg={"light"}
                          key={"collections_loading"}
                          text={"dark"}
                          className="collections-card"
                          border="secondary">
                        <Card.Header as="h5">
                            <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>
                            &nbsp; Loading...
                        </Card.Header>
                        <Card.Body className={"collections-card-body-loading"}>
                            <Spinner animation="border" variant="secondary" />
                        </Card.Body>
                    </Card>
                </Carousel.Item>
            )
        }

    }

    render(){
        return (
         <Row className={"collections-cards"}>
             <Carousel variant="dark" className={"col-sm-10, col-md-3"}>
                {this.renderCollections()}
             </Carousel>
         </Row>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        collections: state.data.collections,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCollection: (collection) => dispatch(addCollectionAction(collection)),
        loadCollections: () => dispatch(loadCollectionsAction()),
        deleteCollection: (collection)=> dispatch(deleteCollectionAction(collection))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Collections);
