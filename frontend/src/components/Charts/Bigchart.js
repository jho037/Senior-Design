import Chart from './Chart';
import React from 'react';
import { MDBProgress, MDBTypography } from 'mdbreact';
import { Container, Row, Col, Card, CardDeck, ListGroup, ListGroupItem } from 'react-bootstrap';
import Transactions from '../Transactions/transactions';
import './Bigchart.css';
import Cal from '../Cal/Cal';


export default class Bigchart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {},
            pieData: {},
            lineData: {},
            categories: [],
            pamounts: [],
            dates: [],
            lamounts: [],
            total: 0,
            percent: 0,
            calendarData: []
        }
    }

    componentDidMount() {

        var dataCat = [];
        var dataAmo = [];
        fetch("http://localhost:9000/users/pieChartTrans", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.props.user.id
            })
        })
            .then(response => response.json())
            .then(res => {
                this.getPieData(res.categories, res.pamounts)
            });

        fetch("http://localhost:9000/users/lineChartTrans", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.props.user.id
            })
        })
            .then(response => response.json())
            .then(res => {
                console.log("here");
                this.getLineData(res.dates, res.lamounts)
            });
        if (this.state.categories[0] == null) {
        }

        fetch("http://localhost:9000/plaid/progressTrans", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                accessToken: this.props.user.accessToken
            })
        })
            .then(response => response.json())
            .then(res => {
                console.log(res["transactions"]);
                var temp = res["transactions"];
                var trans = [];
                trans = temp.map(indx => {
                    return indx.amount;
                })
                var result = 0;
                result = trans.reduce((tot, indx) => {
                    if (indx < 0) {
                        return tot;
                    }
                    return tot + indx;
                })
                var per = result / this.props.user.goal
                this.setState({
                    percent: Math.floor(per * 100),
                    total: Math.floor(result * 100) / 100
                })
            });

    }
    // setHandler = (cat, amo) => {
    //     console.log(cat);
    //     console.log(amo);
    //     this.setState({ categories: cat, amounts: amo })
    //     console.log(this.state.categories);
    //     console.log(this.state.amounts);
    //     this.getChartData();
    // }
    getPieData(cat, amo) {
        this.setState({
            // chartData: {
            pieData: {
                labels: cat,
                datasets: [{
                    label: 'Colors',
                    data: amo,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ]
                }]
            }
        });
    }

    getLineData(dat, amo) {
        this.setState({
            lineData: {
                labels: dat,
                datasets: [{
                    label: 'Purchases',
                    data: amo,
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)'
                    ]
                }]
            }
        });
    }

    onCLickHandle = (date) => {
        var value = date.toLocaleDateString("en-CA")
        fetch("http://localhost:9000/users/searchTrans", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.props.user.id
            })
        })
            .then(response => response.json())
            .then(res => {
                var trans = [];
                trans = res;
                var result = [];
                result = trans.filter(indx => indx[3] == value);

                if (result.length == 0) {
                    result[0] = ["none", ["none"], "none", "none"];

                }
                console.log(result);
                this.setState({
                    calendarData: result
                })
            });
    }


    render() {
        return (
            <div className="Bigchart">
                {/* <Container fluid> */}
                <MDBTypography className="head" tag='h1' variant="h1-responsive">Welcome Back, {this.props.user.name}</MDBTypography>
                <Chart pieData={this.state.pieData} lineData={this.state.lineData} legendPosition="bottom" />
                <Card className="text-center mt-5">
                    <Card.Header>Monthly Goal Progress</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="bg-light-gray">Your Goal: ${this.props.user.goal}</ListGroup.Item>
                        <ListGroup.Item className="bg-light-gray">Total Spent: ${this.state.total}</ListGroup.Item>
                        <ListGroup.Item className="bg-light-gray">Remaining: ${this.props.user.goal - this.state.total}</ListGroup.Item>
                        <ListGroup.Item className="bg-light-gray">
                            <MDBProgress className="mt-3 m bg-white" material value={this.state.percent} striped animated>
                                {this.state.percent}%
                                </MDBProgress>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
                <Container fluid>
                    <Row center>
                        <Col auto >
                            <div className='mt-5 mb-5 '>
                                <Cal
                                    onCLickHandle={this.onCLickHandle}
                                />
                            </div>
                        </Col>
                        {/* </Row>
                    <Row> */}
                        <Col auto className="bg-white">
                            <div className="table-wrapper-scroll-y my-custom-scrollbar mt-5">
                                <table responsive className="table table-bordered table-striped mb-5">
                                    <thead>
                                        <tr>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Categories</th>
                                            <th scope="col">Dates</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.calendarData.map(trans => {
                                            return (
                                                < tr >
                                                    <th scope="row">${trans[0]}</th>
                                                    <td>{trans[2]} </td>
                                                    <td>{trans[1].join(", ")}</td>
                                                    <td>{trans[3]}</td>
                                                </tr>
                                            )
                                        })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div >
        )
    }
}
