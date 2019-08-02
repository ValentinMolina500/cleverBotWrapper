import React, { Component } from 'react';

export default class BottomBar extends Component {
    render() {
        return (
            <div id="bottom-bar">
                <div className="button-container">
                    <button onClick={this.props.speak} className="speak-button">{this.props.isSpeaking ? 'Recording...' : 'Say Something'}</button>
                    <button onClick={this.props.cancel} className="speak-button">Cancel</button>
                </div>
            </div>
        
        )
    }
}