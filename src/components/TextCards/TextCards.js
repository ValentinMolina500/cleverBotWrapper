import React, { Component } from 'react';

export default class TextCards extends Component {
    render() {
    const formatted = this.props.text.charAt(0).toUpperCase() + this.props.text.slice(1);

        return (
            <div className={this.props.type === 'input' ? 'input-card' : 'response-card'}>
                <div className="text">
                    <h1 className="header">{this.props.type === 'input' ? 'You said: ' : 'AI said: '}</h1>
                    <h2>{formatted}</h2>
                </div>
            </div>
        )
    }
}