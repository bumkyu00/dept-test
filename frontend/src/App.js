import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    text: "default"
  }
  componentDidMount() {
    this.getText();
  }
  getText() {
    axios.get('/main')
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
