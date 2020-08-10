import React, { Component } from 'react'
import { Card, Image, Label, Segment, Grid } from "semantic-ui-react";

class ScoreCard extends Component {
    render() {
        const { userDetails } = this.props
        return (
            <Segment>
                <Grid columns={3} divided>
                    <Grid.Column width={3} className="grid-col">
                        <Image
                            src={userDetails.avatarURL}
                            size="small"
                            circular
                            verticalAlign="middle"
                            centered
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <h2>{userDetails.name}</h2>
                        <div className='score-length'>
                            <span style={{ flex: "90%" }}>Answered Questions:</span> <span>{userDetails.noOfquestionsAnswered}</span>
                        </div>
                        <div className='score-length'>
                            <span style={{ flex: "90%" }}>Created Questions:</span> <span>{userDetails.noOfcreatedQuestions}</span>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={3} className="grid-col">
                        <Card fluid raised style={{ textAlign: 'center' }}>
                            <Card.Content>
                                <Card.Header> Score</Card.Header>
                            </Card.Content>
                            <Card.Content>
                                <Label as='a' color='green' circular size="huge">{userDetails.rank}</Label>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
            </Segment>
        )
    }
}

export default ScoreCard;