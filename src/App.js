import React from 'react';
import logo from './logo.svg';
import './App.css';
import ScoreCard from './components/ScoreCard'
import { api } from './API';

class App extends React.Component {

  state = {scores: []}

  componentDidMount() {
    console.log("Hello World!")
    this.getArticles()
  }

  getArticles() {
    api.articles.getArticle(3).then(data => this.setState({scores: data}))
      // console.log(data.map(data => data.article_text)[1])
      // this.setState({article: data.map(data => data.article_text)[1]})
      // this.setState({
        // allQuizzes: data
      // }
      // );
  }

  // spitOutArticle = () => {
  //   return <td dangerouslySetInnerHTML={{__html: this.state.article}} />
  // }

  showScores = () => {
    return this.state.scores.map(score => <li>{score}</li>)

//   function allQuizzes() {
//     return props.allQuizzes.map((thisQuiz) => {
//         return (<Col><QuizCard key={thisQuiz.id} quiz={thisQuiz} previousPage={"quizzes"}/></Col>)
//     })
}

  render() {
    return (
      <div>
        <ul>
        {this.showScores()}
        </ul>
      </div>
    );
  }
  
}

export default App;

{/* <div className="App">
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header>
</div> */}