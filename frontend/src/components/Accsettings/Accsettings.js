import React from 'react'
import { Button, Modal } from 'react-bootstrap';


class Accsettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currpass: '',
            newpass: '',
            curremail: '',
            newemail: ''
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
                if(user === 1){
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
                if(user === 1){
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
                                <input onChange={this.oncurrpassChange} type="text" class="form-control" id="formGroupExampleInput" placeholder=""/>
                            </div>
                            <div class="form-group">
                                <label for="formGroupExampleInput2">New Password</label>
                                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder=""/>
                            </div>
                            <div class="form-group">
                                <label for="formGroupExampleInput2">Confirm New Password</label>
                                <input onChange={this.onnewpassChange} type="text" class="form-control" id="formGroupExampleInput2" placeholder=""/>
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

                    {/* <!-- Trigger the modal with a button --> */}
                    <button type="button" class="btn btn-info btn-lg mt2 mb5" data-toggle="modal" data-target="#email">Change Email</button>

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
                                    <input onChange={this.oncurremailChange} type="text" class="form-control" id="formGroupExampleInput" placeholder=""/>
                                </div>
                                <div class="form-group">
                                    <label for="formGroupExampleInput2">New Email</label>
                                    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder=""/>
                                </div>
                                <div class="form-group">
                                    <label for="formGroupExampleInput2">Confirm New Email</label>
                                    <input onChange={this.onnewemailChange} type="text" class="form-control" id="formGroupExampleInput2" placeholder=""/>
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
                </div>
                
                
            </div>


        );
    }
}

export default Accsettings;

// const Accsettings = (props) => {
//     return (
//       <Modal
//         {...props}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="contained-modal-title-vcenter">
//             Modal heading
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <h4>Centered Modal</h4>
//           <p>
//             Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//             dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
//             consectetur ac, vestibulum at eros.
//           </p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={props.onHide}>Close</Button>
//         </Modal.Footer>
//       </Modal>
//     );
//   }

//   export default Accsettings;