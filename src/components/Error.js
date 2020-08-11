import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "semantic-ui-react";

class Error extends React.Component {
    render() {
        return (
            <div className='grid-col'  style={{padding:"5%"}}>
                <h1>404 - Page not found. Sorry, the page you are looking for doesn't exist.</h1>
                <Button basic color="blue" border style={{ width: "20%", marginTop: "3%" }}>
                    <Link to={{
                        pathname: "/home",
                    }}> Go Back To Home Page </Link>
                </Button>
            </div>
        );
    };
}


export default Error;