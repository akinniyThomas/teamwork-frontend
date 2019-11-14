import React from 'react';
import Line from './oneline';

class SignIn extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    getUser = async () => {
        try {
            const data = {email: 'superuser.com', password: 'password123%'};
            const response = await fetch('http://localhost:8000/api/v1/auth/signin', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const jsonResponse = await response.json();
            console.log(JSON.stringify(jsonResponse));
            if (jsonResponse.status === 'success') {
                const user = jsonResponse.data;
                this.props.user(user);
                this.props.change(3);
            }
        } catch (error) {
            console.error('Error', error);
        }
    }

    dosomething = (e) => {
        e.preventDefault();
        this.getUser();
    }

    render() {
        return(
            <div className="signin">
                <h1 onClick={(e) => this.props.change(2)}>SignIn</h1>
                <form onSubmit = {this.dosomething}>
                    <Line textlabel = 'Email' type = 'email'/>
                    <Line textlabel = 'Password' type = 'password'/>
                    <button>Log In</button>
                </form>
            </div>
        );
    }
}

export default SignIn;