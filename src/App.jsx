import React, { Component } from 'react';
import { FormGroup, FormControl, Button, InputGroup, Glyphicon } from 'react-bootstrap'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-title">Sportify</div>
        <FormGroup>
          <FormControl
            type="text"
          />
        </FormGroup>
        <div className="Profile">
          <div>Artist Picture</div>
          <div>Artist Name</div>
        </div>
        <div className="Gallery">
          Gallery
        </div>
      </div>
    )
  }
}

export default App;
