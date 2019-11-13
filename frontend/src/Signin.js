import React from 'react';

class SignIn extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return(
            <div className="signin">
                <h1 onClick={(e) => this.props.change(2)}>SignIn</h1>
            </div>
        );
    }
}

export default SignIn;