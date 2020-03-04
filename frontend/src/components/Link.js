import React, { Component } from "react";
import PlaidLink from "react-plaid-link";
import axios from "axios";

class Link extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: [],
            temp: ''
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleOnSuccess = this.handleOnSuccess.bind(this);
    }

    handleOnSuccess(public_token, metadata) {
        // send token to client server
        console.log(this.props.user);
        fetch("http://localhost:9000/plaid/get_access_token", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                public_token: public_token
            })
        })
            .then(response => response.json())
            .then(res => {
                fetch("http://localhost:9000/users/update/access", {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: this.props.user,
                        accessToken: res.access_token
                    })
                })
                    .then(response => response.json())
                    .then(res => {
                        console.log(res.aT)
                        this.handleClick(res.aT);
                    })

            });
    }

    handleOnExit() {
        // handle the case when your user exits Link
        // For the sake of this tutorial, we're not going to be doing anything here.
    }

    handleClick(res) {
        fetch("http://localhost:9000/plaid/", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                accessToken: res
            })
        })
            .then(response => response.json())
            .then(res => {
                fetch("http://localhost:9000/users/update/transactions", {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: this.props.user,
                        transactions: res.transactions
                    })
                })
            });
    }

    render() {
        return (
            <div>
                <PlaidLink
                    clientName="React Plaid Setup"
                    env="development"
                    product={["auth", "transactions"]}
                    publicKey="d393e49d5cd80df0a7d0ac6562875a"
                    onExit={this.handleOnExit}
                    onSuccess={this.handleOnSuccess}
                    className="test"
                >
                    Open Link and connect your bank!
        </PlaidLink>
                <button onClick={this.handleClick("access-development-1b414165-123e-4b6e-a553-81e972105512")}></button>
            </div>
        );
    }
}

export default Link;