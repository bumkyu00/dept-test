import React, {Component} from 'react';
// import axios from 'axios';
import './App.css';
import ProgressBar from './ProgressBar';

class App extends Component {
  questions = [
    '1. 채무자가 돈을 빌려간 사실을 인정하고 있나요?',
    '2. 돈을 받기로 한 날짜가 지났나요?',
    '3. 채무자 주민등록번호를 아나요?',
    '4. 채무자 주소를 아나요?',
    '5. 채무자 휴대폰 번호를 아나요?',
    '6. 차용증/각서/이체확인증/문자메시지/카톡메시지 등 돈을 빌려준 증빙자료를 가지고 있나요?',
    '7. 채무자 직장(명칭, 소재지)을 알고 있나요?',
    '8. 채무자가 40세 이하인가요?',
    '9. 돈의 일부를 갚았나요?',
    '10. 못 받은 돈이 얼마인가요?'
  ];
  answers = [
    ['예', '아니오'],
    ['예', '아니오'],
    ['예', '아니오'],
    ['예', '아니오'],
    ['예', '아니오'],
    ['예', '아니오'],
    ['예', '아니오'],
    ['예', '아니오', '잘 모르겠다'],
    ['예', '아니오'],
    ['1000만원 이하', '1000만원 ~ 3000만원', '3000만원 ~ 5000만원', '5000만원 ~ 1억원', '1억원 이상']
  ];
  calculations = [
    [0.3, 0.2],
    [0.8, 1.1],
    [1.5, 0.5],
    [1.1, 0.9],
    [1.2, 0.8],
    [1.3, 0.8],
    [1.4, 1],
    [0.3, 0.95, 0.95],
    [1.7, 0.8],
    [1, 1, 1, 1, 1]
  ]
  numQuestions = 20;
  state = {
    stage: 0,
    question: 0,
    selected: new Array(this.numQuestions + 1).fill(0),
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
          id={index}
          onClick={() => this.handleRadio(index)}
        />
        <label for={index}>{answer}</label>
        </div>
      )
  }
  finalProbability() {
    let prob = 100;
    for(var i = 0; i < this.numQuestions; i++) {
      prob *= this.calculations[i][this.state.selected[i]];
    }
    if(prob < 5) {
      prob = 5;
    }
    else if(prob > 60) {
      prob = 60;
    }
    prob = Math.round(prob);
    this.setState({probability: prob});
  }
  previousQuestion() {
    if(this.state.question > 0) {
      this.setState({question: this.state.question - 1});
    }
  }
  nextQuestion() {
    if(this.state.question < this.numQuestions - 1) {
      this.setState({question: this.state.question + 1})
    }
    else {
      this.finalProbability();
      this.setState({stage: 2});
    }
  }
  initialize() {
    this.setState({
      stage: 0,
      question: 0,
      selected: new Array(this.numQuestions + 1).fill(0),
    })
  }
  render() {
    return (
      <div className='frame'>
        <div className='body'>
          {
            this.state.stage === 0 ? 
            (
              <div>
                <h1 className='title'>못받은 돈 받을 확률</h1>
                <hr/>
                <h3>돈 받을 확률(추심확률)을 간단히 알아보세요!</h3>
                <h3>빌려준 돈, 못 받은 돈, 외상대금, 매출대금, 상사채권, 민사채권 등</h3>
                <h3>계산된 확률은 실무례를 토대로 개략적으로 산출된 것입니다.</h3>
                <hr/>
                <p>대여금 채권의 회수는 사례별로 매우 다양한 상황과 사유가 있어 확실한 예측이 불가능합니다. <br/>따라서 계산된 확률값에 대해서는 단순히 참고만 하시가 바랍니다.</p>
                <button className='button' onClick={() => {
                  this.setState({stage: 1});
                  this.numQuestions = this.questions.length;
                  }
                }>시작</button>
              </div>
            ) :
            (
              this.state.stage === 1 ? 
              (
                <div>
                  <div>
                    <ProgressBar bgcolor='#76BA99' completed={((this.state.question + 1) / (this.numQuestions) * 100)}></ProgressBar>
                  </div>
                  <div className='question'>{this.questions[this.state.question]}</div>
                  <div className='answerList'>{this.generateAnswerList()}</div>
                  <div>
                    {
                      this.state.question > 0 ? 
                        <button className='button' onClick={() => this.previousQuestion()}>뒤로</button> :
                        <button className='dummyButton'>뒤로</button>
                    }
                    <button className='button' onClick={() => this.nextQuestion()}>다음</button>
                  </div>
                </div>
              ) :
              <div>
                <h1>계산 결과</h1>
                <h3>당신이 돈을 돌려받은 확률은</h3>
                <h1 className='result'>{this.state.probability}%</h1>
                <h4>더 알아보려면 <a href='http://naver.com'>네이버</a>로</h4>
                <button className='button' onClick={() => this.initialize()}>처음으로</button>
              </div>
            )
          }
          {/* {<h2>{this.state.selected}</h2>} */}
        </div>
      </div>  
    );
  }
}

export default App;
