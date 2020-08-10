import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScoreCard from './ScoreCard';

class LeaderBoard extends Component {
    render() {
        const { leaderBoardList } = this.props
        return (
            <div className="home-container">
                {leaderBoardList.map(user => (
                    <ScoreCard key={user.name} userDetails={user} />
                ))}
            </div>
        )
    }
}
function mapStateToProps({ users }) {
    const leaderBoardList = Object.keys(users)
        .map(user => {
            const userDetails = {
                name: users[user].name,
                avatarURL: users[user].avatarURL,
                noOfquestionsAnswered: Object.keys(users[user].answers).length,
                noOfcreatedQuestions: users[user].questions.length
            };
            userDetails.rank = userDetails.noOfquestionsAnswered + userDetails.noOfcreatedQuestions;
            return userDetails;
        })
        .sort((a, b) => b.rank - a.rank);
    return {
        leaderBoardList
    };
}
export default connect(mapStateToProps)(LeaderBoard);