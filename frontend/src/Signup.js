import React from 'react';

class SignUp extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return(
            <div className="signup">
                <h1 onClick={(e) => this.props.change(3)}>SignUP</h1>
            </div>
        );
    }
}

export default SignUp;