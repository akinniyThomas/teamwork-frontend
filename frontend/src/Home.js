import React from 'react';

class Home extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return(
            <div className="home">
                <h1 onClick={(e) => this.props.change(1)}>Home</h1>
                <div>{this.props.user.userId}</div>
                <p>My Name is {this.props.user.userFirstName}  {this.props.user.userLastName} with Number {this.props.user.userStaffNumber}</p>
            </div>
        );
    }
}

export default Home;