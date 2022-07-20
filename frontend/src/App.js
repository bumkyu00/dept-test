import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {
  questions = [
    '1. 직업이 있다.',
    '2. 가족이 있다.'
  ];
  answers = [
    ['예', '아니오', '알바'],
    ['예', '아니오']
  ];
  maxQuestion = 1;
  state = {
    question: 0
  }
  // getText() {
  //   axios.get('/main')
  //     .then(response => this.setState({text: response.data}))
  //     .catch(err => console.log(err));
  // }
  generateAnswerList() {
    return this.answers[this.state.question].map((answer) => <button onClick={() => console.log(answer)}>{answer}</button>)
  }
  previousQuestion() {
    if(this.state.question > 0) {
      this.setState({question: this.state.question - 1})
    }
  }
  nextQuestion() {
    if(this.state.question < this.maxQuestion) {
      this.setState({question: this.state.question + 1})
    }
  }
  render() {
    return (
      <div>
        <p>Question</p>
        <div>{this.questions[this.state.question]}</div>
        <div>{this.generateAnswerList()}</div>
        <div>
          <button onClick={() => this.previousQuestion()}>뒤로</button>
          <button onClick={() => this.nextQuestion()}>다음</button>
        </div>
      </div>
    );
  }
}

export default App;
