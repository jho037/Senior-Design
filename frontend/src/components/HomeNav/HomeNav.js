import React from 'react'

class HomeNav extends React.Component {
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
                    this.props.updateTransactions(user.accessToken, user._id);
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
        return(
            <div>
                <nav className="navbar navbar-expand-lg bg-gray">
                    <a className="navbar-brand text-white" onClick={() => onRouteChange('home')} href="#">FinMan</a>
                    <img className="resize pointer" onClick={() => onRouteChange('home')} src="https://img.icons8.com/ios-filled/50/000000/airplane-tail-fin.png" />
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link text-white grow" onClick={() => onRouteChange('transactions')} href="#">Transactions</a>
                        </li> 
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-white grow" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Profile
                            </a>
                            <div className="dropdown-menu text-white" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" onClick={() => onRouteChange('Accsettings')} href="#">Account Settings</a>
                            <a className="dropdown-item" href="#">Sign Out</a>
                            </div>
                        </li>
                        </ul>
                    </div>
                </nav>
            </div>
            );
    }
}

export default HomeNav;