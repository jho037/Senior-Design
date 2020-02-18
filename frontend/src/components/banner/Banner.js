import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import './Banner.css';
export default class Banner extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div>
                <Jumbotron className="jumbo">
                    <h1>Hello, world!</h1>
                    <p>
                        This is a simple hero unit, a simple jumbotron-style component for calling
                        extra attention to featured content or information.
                    </p>
                    <p>
                        <Button variant="primary">Learn more</Button>
                    </p>
                </Jumbotron>
            </div>
        )
    }
}
