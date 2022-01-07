import React from 'react';
import { connect } from "react-redux"
import {Navigate} from "react-router-dom";
import { loadCollectionsAction }  from "../actions/collection"

class Collections extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadCollections();
    }

    render(){
        if(!this.props.user.name) {
            return (<Navigate to={"/login"}></Navigate>)
        }
        if(this.props.data && this.props.data.questionnaire) {
            return (
                <div>
                    check the redux state bro, questionnaries must be here :)
                </div>
            )
        }
        return(
            <div>
                your collection of slambooks are going to come up here...coming soon !!
            </div>
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
