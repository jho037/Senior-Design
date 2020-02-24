import React, { Component } from "react";
import PlaidLink from "react-plaid-link";
import axios from "axios";

class Link extends Component {
    constructor() {
        super();

        this.state = {
            transactions: []
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleOnSuccess(public_token, metadata) {
        // send token to client server
        // axios.post("/auth/public_token", {
        //     public_token: public_token
        // });
        fetch('/auth/public_token', {
            method: 'POST', // or 'PUT'
            body: public_token,
        })
        console.log("success")
    }

    handleOnExit() {
        // handle the case when your user exits Link
        // For the sake of this tutorial, we're not going to be doing anything here.
        console.log("exit");
    }

    handleClick(res) {
        axios.get("/transactions").then(res => {
            this.setState({ transactions: res.data });
        });
    }

    render() {
        return (
            <div>
                <PlaidLink
                    clientName="React Plaid Setup"
                    env="sandbox"
                    product={["auth", "transactions"]}
                    publicKey="d393e49d5cd80df0a7d0ac6562875a"
                    onExit={this.handleOnExit}
                    onSuccess={this.handleOnSuccess}
                    className="test"
                >
                    Open Link and connect your bank!
        </PlaidLink>
                <div>
                    <button onClick={this.handleClick}>Get Transactions</button>
                </div>
            </div>
        );
    }
}

export default Link;