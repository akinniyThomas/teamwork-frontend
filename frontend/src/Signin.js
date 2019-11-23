import React from 'react';
import Line from './oneline';
import styles from './styles/Signin.module.css';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    makeRequests = async (verb, api, data, token, isSignin) => {
        if (verb === 'POST' && isSignin) {
        const response = await fetch(api, {
                method: verb,
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return await response.json();
        } else if (verb === 'GET') {
            const response = await fetch(api, {
                method: verb,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return await response.json();
        }
    }

    setData = (name, value) => {
        this.setState({[name]: value});
        // console.log(`${[name]} and ${value}`);
    }

    getUser = async () => {
        try {
            const data = {
                email: this.state.email,
                password: this.state.password
            };
            const postAPI = 'http://localhost:8000/api/v1/auth/signin';
            const jsonResponse = await this.makeRequests('POST', postAPI, data, '', true);
            if (jsonResponse.status === 'success') {
                const {userId, token, administrator} = jsonResponse.data;
                // const userID = userId; 
                const getAPI = `http://localhost:8000/api/v1/auth/users/${userId}`;
                
                const userGetResponse = await this.makeRequests('GET', getAPI, '', token, false);
                let user;
                console.log(userGetResponse.data);
                if (userGetResponse.status === 'success') {
                    user = {
                        userId,
                        token,
                        administrator,
                        firstname: userGetResponse.data[0].firstname,
                        lastname: userGetResponse.data[0].lastname,
                        staffnumber: userGetResponse.data[0].staffnumber
                    }
                } else {
                    user = {
                        userId,
                        token,
                        administrator,
                        firstname: '',
                        lastname: '',
                        staffnumber: ''
                    }
                    alert('problem retrieving user details');
                }
                
                this.props.user(user);
                this.props.change(3);
            } else if (jsonResponse.status === 'error') {
                if (jsonResponse.error.message === 'incorrect password')
                    alert('Incorrect Password!');
                else if (jsonResponse.error.message === 'user doesnt exist')
                    alert('User does not exist');
                else alert('Server Error!');
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
            <div className = {styles.container}>
                <h1 className = {styles.header}>Sign In</h1>
                <form onSubmit = {this.dosomething}>
                    <Line 
                        textlabel = 'Email' 
                        type = 'email' 
                        value = {this.state.email}
                        name = 'email'
                        data = {this.setData}
                        signIn = {true}/>
                    <Line 
                        textlabel = 'Password' 
                        type = 'password' 
                        value= {this.state.password}
                        name = 'password'
                        data = {this.setData}
                        signIn = {true}/>
                    <button>Log In</button>
                </form>
            </div>
        );
    }
}

export default SignIn;