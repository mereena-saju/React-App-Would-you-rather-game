import React, { Component } from 'react'
import { connect } from 'react-redux'
import Questions from './Questions'
import { Tab } from 'semantic-ui-react'
import { Redirect } from "react-router-dom";

class Home extends Component {
    render() {
        const { unAnsSorted, ansSorted, authedUser } = this.props
        if (authedUser == null) {
            return <Redirect to='/sign-in' />;
        }
        const panes = [
            {
                menuItem: 'UnAnswered Questions',
                render: () => <Tab.Pane attached={false} >
                    {unAnsSorted.map(id => (
                        <Questions key={id} id={id} />
                    ))}
                </Tab.Pane>,
            },
            {
                menuItem: 'Answered Questions',
                render: () => <Tab.Pane attached={false}>
                    {ansSorted.map(id => (
                        <Questions key={id} id={id} />
                    ))}
                </Tab.Pane>,
            },
        ]

        return (
            <div className='home-container'>
                <Tab
                    menu={{ color: 'green', borderless: true, attached: false, tabular: false, widths: 2 }}
                    panes={panes}
                />
            </div>
        )
    }
}
function mapStateToProps({ authedUser, questions }) {
    //Filter keys
    const unAnsKeys = Object.keys(questions).filter(k => !questions[k].optionOne.votes.includes(authedUser) && !questions[k].optionTwo.votes.includes(authedUser))
    //Sort Questions
    const unAnsSorted = unAnsKeys.sort((a, b) => questions[b].timestamp - questions[a].timestamp)

    const ansKeys = Object.keys(questions).filter(k => questions[k].optionOne.votes.includes(authedUser) || questions[k].optionTwo.votes.includes(authedUser))
    const ansSorted = ansKeys.sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    return {
        unAnsSorted: unAnsSorted ? unAnsSorted : {},
        ansSorted: ansSorted ? ansSorted : {},
        authedUser
    }
}
export default connect(mapStateToProps)(Home);