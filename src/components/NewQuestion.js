import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Card, Input, Divider, Button } from "semantic-ui-react";
import { handleAddQuestion } from '../actions/questions';

class NewQuestion extends Component {
    state = {
        optionOneText: "",
        optionTwoText: ""
    }
    handleInputOneChange = (e, data) => {
        e.preventDefault();
        this.setState({
            optionOneText: data.value
        });
    };

    handleInputTwoChange = (e, data) => {
        e.preventDefault();
        this.setState({
            optionTwoText: data.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        const { dispatch, authedUser, history } = this.props;
        const { optionOneText, optionTwoText } = this.state;

        if (optionOneText && optionTwoText) {
            dispatch(handleAddQuestion({ optionOneText, optionTwoText, authedUser }));
        }
        history.push("/");
    };
    render() {
        if (this.state.toHome === true) {
            return <Redirect to='/home' />
        }
        return (
            <div className='home-container'>
                <Card fluid>
                    <Card.Content>
                        <Card.Header style={{ textAlign: 'center', fontSize: '2em' }}>Create New Question</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <p className='card-header'>Complete the question:</p>
                        <Card.Header className='card-header' style={{ fontSize: '1.5em' }} >Would you rather...</Card.Header>
                        <Input
                            fluid
                            placeholder="Enter Option One Text"
                            onChange={this.handleInputOneChange}
                        />
                        <Divider horizontal>OR</Divider>
                        <Input
                            fluid
                            placeholder="Enter Option Two Text"
                            onChange={this.handleInputTwoChange}
                        />
                        <Button
                            fluid
                            color="green"
                            style={{ width: "95%", marginTop: "5%", marginBottom: "5%", marginLeft: "2%" }}
                            onClick={this.handleSubmit}
                        > Submit </Button>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}
function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}
export default connect(mapStateToProps)(NewQuestion);