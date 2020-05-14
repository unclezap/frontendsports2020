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
//useless comment
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