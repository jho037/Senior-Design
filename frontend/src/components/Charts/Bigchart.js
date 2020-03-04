import Chart from './Chart';
import React from 'react';
export default class Bigchart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData:{}
        }
    }

    componentWillMount(){
        this.getChartData();
    }

    getChartData(){
        this.setState({
            chartData:{
                labels: ['Red1', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: 'Colors',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ]
                }   
            ]
        }
        });
    }

    render() {
        return (
            <div className="Bigchart">
                <Chart chartData={this.state.chartData} legendPosition="bottom"/>
            </div>
        )
    }
}