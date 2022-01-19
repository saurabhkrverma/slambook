import React from 'react';
import { connect } from "react-redux"
import {Navigate} from "react-router-dom";
import {Row, Carousel, Card, Spinner} from "react-bootstrap";
import { addCollectionAction, loadCollectionsAction, deleteCollectionAction }  from "../actions/collection";
import { DEFAULT_COLLECTION } from "../config/constants"
import Collection from './collection';

class Collections extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
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
        if(collections && collections.length > 0){
            collections.push(DEFAULT_COLLECTION);
            return collections.map(collection => Collection(collection, this.handleSubmit));
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
