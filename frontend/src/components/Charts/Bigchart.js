import Chart from './Chart';
import React from 'react';
export default class Bigchart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {},
            categories: [],
            amounts: []
        }
    }

    componentDidMount() {
        var dataCat = [];
        var dataAmo = [];
        fetch("http://localhost:9000/users/pieChartTrans", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.props.user
            })
        })
            .then(response => response.json())
            .then(res => {
                this.getChartData(res.categories, res.amounts)
            });
        if (this.state.categories[0] == null) {
            this.forceUpdate();
        }

    }
    // setHandler = (cat, amo) => {
    //     console.log(cat);
    //     console.log(amo);
    //     this.setState({ categories: cat, amounts: amo })
    //     console.log(this.state.categories);
    //     console.log(this.state.amounts);
    //     this.getChartData();
    // }
    getChartData(cat, amo) {
        this.setState({
            chartData: {
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
                }
                ]
            }
        });
    }

    render() {
        return (
            <div className="Bigchart">
                <Chart chartData={this.state.chartData} legendPosition="bottom" />
            </div>
        )
    }
}