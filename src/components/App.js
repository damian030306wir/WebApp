import React, { Component } from 'react';
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "./assets/style.css";
import quizService from './quizService';
import QuestionBox from "./components2/questionBox";
import Result from "./components2/Result";

class App extends Component {
  state = {
    viewport: {
      latitude: 53.0331258,
      longitude: 18.6155611,
      width: '100vw',
      height: "60vh",
      zoom: 11,
    },
    selectedPark: null,
    Name: '',
    Description: '',
    X: '',
    Y: '',
    Image: '',
    items: [],
    isModalOpen: false,
    questionBank: [],
    score: 0,
    responses: 0,
    items2: []
  }
  getQuestions = () => {
    quizService().then(question => {
      this.setState({
        questionBank: question
      })
    })
  }
  computeAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      this.setState({
        score: this.state.score + 1
      })
    }
    this.setState({
      responses: this.state.responses < 5 ? this.state.responses + 1 : 5
    })
  }
  playAgain = () => {
    this.getQuestions();
    this.setState({
      score: 0,
      responses: 0
    })
  }
  componentDidMount() {
    this.getQuestions();
  }

  addItem = (e) => {
    e.preventDefault();
    const newItem = {
      Name: this.state.Name,
      Description: this.state.Description,
      X: parseFloat(this.state.X),
      Y: parseFloat(this.state.Y),
      // Image: this.state.Image
      // Name: 'kopernik',
      // Description: 'asncjkacnsanksancsanks',
      // latitude: 53.0331258
      //     longitude: 18.7155611,
      Image: 'https://s3.flog.pl/media/foto_300/3769847_kopernik.jpg'

    };
    this.setState(prevState => ({
      items: [...prevState.items, newItem]
    }));
  }
  // addItem = (e) => {
  //   e.preventDefault();
  //   const ob = {
  //     X: parseFloat(this.state.Latitude),
  //     Y: parseFloat(this.state.Longitude),
  //   }
  //   fetch("http://dearjean.ddns.net:44201/api/points", {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(ob)
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       console.log(res);
  //     })

  // }





  addItem2 = (e) => {
    e.preventDefault();
    const newItem = {
      Name: 'Ciekawe miejsce',
      Description: 'papapapapapapa',
      X: 53.0331258,
      Y: 18.6155611,
      // Image: this.state.Image
      // Name: 'kopernik',
      // Description: 'asncjkacnsanksancsanksancasanksancssanksancsanksancsanksancsanksanccsa',
      // latitude: 53.0331258,
      // longitude: 18.6155611,
      Image: 'https://s3.flog.pl/media/foto_300/3769847_kopernik.jpg'

    };
    this.setState(prevState => ({
      items: [...prevState.items, newItem],
      isModalOpen: false,
    }));
  }



  openModal = () => {
    this.setState({
      isModalOpen: true,
    })
  }
  closeModal = () => {
    this.setState({
      isModalOpen: false,
    })
  }
  render() {
    return (
      <div>
        <button className="btn" onClick={this.openModal}>Zagraj</button>
        <ReactMapGL {...this.state.viewport} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/robert1995/ck8jf1dl90awl1imhfexrgpe8"
          onViewportChange={(viewport) => this.setState({ viewport: viewport })}
        >
          {this.state.items.map((park) => (
            <Marker
              key={park.Id}
              latitude={park.X}
              longitude={park.Y}

            >
              <button className="marker-btn" onClick={(e) => {
                e.preventDefault();
                this.setState({ selectedPark: park })


              }}>
                <img src="mark.svg" alt="Icon" />
              </button>
            </Marker>
          ))}
          {this.state.selectedPark ? (
            <Popup
              latitude={this.state.selectedPark.X}
              longitude={this.state.selectedPark.Y}
              onClose={() => {
                this.setState({ selectedPark: null })
              }}
            >
              <div className="images">
                <h2 className="h2">{this.state.selectedPark.Name}</h2>
                <div className="divek">
                  <div className="div">
                    <img src={this.state.selectedPark.Image} alt="" />
                    <p className="p">{this.state.selectedPark.Description}</p>
                  </div>
                </div>
              </div>
            </Popup>
          ) : null}

        </ReactMapGL>
        <h1 className="tiitle">Interesujące miejsca w Toruniu</h1>
        <div className="wrapper">
          <form onSubmit={this.addItem} className="form">
            <input
              // required
              className="lefcik"
              type="text"
              placeholder="Podaj nazwe punktu.."
              value={this.state.Name}
              onChange={e => this.setState({
                Name: e.target.value
              })}
            />
            <textarea
              // required
              className="lefcik"
              type="text"
              rows="5"
              cols="33"
              placeholder="Opis.."
              value={this.state.Description}
              onChange={e => this.setState({
                Description: e.target.value
              })}
            />
            <input
              // required
              className="lefcik"
              type="number"
              placeholder="Długość"
              value={this.state.X}
              onChange={e => this.setState({
                X: e.target.value
              })}
            />
            <input
              // required
              className="lefcik "
              type="number"
              placeholder="Szerokosc"
              value={this.state.Y}
              onChange={e => this.setState({
                Y: e.target.value
              })}
            />
            <input
              // required
              className="lefcik"
              type="text"
              placeholder="Dodaj zdjęcie.."
              value={this.state.Image}
              onChange={e => this.setState({
                Image: e.target.value
              })}
            />
            <button className="lefcik btn"> Dodaj punkt</button>
          </form>
        </div>
        <div>
          {/* {this.state.items.map(item => (
            <>
              <h1>Wybierz punkt {item.Name} i zagraj!</h1>
              <button className="btn" onClick={this.openModal}>Zagraj</button>
            </>
          ))} */}

        </div>
        {this.state.isModalOpen &&
          <div className="container">
            <button className="closeButton" onClick={this.closeModal}></button>
            <div className="title">Quiz</div>
            {this.state.questionBank.length > 0 &&
              this.state.responses < 5 &&

              this.state.questionBank.map(
                ({ question, answers, correct, id }) => (
                  <QuestionBox key={id} question={question} options={answers} selected={answer => this.computeAnswer(answer, correct)} />
                )
              )}
            {this.state.responses === 5 ? (<Result addItem2={this.addItem2} score={this.state.score} playAgain={this.playAgain} />) : null}
          </div>}



      </div >
    );
  }
}

export default App;