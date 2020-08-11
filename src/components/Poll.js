import React, { Component } from 'react'
import { Card, Button, Image, Segment, Grid, Form, Checkbox, Message, Progress, Label } from "semantic-ui-react";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { handleAddAnswer } from "../actions/questions";
import Error from './Error';

export class Poll extends Component {
    state = {
        value: '',
        toHome: false
    }
    handleChange = (e, { value }) => this.setState({ value })

    handleSubmit = e => {
        e.preventDefault();
        const { value } = this.state;
        const { dispatch, authedUser, qid } = this.props;
        if (value !== null) {
            dispatch(
                handleAddAnswer({
                    authedUser: authedUser,
                    qid: qid,
                    answer: value
                })
            );
        }
        this.setState({ toHome: value ? true : false })

    };
    yourVote = () => {
        return <Label as='a' color='yellow' floating circular>Your Vote</Label>
    }
    render() {
        const { isError, user, question, unAnswered, answer } = this.props
        if (isError) {
            return (
                <Error />
            );
        }
        let optOneVotes = question.optionOne.votes.length;
        let optTwoVotes = question.optionTwo.votes.length;
        let totalVotes = optOneVotes + optTwoVotes;

        if (this.state.toHome === true) {
            return <Redirect to='/home' />
        }
        return (
            unAnswered ?
                (<div className='home-container'>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>{user.name} Asks:</Card.Header>
                        </Card.Content>
                        <Segment>
                            <Grid columns={2} divided>
                                <Grid.Column width={6} className="grid-col">
                                    <Image
                                        src={user.avatarURL}
                                        size="small"
                                        circular
                                        verticalAlign="middle"
                                        centered
                                    />
                                </Grid.Column>

                                <Grid.Column width={10} className="grid-col">
                                    <Form style={{ padding: "8%" }}>
                                        <Form.Field>
                                            <Card.Header as="h3">Would you Rather...</Card.Header>
                                        </Form.Field>
                                        <Form.Field>
                                            <Checkbox
                                                radio
                                                label={question.optionOne.text}
                                                name='checkboxRadioGroup'
                                                value='optionOne'
                                                checked={this.state.value === 'optionOne'}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <Checkbox
                                                radio
                                                label={question.optionTwo.text}
                                                name='checkboxRadioGroup'
                                                value='optionTwo'
                                                checked={this.state.value === 'optionTwo'}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                    </Form>

                                    <Button color='green' size="large" className='poll-button' onClick={this.handleSubmit} >
                                        Submit
                                    </Button>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Card>
                </div >
                ) :
                (
                    <div className='home-container'>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>Asked by {user.name}: </Card.Header>
                            </Card.Content>
                            <Segment>
                                <Grid columns={2} divided>
                                    <Grid.Column width={6} className="grid-col">
                                        <Image
                                            src={user.avatarURL}
                                            size="small"
                                            circular
                                            verticalAlign="middle"
                                            centered
                                        />
                                    </Grid.Column>

                                    <Grid.Column width={10} className="grid-col">
                                        <Card.Header as="h2">Results: </Card.Header>
                                        <Message color={answer === "optionOne" ? 'green' : 'grey'} className='message-box'>
                                            {answer === 'optionOne' && this.yourVote()}
                                            <Message.Header>
                                                Would you rather {question.optionOne.text}?
                                            </Message.Header>
                                            <Progress
                                                value={optOneVotes}
                                                total={totalVotes}
                                                progress="percent"
                                                precision={1}
                                                color={answer === "optionOne" ? 'green' : 'grey'}
                                            />
                                            <Message.Header>
                                                {optOneVotes} out of {totalVotes} votes
                                            </Message.Header>
                                        </Message>

                                        <Message color={answer === "optionTwo" ? 'green' : 'grey'} className='message-box'>
                                            {answer === 'optionTwo' && this.yourVote()}
                                            <Message.Header>
                                                Would you rather {question.optionTwo.text}?
                                            </Message.Header>
                                            <Progress
                                                value={optTwoVotes}
                                                total={totalVotes}
                                                progress="percent"
                                                precision={1}
                                                color={answer === "optionTwo" ? 'green' : 'grey'}
                                            />
                                            <Message.Header>
                                                {optTwoVotes} out of {totalVotes} votes
                                            </Message.Header>
                                        </Message>

                                    </Grid.Column>
                                </Grid>
                            </Segment>
                        </Card>
                    </div>
                )
        )
    }
}
function mapStateToProps({ authedUser, users, questions }, { match }) {
   
    if (questions[match.params.id] === undefined) {
        const isError = true;
        return {
          isError
        };
    }
    const qid = match.params.id;
    const question = questions[qid];
    const isError = false;
    const user = users[question.author];

    let answer = "";
    let unAnswered = false;
    if (question.optionOne.votes.includes(authedUser)) {
        answer = "optionOne";
    } else if (question.optionTwo.votes.includes(authedUser)) {
        answer = "optionTwo";
    } else {
        answer = null;
        unAnswered = true;
    }

    return {
        authedUser,
        user,
        qid,
        question,
        unAnswered,
        answer,
        isError
    }
}
export default withRouter(connect(mapStateToProps)(Poll));