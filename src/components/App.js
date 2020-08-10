import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import SignIn from './SignIn'
import Home from './Home'
import Nav from './Nav'
import Poll from './Poll'
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { loading, authedUser } = this.props
    return (
      <Router>
        <Fragment>
          {authedUser && <Nav />}
          <LoadingBar />
          {
            loading === true
              ? null
              :
              (authedUser ?
                (
                  <div>
                    <Route path='/' exact component={Home} />
                    <Route path='/sign-in' component={SignIn} />
                    <Route path='/questions/:id' component={Poll} />
                    <Route path='/new-question' component={NewQuestion} />
                    <Route path='/leader-board' component={LeaderBoard} />
                  </div>
                )
                : (
                  <div>
                    <Route path='/' exact component={Home} />
                    <Route path='/sign-in' component={SignIn} />
                    <Redirect to='/sign-in' />
                  </div>
                )
              )
          }

        </Fragment>
      </Router>
    );
  }

}
function mapStateToProps({ users, authedUser }) {
  return {
    users: users,
    loading: users === {},
    authedUser
  }
}

export default connect(mapStateToProps)(App);
