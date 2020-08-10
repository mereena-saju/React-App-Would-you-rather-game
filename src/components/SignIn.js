import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
import { Card, Dropdown, Button } from "semantic-ui-react";



class SignIn extends Component {
    state = {
        id: null,
        toHome: false,
    }
    handleChange = (e, data) => {
        const id = data.value
        this.setState(() => ({
            id
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { id } = this.state
        this.props.dispatch(setAuthedUser(id))
        this.setState(() => ({
            toHome: id === null ? false : true,
        }))
    }
    formatUsersArray = (usersArray) => {
        const newArray = [];
        for (const userObj of usersArray) {
            newArray.push({
                key: userObj.id,
                id: userObj.id,
                text: userObj.name,
                value: userObj.id,
                image: {
                    avatar: true,
                    src: userObj.avatarURL,
                },
            });
        }

        return newArray;
    };
    render() {
        const { users } = this.props;
        const { toHome } = this.state;
        const formattedUsers = this.formatUsersArray(users)
        if (toHome === true) {
            return <Redirect to='/' />
        }
        return (
            <div className='signin-container'>
                <Card fluid raised color='green'>
                    <Card.Content>
                        <h1> Welcome to Would you Rather App! </h1>
                        <Card.Header>Please sign in to continue</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <h3>SIGN IN</h3>
                        <Dropdown
                            placeholder='Select an User'
                            fluid
                            selection
                            options={formattedUsers}
                            onChange={this.handleChange}
                            style={{ width: "95%", marginLeft: 10, marginTop: 10 }}
                        />
                        <Button
                            fluid
                            color="green"
                            style={{ width: "95%", marginTop: "5%", marginBottom: "5%", marginLeft: "3%" }}
                            onClick={this.handleSubmit}
                        > Submit </Button>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}
function mapStateToProps({ users }) {
    const allUsers = Object.values(users);
    return {
        users: allUsers,

    };
}
export default connect(mapStateToProps)(SignIn);