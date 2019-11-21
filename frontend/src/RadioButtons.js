import React from 'react';
import './styles/RadioButton.css';

class RadioButtons extends React.Component {
    render() {
        return (
            <div>
                <label className = {`${this.props.home === true ? 'labelHome' : 'labelUser'}`}>
                    <input className = {`${this.props.home === true ? 'radioHome' : 'radioUser'}`} type = 'radio' checked = {this.props.selectedState === this.props.valueOne} value = {this.props.valueOne} onChange = {this.props.setCheckedState} name = {this.props.name}/>
                    {this.props.radioOne}
                </label>
                <label className = {`${this.props.home === true ? 'labelHome' : 'labelUser'}`}>
                    <input className = {`${this.props.home === true ? 'radioHome' : 'radioUser'}`} type = 'radio' checked = {this.props.selectedState === this.props.valueTwo} value = {this.props.valueTwo} onChange = {this.props.setCheckedState} name = {this.props.name}/>
                    {this.props.radioTwo}
                </label>
        </div>
        );
    }
}

export default RadioButtons;