import React from 'react';
import {Redirect, Switch} from 'react-router';
import DetailsTable from '../Components/DetailsTable';

export default class DetailsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            Details: [],
            ready: "notYet"
        }
        this.goToDetails = this.goToDetails.bind(this);
    }

    render() {
        return (
            <div style = {this.props.style}>
                {(this.state.ready === "true") && <DetailsTable Details = {this.state.Details} style = {this.props.style} />}
                {(this.state.ready === "false") && <h1>No Details Listed</h1>}
                {(this.state.ready === "notYet") && <h1>Loading</h1>}
                {(this.props.history[2][this.props.history.length - 1] === "/UserView/Evaluations") &&
                    <button onClick = {this.goToDetails} class = 'addDetail'>
                        Add Detail
                    </button>
                }
                <Switch>
                    {this.state.redirect}
                </Switch>
            </div>
        );
    }

    goToDetails() {
        this.props.history[0]("/UserView/Details");
        this.setState({
            redirect: <Redirect exact to = {`/UserView/Details/CreateDetails`} />
        });
    }

    async componentDidMount() {
        if((this.props.loggedIn + "") === "false") {
            this.props.history[0]("/");
            this.props.history[0]("/UserView");
            this.props.history[0]("/UserView/Evaluations");
            this.setState({
                redirect: <Redirect to = "/" />
            });
        }
        this.props.history[3]("/UserView/Details");
        let tempDetails = [];
        const response = await fetch(`/API/getDetails/${this.props.EvaluationID}`);
        if(response) {
            const body = await response.json();
            if(body.Details) {
                tempDetails = body.Details;
            }
        }
        this.setState({
            Details: (tempDetails[0] ? tempDetails : []),
            ready: (tempDetails[0] ? "true" : "false")
        });
    }

}