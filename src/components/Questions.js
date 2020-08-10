import React, { Component } from 'react'
import { Card, Button, Image, Segment, Grid } from "semantic-ui-react";
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'


class Questions extends Component {
    handlePoll = e => {
        e.preventDefault();
        const { id, history } = this.props;

        history.push({
            pathname: `/questions/${id}`,
            state: { id: id }
        });
    };
    render() {
        const { users, questions, id } = this.props
        const user = users[questions[id].author]
        return (

            <div style={{ margin: "3%" }}>
                <Link to={`/questions/${id}`} >
                    <Card fluid color='grey'>
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
                                    <Card.Header as="h3">Would you Rather</Card.Header>
                                    <Card.Description style={{ padding: "8%" }}>
                                        .... {questions[id].optionOne.text} ....
                            </Card.Description>

                                    <Button basic color='green' size="large" className='poll-button' onClick={this.handlePoll}>
                                        View Poll
                            </Button>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Card>
                </Link>
            </div>

        )
    }
}
function mapStateToProps({ users, questions }, { id }) {
    return {
        users,
        questions
    }
}
export default withRouter(connect(mapStateToProps)(Questions));