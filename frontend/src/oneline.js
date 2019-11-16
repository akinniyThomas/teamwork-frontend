import React from 'react';

class Line extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    changeMatters = e => {
        const name = e.target.name;
        const value = e.target[e.target.type === 'checkbox' ? 'checked' : 'value'];
        // console.log(`name: ${name} and value : ${value}`);
        this.props.data(name, value);
    }

    render() {
        return(
            <div className="line">
                <label>{this.props.textlabel}</label>
                <input 
                    type= {this.props.type} 
                    value = {this.props.value}
                    name = {this.props.name}
                    onChange = {this.changeMatters}/>
            </div>
        );
    }
}

export default Line;