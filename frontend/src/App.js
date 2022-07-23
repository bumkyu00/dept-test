import React, {Component} from 'react';
// import axios from 'axios';
import './App.css';
import ProgressBar from './ProgressBar';

class App extends Component {
  questions = [
    '1. 직업이 있다.',
    '2. 가족이 있다.'
  ];
  answers = [
    ['예', '아니오', '알바'],
    ['예', '아니오']
  ];
  numQuestions = 1;
  state = {
    question: 0,
    selected: new Array(this.numQuestions + 1).fill(0)
  }
  // getText() {
  //   axios.get('/main')
  //     .then(response => this.setState({text: response.data}))
  //     .catch(err => console.log(err));
  // }
  handleRadio(index) {
    var newSelected = {...this.state.selected};
    newSelected[this.state.question] = index;
    this.setState({selected: newSelected});
  }
  generateAnswerList() {
    return this.answers[this.state.question].map((answer, index) => 
      <div>
        <input 
          type='radio' 
          value={index} 
          checked={this.state.selected[this.state.question] === index}
          onClick={() => this.handleRadio(index)}
        />
        <label>{answer}</label>
        </div>
      )
  }
  previousQuestion() {
    if(this.state.question > 0) {
      this.setState({question: this.state.question - 1})
    }
  }
  nextQuestion() {
    if(this.state.question < this.numQuestions) {
      this.setState({question: this.state.question + 1})
    }
  }
  render() {
    return (
      <div className='body'>
        <div>
          <ProgressBar bgcolor='#76BA99' completed={((this.state.question) / (this.numQuestions + 1) * 100)}></ProgressBar>
        </div>
        <div className='question'>{this.questions[this.state.question]}</div>
        <div className='answerList'>{this.generateAnswerList()}</div>
        <div>
          <button className='button' onClick={() => this.previousQuestion()}>뒤로</button>
          <button className='button' onClick={() => this.nextQuestion()}>다음</button>
        </div>
      </div>
    );
  }
}

export default App;
