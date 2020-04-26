import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

//   var url = 'http://newsapi.org/v2/top-headlines?' +
//           'sources=bbc-news&' +
//           'apiKey=c53d6160b14b48d68a124fce366c9f02';
// var req = new Request(url);
// fetch(req)
//     .then(function(response) {
//         console.log(response.json());
//     })

// var url = 'http://newsapi.org/v2/everything?' +
//           'q=Apple&' +
//           'from=2020-04-22&' +
//           'sortBy=popularity&' +
//           'apiKey=c53d6160b14b48d68a124fce366c9f02';

//   componentDidMount(){
//     var url = 'http://newsapi.org/v2/everything?' + 'q=NFL+Predictions+predictions&' + 'to=2019-11-30&' +
//     'apiKey=c53d6160b14b48d68a124fce366c9f02';
// var req = new Request(url);
// fetch(req)
// .then(response => response.json())
// .then(data => {
//   // data.articles.forEach(thing => console.log(thing.content))
// // }
// console.log(data)}
//   );
// }

//   componentDidMount() {
//     var url = 'http://newsapi.org/v2/sources?' + 'sources=espn&' + 'apiKey=c53d6160b14b48d68a124fce366c9f02';
//     var req = new Request(url);
//     fetch(req)
// .then(response => response.json())
// .then(data => {
//   data.articles.forEach(thing => console.log(thing.content))
//   // console.log(data)
// })
     componentDidMount() {
//     var url = 'http://newsapi.org/v2/everything?' + 'sources=bleacher-report&' + 'from=2020-02-28&'+'to=2020-03-11' + 'q=predictions+nba&' + 'sortBy=relevancy&' + 'apiKey=c53d6160b14b48d68a124fce366c9f02';
//     var req = new Request(url);
//     fetch(req)
// .then(response => response.json())
// .then(data => {
//   // data.articles.forEach(thing => console.log(thing.content))
//   console.log(data.articles)
// })
   
// (async () => {
//   const response = await fetch('https://www.theringer.com/nfl/2019/11/27/20985140/week-13-preview-ravens-49ers', {mode: 'no-cors'});
//   const text = await response.text();
//   console.log(text.match(/(?<=\<title>).*(?=\<\/title>)/));
// })()

const myHeaders = () => {
  return {
      "Content-Type":"application/json",
      Accept: "application/json"
  }
}

const myRequest = new Request();
      fetch('https://www.theringer.com/nfl/2019/11/27/20985140/week-13-preview-ravens-49ers', {
  method: 'GET',
  headers: myHeaders,
  mode: 'no-cors',
  cache: 'default',
})
      .then(function(response) {
                console.log(response.json());
            })

     }    
    // fetch(req)
    // .then(response => response.json())
    // .then(data => {
    //   // data.sources.forEach(thing => thing.forEach(thingy => thingy.))
    //   console.log(data)
    // });

    // fetch('https://www.theringer.com/nfl/2019/11/27/20985140/week-13-preview-ravens-49erskey=AIzaSyCuhEL8xj6_FAb3BkPVY5lVqbMYPVIKt-c', {mode: 'no-cors'})
    // // fetch('https://cse.google.com/cse?cx=011600666742838939149:9zetpyhzs50', {mode: 'no-cors'})
    // .then(response => response.json())
    // .then(data => {console.log(data)})

  // }

// componentDidMount() {
//   fetch('https://rss.art19.com/episodes/d3057ab9-88ac-4c58-b7e7-aa60b14e4590')
//   .then(response => response.json())
//   .then(data => console.log(data))
// }


   
  render() {
    return (
      <div className="App">
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
      </div>
    );
  }
  
}

export default App;