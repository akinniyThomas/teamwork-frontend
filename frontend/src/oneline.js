import React from 'react';

class Line extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return(
            <div className="line">
                <label>{this.props.textlabel}</label>
                <input type= {this.props.type} />
            </div>
        );
    }
}

export default Line;