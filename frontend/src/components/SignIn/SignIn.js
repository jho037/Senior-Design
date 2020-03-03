import React from 'react'
import './SignIn.css';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            msg: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
    }

    onSubmitSignIn = () => {
        //by default, fetch does a get request
        fetch('http://localhost:9000/users/search', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user._id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
            .then(() => {
                if (this.state.msg != 0 || this.state.msg != 1) {
                    //this.props.onRouteChange('home')

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
                <article className="br6 ba b--black-60 mv4 w-80-ns w-100-m w-30-l mw6 shadow-5 center bg-white">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw4 ph2 mh2">Sign In</legend>
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
                            </fieldset>
                            <div className="">
                                <input
                                    onClick={this.onSubmitSignIn}
                                    className="b ph3 pv2 input-reset bg-black ba b--gray grow pointer f6 dib white"
                                    type="submit"
                                    value="Sign in" />
                            </div>
                            <div className="lh-copy mt3">
                                <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        );
    }
}

export default SignIn;