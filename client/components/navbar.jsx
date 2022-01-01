import React from 'react';
import {Link} from 'react-router-dom';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>slambook</h1>
                <nav>
                    <Link to="/login">login</Link>
                    <Link to="/home">home</Link>
                </nav>
            </div>
        )
    }

}

export default Navbar;
