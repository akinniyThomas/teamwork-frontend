import React from 'react';
import Line from './oneline';

class SignIn extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    dosomething = () => {

    }

    render() {
        return(
            <div className="signin">
                <h1 onClick={(e) => this.props.change(2)}>SignIn</h1>
                <form onSubmit = {this.dosomething}>
                <Line textlabel = 'Email' type = 'email'/>
                <Line textlabel = 'Password' type = 'password'/>
                </form>
            </div>
        );
    }
}

export default SignIn;