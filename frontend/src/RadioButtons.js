import React from 'react';

class RadioButtons extends React.Component {
    render() {
        return (
            <div>
                <label>
                    <input type = 'radio' checked = {this.props.selectedState === this.props.valueOne} value = {this.props.valueOne} onChange = {this.props.setCheckedState} name = {this.props.name}/>
                    {this.props.radioOne}
                </label>
                <label>
                    <input type = 'radio' checked = {this.props.selectedState === this.props.valueTwo} value = {this.props.valueTwo} onChange = {this.props.setCheckedState} name = {this.props.name}/>
                    {this.props.radioTwo}
                </label>
        </div>
        );
    }
}

export default RadioButtons;