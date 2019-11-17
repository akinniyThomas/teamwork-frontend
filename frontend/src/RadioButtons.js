import React from 'react';

class RadioButtons extends React.Component {
    render() {
        return (
            <div>
                <label>
                    <input type = 'radio' checked = {this.props.selectedState === 'articleState'} value = 'articleState' onChange = {this.props.setCheckedState} name = 'gif_art'/>
                    Article
                </label>
                <label>
                    <input type = 'radio' checked = {this.props.selectedState === 'gifState'} value = 'gifState' onChange = {this.props.setCheckedState} name = 'gif_art'/>
                    Gif
                </label>
        </div>
        );
    }
}

export default RadioButtons;