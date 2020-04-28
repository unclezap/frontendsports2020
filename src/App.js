import React from 'react';
import logo from './logo.svg';
import './App.css';
import ScoreCard from './components/ScoreCard'
import { api } from './API';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './containers/NavBar'
import TitleBar from './components/TitleBar'
import NewPredictionsForm from './components/NewPredictionsForm'
import OldPredictions from './containers/OldPredictions'

class App extends React.Component {

  state = {scores: []}

  componentDidMount() {
    // console.log("Hello World!")
    // this.getArticles()
    // this.getNFLGames()
  }

  onUnMount = () => {
    localStorage.removeItem("token")
  }

  componentWillUnmount() {
    this.onUnMount()
  }

  getNFLGames() {
    fetch('https://grant_type=client_credentials&client_id=mobile&client_secret=42', {
      method: "POST",
      mode: 'no-cors'
    }).then(res => res.json())
    .then(data => console.log(data))
  }

  // fetch(`${API_ROOT}/users`, {
  //   method: "POST",
  //   headers: headers(),
  //   body: JSON.stringify({user: data})
  // }).then(res => res.json());

  // GET /games?s={"$query":{"week.season":2014,"week.seasonType":"REG","week.week":1}}

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
      <Router>
        <div>
          <NavBar />
          <Route
            exact path="/"
            render={() => <TitleBar />}
          />
          <Route
            exact path="/account"
            render={() => <MyAccount />}
          />
          <Route 
            exact path="/new"
            render={() => <NewPredictionsForm />}
          />
          <Route
            exact path="/old"
            render={() => <OldPredictions />}
          />
        </div>
      </Router>
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