import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import login from '../api/login';

export default () => {

    const [state, setState] = useState({
        username : '',
        password: ''
    });
    
    const handleChange = (e) => {
        const {id, value} = e.target;
        setState(prevState => ({
            ...prevState,
            [id] : value
        }));
        console.log('change', id, value);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        let r = login(state);
        console.log(r);
        setState(prevState => ({
            ...prevState,
            'successMessage': r
        }));
    }

    return (
        <Form>
            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control value={state.username} onChange={handleChange} type="username" placeholder="Enter username" />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control value={state.password} onChange={handleChange} type="password" placeholder="Password" />
            </Form.Group>
            
            <Button variant="primary" type="submit" onClick={handleLogin}>
                Login
            </Button>
            <Button style={{marginLeft: "5rem"}} variant="secondary" type="register">
                Register
            </Button>
        </Form>
    );
}