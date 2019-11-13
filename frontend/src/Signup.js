import React from 'react';
import Line from './oneline';

class SignUp extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return(
            <div className="signup">
                <h1 onClick={(e) => this.props.change(3)}>SignUP</h1>
                <form>
                <Line textlabel = 'FirstName' type = 'text'/>
                <Line textlabel = 'LastName' type = 'text'/>
                <Line textlabel = 'Email' type = 'email'/>
                <Line textlabel = 'Staff Number' type = 'text'/>
                <Line textlabel = 'Job Role' type = 'text'/>
                <Line textlabel = 'Address' type = 'text'/>
                <Line textlabel = 'Password' type = 'password'/>
                <Line textlabel = 'Password Again' type = 'password'/>
                </form>
            </div>
        );
    }
}

export default SignUp;