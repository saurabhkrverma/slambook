import React from 'react';
import { connect } from "react-redux"
import {Row, Carousel, Card, Spinner} from "react-bootstrap";
import { addCollectionAction, loadCollectionsAction, deleteCollectionAction }  from "../actions/collection";
import Collection from './functionalComponents/collections.js';
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
        if(this.props.collections && this.props.collections.length>1) {
            // collections are already in state and no need to call the API again
            return
        }
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
        return collections.map(collection => Collection(collection, this.handleSubmit, this.validationSchema));
    }

    render(){
        return (
         <Row className={"collections-cards"}>
            {this.renderCollections()}
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
