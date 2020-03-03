import React from 'react'
import './Register.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            phone: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value })
    }
    onPhoneChange = (event) => {
        this.setState({ phone: event.target.value })
    }

    onSubmitRegister = () => {
        //by default, fetch does a get request
        fetch('http://localhost:9000/users/add', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                phonenumber: this.state.phone
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user._id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('link');
                }
            })
    }


    render() {
        const { onRouteChange } = this.props;
        return (
            <div>
                <div style={{ cursor: 'pointer' }} onClick={() => onRouteChange('landing')} className="top">FinMan
                <img src="https://img.icons8.com/ios-filled/50/000000/airplane-tail-fin.png" />
                </div>
                <article className="br6 ba b--black-60 mv4 w-80 w-50-m w-30-l mw6 shadow-5 center bg-white">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f2 fw1 ph0">Register</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                    <input
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-gray w-100"
                                        type="text"
                                        name="name"
                                        id="name"
                                        onChange={this.onNameChange}
                                    />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-gray w-100"
                                        type="email"
                                        name="email-address"
                                        id="email-address"
                                        onChange={this.onEmailChange}
                                    />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-gray w-100"
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={this.onPasswordChange}
                                    />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Phone Number (Optional)</label>
                                    <input
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-gray w-70"
                                        type="phone"
                                        name="phone-number"
                                        id="phone-number"
                                        onChange={this.onPhoneChange}
                                    />
                                </div>
                            </fieldset>
                            <div className="">
                                <input
                                    onClick={this.onSubmitRegister}
                                    className="b ph3 pv2 input-reset bg-black ba b--gray grow pointer f6 dib white"
                                    type="submit"
                                    value="Register" />
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        );
    }
}

export default Register;