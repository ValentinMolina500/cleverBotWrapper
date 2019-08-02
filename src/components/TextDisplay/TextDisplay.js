import React, { Component } from 'react';
import TextCards from "../TextCards/TextCards";

export default class TextDisplay extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
  }
  render() {
    return ( 
      <div id="text-container">
        <div >
          {this.props.dialog.map((val, index) => {
            return <TextCards key={index}  id={index} {...val}/>
          })} 
        </div> 
      </div>
    )
  }
}