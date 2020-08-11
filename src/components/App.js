import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import SignIn from './SignIn'
import Home from './Home'
import Nav from './Nav'
import Poll from './Poll'
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import Error from './Error';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { loading, authedUser } = this.props
    const PrivateRoute = ({ component: Component, ...rest }) => {
      return (
        <Route
          {...rest}
          render={(props) =>
            this.props.authedUser ?
              (
                <Component {...props} />
              )
              //: rest.path === '/questions/:id' ? ( <Poll />) : ( <Redirect to={{ pathname: "/", state: { from: props.location }}}/> )
              : (<Redirect to={{ pathname: "/", state: { from: props.location } }} />)
          }
        />
      );
    };
    return (
      <Router>
        <Fragment>
          {authedUser && <Nav />}
          <LoadingBar />
          {
            loading === true
              ? null
              :
              (<div>
                <Switch>
                  <Route path='/' exact component={SignIn} />
                  <PrivateRoute path='/home' exact component={Home} />
                  <PrivateRoute path='/questions/:id' component={Poll} />
                  <PrivateRoute path='/new-question' exact component={NewQuestion} />
                  <PrivateRoute path='/leader-board' exact component={LeaderBoard} />
                  <Route component={Error} />
                </Switch>
              </div>
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
