import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    text: ""
  }
  componentDidMount() {
    this.getText();
  }
  getText() {
    axios.get('http://localhost:3000/main/')
      .then(response => this.setState({text: response.data}))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        <p>Hi</p>
        <div>{this.state.text}</div>
      </div>
    );
  }
}

export default App;
