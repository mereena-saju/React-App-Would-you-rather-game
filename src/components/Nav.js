import React, { Component } from 'react'
import { Menu, Image, Dropdown } from 'semantic-ui-react'
import { NavLink, withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {
    handleSignout = e => {
        this.props.dispatch(setAuthedUser(null))
        this.props.history.push("/sign-in");
    }
    render() {
        const { authedUser, user } = this.props;

        return (
            <Menu tabular color='green'>
                <Menu.Item
                    as={NavLink}
                    name='home'
                    exact to="/"
                />
                <Menu.Item
                    as={NavLink}
                    name='newQuestion'
                    to="/new-question"
                />
                <Menu.Item
                    as={NavLink}
                    name='leaderBoard'
                    to="/leader-board"
                />
                {authedUser !== null &&
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='signout'
                        >
                            <div>
                                <Image src={user.avatarURL} avatar />
                                <span>Hello, {user.name} &nbsp;&nbsp;</span>
                                <Dropdown>
                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            name="Signout"
                                            text="Sign Out"
                                            onClick={this.handleSignout}
                                        />
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Menu.Item>
                    </Menu.Menu>
                }
            </Menu>
        )
    }
}
function mapStateToProps({ authedUser, users }) {
    return {
        authedUser,
        user: users[authedUser]
    };
}

export default withRouter(connect(mapStateToProps)(Nav));