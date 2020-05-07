import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { postArticle } from '../redux';
import AnalysisCard from '../components/AnalysisCard';
import AuthHOC from '../HOC/AuthHOC';

const INITIAL_STATE = {
    // fields: {
    //     article: ""
    // },
    submitted: false,
    failure: false,
    spinner: Math.floor(Math.random()*2) + 1,
}

let weeks = []
for (let i=1; i< 18; i++) {
  weeks.push(`Week ${i}`)
}

let urlReference = {
    "Week 1": 'https://www.espn.com/nfl/story/_/id/27155205/week-1-nfl-game-picks-schedule-guide-fantasy-football-tips-more',
    "Week 2": 'https://www.espn.com/nfl/story/_/id/27593208/week-2-nfl-game-picks-schedule-guide-fantasy-football-tips-more',
    "Week 3": 'https://www.espn.com/nfl/story/_/id/27646341/week-3-nfl-game-picks-schedule-guide-fantasy-football-tips-more',
    "Week 4": 'https://www.espn.com/nfl/story/_/id/27691599/week-4-nfl-game-picks-schedule-guide-fantasy-football-tips-more',
    "Week 5": 'https://www.espn.com/nfl/story/_/id/27752831/week-5-nfl-game-picks-schedule-guide-fantasy-football-tips-more',
    "Week 6": 'https://www.espn.com/nfl/story/_/id/27807791/week-6-nfl-game-picks-schedule-guide-fantasy-football-tips-more',
    "Week 7": 'https://www.espn.com/nfl/story/_/id/27860778/week-7-nfl-game-picks-schedule-guide-fantasy-football-tips-more',
    "Week 8": 'https://www.espn.com/nfl/story/_/id/27911398/week-8-nfl-game-picks-schedule-guide-fantasy-football-tips-more',
    "Week 9": 'https://www.espn.com/nfl/story/_/id/27966856/week-9-nfl-game-picks-schedule-guide-fantasy-football-tips-more',
    "Week 10": 'https://www.espn.com/nfl/story/_/id/28020375/week-10-nfl-game-picks-schedule-guide-fantasy-football-tips-more',
    "Week 11": 'https://www.espn.com/nfl/story/_/id/28072584/week-11-nfl-game-picks-schedule-guide-fantasy-football-tips-more',
    "Week 12": 'https://www.espn.com/nfl/story/_/id/28123424/week-12-nfl-game-picks-schedule-guide-fantasy-football-tips-more',
    "Week 13": 'https://www.espn.com/nfl/story/_/id/28175851/week-13-nfl-game-picks-schedule-guide-playoff-scenarios-more',
    "Week 14": 'https://www.espn.com/nfl/story/_/id/28224405/week-14-nfl-game-picks-schedule-guide-playoff-scenarios-more',
    "Week 15": 'https://www.espn.com/nfl/story/_/id/28277543/week-15-nfl-game-picks-schedule-guide-playoff-scenarios-more',
    "Week 16": 'https://www.espn.com/nfl/story/_/id/28328575/week-16-nfl-game-picks-schedule-guide-playoff-scenarios-more',
    "Week 17": 'https://www.espn.com/nfl/story/_/id/28366043/week-17-nfl-game-picks-schedule-guide-playoff-scenarios-more'
}

class NewPredictionsForm extends React.Component {
    
    state = INITIAL_STATE

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.value)
        let website = urlReference[event.target.value]
        console.log("website",website)
        this.setState({submitted: true}, ()=> this.props.onPostArticle(website))
    }

    // handleChange = (event) => {
    //     const newFields = {...this.state.fields, [event.target.name]: event.target.value};
    //     this.setState({
    //         fields: newFields,
    //         submitted: false
    //     });
    // }

    handleGoBack = (event) => {
        // event.preventDefault();
        this.setState({submitted: false})

    }


    createOptions = (array) => {
        return array.map(week => <option value={week} key={week}>{week}</option>)
      }

    pickWeek = (event) => {
        console.log(event.target.value)
    }

    render () {
        return (
            <div style={{background: this.props.color3, display: "flex", alignItems: "center", justifyContent: "center"}}>
                {this.state.submitted && !this.props.failure && !this.props.loading && this.props.loaded
                ? <AnalysisCard
                    previousPage={"new"}
                    onGoBack={this.handleGoBack.bind(this)}
                    predictions={this.props.batch.predictions}
                    scores={this.props.batch.scores}
                    batch={this.props.batch} 
                    loaded={this.props.loaded}
                 /> 
                : 
                <div>
                      <Form.Control
                        as="select"
                        name="style"
                        onChange={event => this.handleSubmit(event)}>
                        <option>Select a week in the 2019 season</option>
                        {this.createOptions(weeks)}
                      </Form.Control>

                        <h3>{this.props.failure ? "Hmm, that didn't seem to work. Try again!" : null}</h3>
                        <h2>{this.props.loading && this.state.spinner === 1? <div style={{backgroundImage: this.props.style.loading1, height: "460px", width: "460px"}}/> : null }</h2>
                        <h2>{this.props.loading && this.state.spinner === 2? <div style={{backgroundImage: this.props.style.loading2, height: "460px", width: "460px"}}/> : null }</h2>
                </div>
                }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPostArticle: (article) => postArticle(article)(dispatch)
    }
}

const mapStateToProps = state => {
    return {
        failure: state.batches.failure,
        loading: state.batches.loading,
        loaded: state.batches.loaded,
        batch: state.batches.batches[0],
        // predictions: state.batches.batches[0].predictions,
        // scores: state.batches.batches[0].scores,
        style: state.style
    }
}

export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(NewPredictionsForm))