import React from 'react'
import { Button, Modal } from 'react-bootstrap';


class Accsettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currpass: '',
            newpass: '',
            curremail: '',
            newemail: '',
            newgoal: ''
        }
    }

    // const [show, setShow] = useState(false);

    // handleClose = () => {setShow(false)}
    // handleShow = () => {setShow(true)}


    oncurrpassChange = (event) => {
        this.setState({ currpass: event.target.value })
    }

    onnewpassChange = (event) => {
        this.setState({ newpass: event.target.value })
    }

    oncurremailChange = (event) => {
        this.setState({ curremail: event.target.value })
    }

    onnewemailChange = (event) => {
        this.setState({ newemail: event.target.value })
    }

    ongoalChange = (event) => {
        this.setState({ newgoal: event.target.value })
    }

    // onNameChange = (event) => {
    //     this.setState({ name: event.target.value })
    // }
    // onPhoneChange = (event) => {
    //     this.setState({ phone: event.target.value })
    // }

    onSubmitPass = () => {
        fetch('http://localhost:9000/users/update/password', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                currpass: this.state.currpass,
                newpass: this.state.newpass,
                id: this.props.user.id
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user === 1) {
                    alert("Passwords do not match");
                }
                if (user._id) {
                    console.log(user._id);
                    alert("Successfully Changed Password");
                    this.props.loadUser(user);
                    this.props.onRouteChange('Accsettings');
                }
            })
    }

    onSubmitEmail = () => {
        fetch('http://localhost:9000/users/update/email', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                curremail: this.state.curremail,
                newemail: this.state.newemail,
                id: this.props.user.id
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user === 1) {
                    alert("Emails do not match");
                }
                if (user._id) {
                    console.log(user._id);
                    alert("Successfully Changed Email");
                    this.props.loadUser(user);
                    this.props.onRouteChange('Accsettings');
                }
            })
    }

    onSubmitUnlink = () => {
        fetch('http://localhost:9000/plaid/unLink', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                accessToken: this.props.user.accessToken
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user === true) {
                    alert("Bank Unlinked");
                    fetch('http://localhost:9000/users/update/transactions', {
                        method: 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            transactions: [],
                            id: this.props.user.id
                        })
                    })
                }
                if (user === false) {
                    alert("Bank not Unlinked Error!");
                }
            })
    }

    onSubmitNgoal = () => {
        fetch('http://localhost:9000/users/update/goal', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                newgoal: this.state.newgoal,
                id: this.props.user.id
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user._id) {
                    console.log(user);
                    alert("Successfully Changed Goal");
                    this.props.loadUser(user);
                    this.props.onRouteChange('Accsettings');
                }
            })
    }


    render() {
        // const { onRouteChange } = this.props;
        return (

            <div>
                <h1 className="b tc">Account Settings</h1>

                <div className="w-30">
                    {/* <!-- Trigger the modal with a button --> */}
                    <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Change Password</button>

                    {/* <!-- Modal --> */}
                    <div id="myModal" class="modal fade" role="dialog">
                        <div class="modal-dialog">

                            {/* <!-- Modal content--> */}
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h2>Change Password</h2>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div class="form-group">
                                            <label for="formGroupExampleInput">Current Password</label>
                                            <input onChange={this.oncurrpassChange} type="text" class="form-control" id="formGroupExampleInput" placeholder="" />
                                        </div>
                                        <div class="form-group">
                                            <label for="formGroupExampleInput2">New Password</label>
                                            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="" />
                                        </div>
                                        <div class="form-group">
                                            <label for="formGroupExampleInput2">Confirm New Password</label>
                                            <input onChange={this.onnewpassChange} type="text" class="form-control" id="formGroupExampleInput2" placeholder="" />
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <input
                                        onClick={this.onSubmitPass}
                                        className="mb3 b ph4 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                        type="submit"
                                        value="Submit"
                                        data-dismiss="modal" />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="w-50">
                        {/* <!-- Trigger the modal with a button --> */}
                        <button type="button" class="btn btn-info btn-lg mt2 mb2" data-toggle="modal" data-target="#email">Change Email</button>

                        {/* <!-- Modal --> */}
                        <div id="email" class="modal fade" role="dialog">
                            <div class="modal-dialog">

                                {/* <!-- Modal content--> */}
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h2>Change Email</h2>
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    </div>
                                    <div class="modal-body">
                                        <form>
                                            <div class="form-group">
                                                <label for="formGroupExampleInput">Current Email</label>
                                                <input onChange={this.oncurremailChange} type="text" class="form-control" id="formGroupExampleInput" placeholder="" />
                                            </div>
                                            <div class="form-group">
                                                <label for="formGroupExampleInput2">New Email</label>
                                                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="" />
                                            </div>
                                            <div class="form-group">
                                                <label for="formGroupExampleInput2">Confirm New Email</label>
                                                <input onChange={this.onnewemailChange} type="text" class="form-control" id="formGroupExampleInput2" placeholder="" />
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <input
                                            onClick={this.onSubmitEmail}
                                            className="mb3 b ph4 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                            type="submit"
                                            value="Submit"
                                            data-dismiss="modal" />
                                    </div>
                                </div>

                            </div>
                        </div>

                        <button type="button" class="btn btn-info btn-lg mb2" data-toggle="modal" data-target="#unlink">Unlink Bank</button>

                        {/* <!-- Modal --> */}
                        <div id="unlink" class="modal fade" role="dialog">
                            <div class="modal-dialog">

                                {/* <!-- Modal content--> */}
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h2>Unlink Bank</h2>
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    </div>
                                    <div class="modal-footer">
                                        <input
                                            onClick={this.onSubmitUnlink}
                                            className="mb3 b ph4 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                            type="submit"
                                            value="Submit"
                                            data-dismiss="modal" />
                                    </div>
                                </div>

                            </div>
                        </div>

                        <button type="button" class="btn btn-info btn-lg mb5" data-toggle="modal" data-target="#goal">Update Goal</button>

                        {/* <!-- Modal --> */}
                        <div id="goal" class="modal fade" role="dialog">
                            <div class="modal-dialog">

                                {/* <!-- Modal content--> */}
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h2>Update Goal</h2>
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    </div>
                                    <div class="modal-body">
                                        <form>
                                            <div class="form-group">
                                                <label for="formGroupExampleInput2">New Goal</label>
                                                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="ex:1000" />
                                            </div>
                                            <div class="form-group">
                                                <label for="formGroupExampleInput2">Confirm New Goal</label>
                                                <input onChange={this.ongoalChange} type="text" class="form-control" id="formGroupExampleInput2" placeholder="ex:1000" />
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <input
                                            onClick={this.onSubmitNgoal}
                                            className="mb3 b ph4 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                            type="submit"
                                            value="Submit"
                                            data-dismiss="modal" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>


        );
    }
}

export default Accsettings;