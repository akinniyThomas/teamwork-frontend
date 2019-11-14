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
            </div>
        );
    }
}

export default Home;