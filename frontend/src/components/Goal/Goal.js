import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';


class Goal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Goal: ''
        }
    }

    onGoalChange = (event) => {
        this.setState({ Goal: event.target.value })
    }

    // onPasswordChange = (event) => {
    //     this.setState({ password: event.target.value })
    // }

    // onNameChange = (event) => {
    //     this.setState({ name: event.target.value })
    // }
    // onPhoneChange = (event) => {
    //     this.setState({ phone: event.target.value })
    // }

    onSubmitGoal = () => {
        //by default, fetch does a get request
        // fetch('http://localhost:9000/users/add', {
        //     method: 'post',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         Goal: this.state.Goal
        //     })
        // })
        //     .then(response => response.json())
        //     .then(user => {
        //         if (user._id) {
        //             this.props.loadUser(user);
        //             this.props.onRouteChange('home');
        //         }
        //     })
        this.props.onRouteChange('home');
    }


    render() {
        // const { onRouteChange } = this.props;
        return (

            <Container fluid="true">
                <Row className="align-items-center">
                    <Col className="bg-white" lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} sm={{ span: 12, offset: 0 }}>
                        <h1 class="f2 lh-copy i">Tell us about your Goal!</h1>
                        <form>
                            <div class="form-group">
                                <label for="formGroupExampleInput">What is the Maximum you want to spend in one month?</label>
                                <input onChange={this.onGoalChange} type="text" class="form-control" id="formGroupExampleInput" placeholder="ex: 1000" />
                            </div>
                            <input
                                onClick={this.onSubmitGoal}
                                className="mb3 b ph4 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Submit" />
                        </form>
                    </Col>
                </Row>
            </Container>


        );
    }
}

export default Goal;