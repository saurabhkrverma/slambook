import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom"
import {Row} from 'react-bootstrap'
import Collections from "./collections.jsx"
import Posts from "./posts.jsx"

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    renderCollections () {
        return (
            <Row>
                {<Collections {...this.props}/>}
            </Row>
        );
    }

    renderPosts () {
        return (
            <Row>
                {<Posts {...this.props}/>}
            </Row>
        );
    }

    render() {
        if(!this.props.user.name) {
            return (<Navigate to={"/login"}></Navigate>)
        } else {
            return(
                <Row>
                    <div>
                        {this.renderCollections()}
                    </div>
                    <br/>
                    <h5 style={{"text-align":"center"}}>Posts</h5>
                    <hr></hr>
                    <div>
                        {this.renderPosts()}
                    </div>
                </Row>
            )
        }
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Home);
