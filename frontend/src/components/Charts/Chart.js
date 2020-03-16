import React, { Component } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Container, Row, Col } from 'react-bootstrap';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pieData: props.pieData,
            lineData: props.lineData
        }
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPostion: 'right'
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col lg="6">
                            <div className="bg-light-blue mv6">
                                <div className="sub wrapper">
                                    <Line
                                        data={this.props.lineData}
                                        options={{
                                            //maintainAspectRatio: false,
                                            title: {
                                                display: this.props.displayTitle,
                                                text: 'LINE',
                                                fontSize: 25
                                            },
                                            legend: {
                                                display: this.props.displayLegend,
                                                position: this.props.legendPosition
                                            },
                                            // animation: {
                                            //     onProgress: function(animation) {
                                            //         progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
                                            //     }
                                            // }
                                        }}
                                    />
                                </div>
                            </div>
                            
                        </Col>
                        <Col lg="6">
                            <div className="bg-light-blue mv6">
                                <div className="sub wrapper">
                                    <Pie
                                        data={this.props.pieData}
                                        options={{
                                            //maintainAspectRatio: false,
                                            title: {
                                                display: this.props.displayTitle,
                                                text: 'PIE',
                                                fontSize: 25
                                            },
                                            legend: {
                                                display: this.props.displayLegend,
                                                position: this.props.legendPosition
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}


export default Chart;