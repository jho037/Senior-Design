import Calendar from 'react-calendar'
import React from 'react';

import { Container, Row, Col, Card, CardDeck, ListGroup, ListGroupItem } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css'
import './Cal.css';

export default class Cal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }





    render() {
        return (
            <Calendar
                onClickDay={(value) => this.props.onCLickHandle(value)}
            />
        )
    }
}