import React from 'react';
import './styles/OneLine.css';
import styles from './styles/OneLine.module.css';

class Line extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // containerLine: styles.containerLine,
            // labelLine: styles.labelLine,
            // textBoxLine: styles.textBoxLine
        }
    }

    changeMatters = e => {
        const name = e.target.name;
        const value = e.target[e.target.type === 'checkbox' ? 'checked' : 'value'];
        // console.log(`name: ${name} and value : ${value}`);
        this.props.data(name, value);
    }

    render() {
        return(
            <div 
            // className = {`${this.props.signIn === true ? 'containerLine' : 'containerLineUser'}`}>
            className = {this.props.signIn === true ? styles.containerLine : styles.containerLineUser}>
                {/* <div className = {styles.leftSide}> */}
                    <label className = {this.props.signIn === true ? styles.labelLine : styles.labelLineUser}>{this.props.textlabel}</label>
                {/* </div> */}
                {/* <div className = {styles.rightSide}> */}
                    <input className = {this.props.signIn === true ? styles.textBoxLine : styles.textBoxLineUser}
                    type= {this.props.type} 
                    value = {this.props.value}
                    checked = {this.props.value}
                    name = {this.props.name}
                    onChange = {this.changeMatters}/>
                {/* </div> */}
            </div>
        );
    }
}

export default Line;