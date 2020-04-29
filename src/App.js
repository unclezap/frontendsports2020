import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import NavBar from './containers/NavBar'
import TitleBar from './components/TitleBar'
import NewPredictionsForm from './components/NewPredictionsForm'
import BrowsePredictions from './containers/BrowsePredictions'
import MyAccount from './components/MyAccount'
import SignUp from './components/SignUp'

class App extends React.Component {

  componentDidMount() {
    window.addEventListener('beforeunload', this.onUnmount, false)
  }
  
  
  onUnmount = () => {
    localStorage.removeItem("token")
  }
  
  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnmount, false);
    this.onUnmount();
  }

  render() {
    return (
        <Router>
          <div style={{backgroundImage: this.props.style.backgroundImage1}}>
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
              exact path="/signup"
              render={() => <SignUp />}
            />
            <Route 
              exact path="/new"
              render={() => <NewPredictionsForm />}
            />
            <Route
              exact path="/old"
              render={() => <BrowsePredictions />}
            />
          </div>
          <div style={{backgroundImage: this.props.style.backgroundImage2, height: "270px"}}></div>
          <div style={{backgroundImage: this.props.style.backgroundImage3, height: "300px"}}></div>
        </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(App);
// export default App;


// componentDidMount() {
//   // console.log("Hello World!")
//   // this.getArticles()
//   // this.getNFLGames()
// }

  // getNFLGames() {
  //   fetch('https://grant_type=client_credentials&client_id=mobile&client_secret=42', {
  //     method: "POST",
  //     mode: 'no-cors'
  //   }).then(res => res.json())
  //   .then(data => console.log(data))
  // }

  // fetch(`${API_ROOT}/users`, {
  //   method: "POST",
  //   headers: headers(),
  //   body: JSON.stringify({user: data})
  // }).then(res => res.json());

  // GET /games?s={"$query":{"week.season":2014,"week.seasonType":"REG","week.week":1}}

  // getArticles() {
  //   api.articles.getArticle(3).then(data => this.setState({scores: data}))
  //     // console.log(data.map(data => data.article_text)[1])
      // this.setState({article: data.map(data => data.article_text)[1]})
      // this.setState({
        // allQuizzes: data
      // }
      // );
  // }

  // spitOutArticle = () => {
  //   return <td dangerouslySetInnerHTML={{__html: this.state.article}} />
  // }

  // showScores = () => {
  //   return this.state.scores.map(score => <li>{score}</li>)

//   function allQuizzes() {
//     return props.allQuizzes.map((thisQuiz) => {
//         return (<Col><QuizCard key={thisQuiz.id} quiz={thisQuiz} previousPage={"quizzes"}/></Col>)
//     })
// }



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