import React from 'react';
import {SelectBox} from './SelectBox';

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: "John"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div style = {{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <div>
          <h1>
            Hello there, {this.state.name}!
          </h1>
          <SelectBox 
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }

  handleChange(newName) {
    this.setState({name: newName});
  }

}