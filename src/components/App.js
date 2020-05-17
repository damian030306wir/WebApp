import React, { Component } from 'react';
import QuestionBox from "./components2/questionBox";
import Result from "./components2/Result";
import Home from "./Home";
import Welcome from './Welcome/Welcome';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import NotFound from './NotFound';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = "pk.eyJ1Ijoicm9iZXJ0MTk5NSIsImEiOiJjazhqZGQ4b2owN255M2VxcXBkaHp5cGowIn0.5oKYRrs_iAmrx2HfbpB-Hw";
var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
var start = [18.59436, 53.01011];


class App extends Component {

  state = {
    lng: 18.59436,
    lat: 53.01011,
    width: '100vw',
    height: "60vh",
    zoom: 9,
    selectedPark: null,
    isModalOpen: false,
    isModalOpen2: false,
    Name: '',
    Description: '',
    X: 53.0331258,
    Y: 18.6355611,
    search: '',
    RouteId: 1,
    Image: '',
    Quest: '',
    A: '',
    B: '',
    C: '',
    D: '',
    Good: '',
    NameRoute: '',
    items: [],
    newItems: [],
    score: 0,
    responses: 0,
    result: 5,
    point: 0,
    PointId: [],
    elements: [],
    elements2: [{ "Name": "Pomnik Mikołaja Kopernika", "Description": "Stojący w południowo-wschodnim narożniku staromiejskiego rynku pomnik Mikołaja Kopernika jest jednym z najważniejszych symboli Torunia.", "X": 18.604488372802734, "Y": 53.010440826416016 }, { "Name": "Muzeum Toruńskiego Piernika", "Description": "Muzeum Toruńskiego Piernika mieści się w najstarszej w Europie fabryce pierników należącej niegdyś do rodziny Weese.", "X": 18.6063585, "Y": 53.0111911 }, { "Name": "Toruń Plaza", "Description": "Centrum handlowe Toruń Plaza", "X": 18.5596037, "Y": 53.0156193 }, { "Name": "Dom Legend Toruńskich", "Description": "Dom Legend Toruńskich to miejsce będące połączeniem interaktywnego muzeum i teatru. We wnętrzu średniowiecznej piwnicy opowiadane tu są tradycyjne legendy toruńskie przekazywane ustnie z dziada pradziada.  Można tu spędzić czas słuchając opowieści przewodników albo czynnie uczestniczyć w opisywanych historiach.", "X": 18.6038847, "Y": 53.0102119 }, { "Name": "Bunkier-Wisłą", "Description": "Bunkier-Wisła w Toruniu – niemiecki schron przeciwlotniczy z okresu II wojny światowej, obecnie muzeum interaktywne w Toruniu.", "X": 18.6017954, "Y": 53.00812 }, { "Name": "Rzeźba Osiołka w Toruniu", "Description": "Figura osła nawiązuje do stosowanych w dawnym Toruniu kar za drobne i cięższe przewinienia, wymierzanych tutaj - w pobliżu odwachu - dla żołnierzy toruńskich sił zbrojnych.", "X": 18.6030514, "Y": 53.0101886 }],
    elements3: [],
    history: [
      // [{ "Name": "Pomnik Mikołaja Kopernika", "Description": "Stojący w południowo-wschodnim narożniku staromiejskiego rynku pomnik Mikołaja Kopernika jest jednym z najważniejszych symboli Torunia.", "X": 18.604488372802734, "Y": 53.010440826416016 }, { "Name": "Muzeum Toruńskiego Piernika", "Description": "Muzeum Toruńskiego Piernika mieści się w najstarszej w Europie fabryce pierników należącej niegdyś do rodziny Weese.", "X": 18.6063585, "Y": 53.0111911 }, { "Name": "Toruń Plaza", "Description": "Centrum handlowe Toruń Plaza", "X": 18.5596037, "Y": 53.0156193 }], [{ "Name": "Dom Legend Toruńskich", "Description": "Dom Legend Toruńskich to miejsce będące połączeniem interaktywnego muzeum i teatru. We wnętrzu średniowiecznej piwnicy opowiadane tu są tradycyjne legendy toruńskie przekazywane ustnie z dziada pradziada.  Można tu spędzić czas słuchając opowieści przewodników albo czynnie uczestniczyć w opisywanych historiach.", "X": 18.6038847, "Y": 53.0102119 }, { "Name": "Bunkier-Wisłą", "Description": "Bunkier-Wisła w Toruniu – niemiecki schron przeciwlotniczy z okresu II wojny światowej, obecnie muzeum interaktywne w Toruniu.", "X": 18.6017954, "Y": 53.00812 }, { "Name": "Rzeźba Osiołka w Toruniu", "Description": "Figura osła nawiązuje do stosowanych w dawnym Toruniu kar za drobne i cięższe przewinienia, wymierzanych tutaj - w pobliżu odwachu - dla żołnierzy toruńskich sił zbrojnych.", "X": 18.6030514, "Y": 53.0101886 }]
    ],
    currentHistoryIndex: 0,
    idRt: [],
    qBank: [
      {
        question: "Ile pomnik ma lat?",
        answers: ["100", "200", "300", "400"],
        correct: "100",
        id: 0,

      },
      {
        question: "Jak test jest",
        answers: ["Mikołaj", "Tomasz", "Arek", "Bartosz"],
        correct: "Mikołaj",
        id: 1,

      },
      {
        question: "Jaką testowea",
        answers: ["test", "fajna", "smutną", "głupią"],
        correct: "test",
        id: 2,

      }, {
        question: "testowe pytanie2",
        answers: ["tak", "nie", "co", "lol"],
        correct: "tak",
        id: 3,

      },
      {
        question: "testowe pytanie3",
        answers: ["tak", "nie", "co", "lol"],
        correct: "tak",
        id: 4,

      }, {
        question: "testowe pytanie4",
        answers: ["tak", "nie", "co", "lol"],
        correct: "tak",
        id: 5,
      },
      {
        question: "testowe pytanie5",
        answers: ["tak", "nie", "co", "lol"],
        correct: "tak",
        id: 6,
      },],
    qBank2: [
      {
        question: "Ile pomnik ma lat?",
        answers: ["100", "200", "300", "400"],
        correct: "100",
        id: 0,

      },
      {
        question: "Jak test jest",
        answers: ["Mikołaj", "Tomasz", "Arek", "Bartosz"],
        correct: "Mikołaj",
        id: 1,

      },
      {
        question: "Jaką testowea",
        answers: ["test", "fajna", "smutną", "głupią"],
        correct: "test",
        id: 2,

      }, {
        question: "testowe pytanie2",
        answers: ["tak", "nie", "co", "lol"],
        correct: "tak",
        id: 3,

      },
      {
        question: "testowe pytanie3",
        answers: ["tak", "nie", "co", "lol"],
        correct: "tak",
        id: 4,

      }, {
        question: "testowe pytanie4",
        answers: ["tak", "nie", "co", "lol"],
        correct: "tak",
        id: 5,
      },
      {
        question: "testowe pytanie5",
        answers: ["tak", "nie", "co", "lol"],
        correct: "tak",
        id: 6,
      },],
    trasy: [],
    history2: [],
    trasy2: []
  };
  // tutaj zapisujemy wpisy w historii
  handleOnHistoryPush = (e) => {
    // e.preventDefault();

    // this.setState({ history: ([...this.state.history, this.state.elements]) });
    this.setState({ elements: ([]), PointId: [] });
    const newItem = {
      UpdateList: [...this.state.PointId],
      "Name": this.state.NameRoute,
      "Description": this.state.Description

    }
    fetch("http://dearjean.ddns.net:44301/api/Points3/Change", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({
          history: [...this.state.history, res.Points3s]
        })
      })

    // console.log(newItem)
    // console.log(this.state.elements)

  };
  // dodajemy kolejny element do aktualnych elementów
  appendElement = (Name, Description, X, Y, RouteId) => {
    this.setState({
      elements: ([...this.state.elements, { Name, Description, X, Y, RouteId }]),

      // elements2: ([...this.state.elements2, { Name, Description, X, Y, RouteId }])
    })
    const newItem = {
      "Name": Name,
      "Y": Y,
      "X": X,
      "RouteId": 1,
      "Description": Description
    }
    fetch("http://dearjean.ddns.net:44301/api/Points3", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          PointId: [...this.state.PointId, res.Id]
        })
      })


  };
  appendQuestion = (Quest, A, B, C, D, Good) => {
    this.setState({
      qBank: ([...this.state.qBank, {
        question: Quest,
        answers: [A, B, C, D],
        correct: Good
      }])
    })
  }

  addItem2 = (e) => {
    e.preventDefault();
  }

  // componentDidMount() {

  //   const map = new mapboxgl.Map({
  //     container: this.mapContainer,
  //     style: 'mapbox://styles/mapbox/streets-v11',
  //     center: [this.state.lng, this.state.lat],
  //     zoom: this.state.zoom,
  //   })

  //   // fetch(`http://dearjean.ddns.net:44301/api/Routes`)
  //   //   .then(response => {
  //   //     if (response.ok) {
  //   //       return response;
  //   //     }
  //   //     throw Error(response.status)
  //   //   })
  //   //   .then(response => response.json())
  //   //   .then(data => (
  //   //     // console.log(data.length)
  //   //     this.setState({
  //   //       idRt: [...this.state.idRt, ...data]
  //   //     })
  //   //   )

  //   //   )
  //   //   .catch(error => console.log(error))

  //   fetch(`http://dearjean.ddns.net:44301/api/Points3/`)
  //     .then(response => {
  //       if (response.ok) {
  //         return response;
  //       }
  //       throw Error(response.status)
  //     })
  //     .then(response => response.json())
  //     .then(data => (
  //       // console.log(data.length)
  //       this.setState({
  //         idRt: [...this.state.idRt, ...data]
  //       })
  //     )

  //     )
  //     .catch(error => console.log(error))
  // }

  addItem = (e) => {
    e.preventDefault();
    const newItem = {
      "Name": this.state.Name,
      "Description": this.state.Description,
      "Y": parseFloat(this.state.X),
      "X": parseFloat(this.state.Y),
    };
    this.setState(prevState => ({
      items: [...prevState.items, newItem]
    }));

    const newItems = [...this.state.items, newItem]
    this.setState({ newItems })
    fetch("http://dearjean.ddns.net:44301/api/PointOnlies", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    })
    var bounds = [
      [18.11318691590263, 50.022222],
      [18.90647886197926, 53.3331258]
    ];
    map.setMaxBounds(bounds);

    // initialize the map canvas to interact with later
    var canvas = map.getCanvasContainer();

    // an arbitrary start will always be the same
    // only the end or destination will change
    start = [18.59436, 53.01011];
    // this is where the code for the next step will go
    // create a function to make a directions request
    function getRoute(end) {
      // make a directions request using cycling profile
      // an arbitrary start will always be the same
      // only the end or destination will change
      // var start = [18.59436, 53.01011];
      var url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + start[0] + ',' + start[1] + ';' + end[0] +
        ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;

      // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
      var req = new XMLHttpRequest();
      req.open('GET', url, true);
      req.onload = function () {
        var json = JSON.parse(req.response);
        var data = json.routes[0];
        var route = data.geometry.coordinates;
        var geojson = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route
          }
        };
        // if the route already exists on the map, reset it using setData
        if (map.getSource('route')) {
          map.getSource('route').setData(geojson);
        } else { // otherwise, make a new request
          map.addLayer({
            id: 'route',
            type: 'line',
            source: {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: geojson
                }
              }
            },
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#3887be',
              'line-width': 5,
              'line-opacity': 0.75
            }
          });
        }
        // get the sidebar and add the instructions
        var instructions = document.getElementById('instructions');
        var steps = data.legs[0].steps;

        var tripInstructions = [];

        for (var i = 0; i < steps.length; i++) {
          tripInstructions.push(`<li> ${steps[i].maneuver.instruction} </li>`);
          instructions.innerHTML = '<br><span class="duration">Trip duration: ' + Math.floor(data.duration /
            60) +
            ' min 🚴 </span>' + tripInstructions.join("");
        }
      };
      req.send();
    }

    map.on('load', function () {
      // make an initial directions request that
      // starts and ends at the same location
      getRoute(start);

      // Add starting point to the map
      map.addLayer({
        id: 'point',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: start
              }
            }]
          }
        },
        paint: {
          'circle-radius': 10,
          'circle-color': 'black'
        }
      });
      // this is where the code from the next step will go
    });
    map.on('click', function (e) {
      var coordsObj = e.lngLat;
      canvas.style.cursor = '';
      var coords = Object.keys(coordsObj).map(function (key) {
        return coordsObj[key];
      });
      var end = {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: coords
          }
        }]
      };
      if (map.getLayer('end')) {
        map.getSource('end').setData(end);
      } else {
        map.addLayer({
          id: 'end',
          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: coords
                }
              }]
            }
          },
          paint: {
            'circle-radius': 10,
            'circle-color': '#f30'
          }
        }
        );
      }
      getRoute(coords);
      start = [coords[0], coords[1]]

    });

    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }))
    for (const obj of newItems) {
      // var obj = this.state.items[i];

      let myLatlng = new mapboxgl.LngLat(obj.X, obj.Y);
      new mapboxgl.Marker()
        .setLngLat(myLatlng)
        .setPopup(new mapboxgl.Popup({ offset: 25 })
          .setHTML('<h3>' + obj.Name + '</h3><p>' + obj.Description + '</p><button onclick=(function(){event.target.parentNode.remove()})();>This Button</button>'
          ))
        // <button onclick=(function(){event.target.parentNode.remove})();>This Button</button>

        .addTo(map);
    }
    e.preventDefault();
  }
  handleFetch = (e) => {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    })
    const loopOverItems = () => {
      for (var i = 0; i < this.state.items.length; i++) {
        var obj = this.state.items[i];
        let myLatlng = new mapboxgl.LngLat(obj.X, obj.Y);
        new mapboxgl.Marker()
          .setLngLat(myLatlng)
          .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML('<h3>' + obj.Name + '</h3><p>' + obj.Description + '</p>'))
          .addTo(map);
      }
    }
    fetch('http://dearjean.ddns.net:44301/api/PointOnlies')
      .then(resposne => {
        if (resposne.ok) {
          return resposne;
        }
        throw Error(resposne.status)
      })
      .then(response => response.json())
      .then(data => this.setState({ items: data }, loopOverItems))
      .catch(error => console.log(error))

    var bounds = [
      [18.11318691590263, 50.022222],
      [18.90647886197926, 53.3331258]
    ];
    map.setMaxBounds(bounds);

    // initialize the map canvas to interact with later
    var canvas = map.getCanvasContainer();

    // an arbitrary start will always be the same
    // only the end or destination will change
    start = [18.59436, 53.01011];
    // this is where the code for the next step will go
    // create a function to make a directions request
    function getRoute(end) {
      // make a directions request using cycling profile
      // an arbitrary start will always be the same
      // only the end or destination will change
      // var start = [18.59436, 53.01011];
      var url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + start[0] + ',' + start[1] + ';' + end[0] +
        ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;

      // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
      var req = new XMLHttpRequest();
      req.open('GET', url, true);
      req.onload = function () {
        var json = JSON.parse(req.response);
        var data = json.routes[0];
        var route = data.geometry.coordinates;
        var geojson = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route
          }
        };
        // if the route already exists on the map, reset it using setData
        if (map.getSource('route')) {
          map.getSource('route').setData(geojson);
        } else { // otherwise, make a new request
          map.addLayer({
            id: 'route',
            type: 'line',
            source: {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: geojson
                }
              }
            },
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#3887be',
              'line-width': 5,
              'line-opacity': 0.75
            }
          });
        }
        // get the sidebar and add the instructions
        var instructions = document.getElementById('instructions');
        var steps = data.legs[0].steps;

        var tripInstructions = [];

        for (var i = 0; i < steps.length; i++) {
          tripInstructions.push(`<li> ${steps[i].maneuver.instruction} </li>`);
          instructions.innerHTML = '<br><span class="duration">Trip duration: ' + Math.floor(data.duration /
            60) +
            ' min 🚴 </span>' + tripInstructions.join("");
        }
      };
      req.send();
    }

    map.on('load', function () {
      // make an initial directions request that
      // starts and ends at the same location
      getRoute(start);

      // Add starting point to the map
      map.addLayer({
        id: 'point',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: start
              }
            }]
          }
        },
        paint: {
          'circle-radius': 10,
          'circle-color': 'black'
        }
      });
      // this is where the code from the next step will go
    });
    map.on('click', function (e) {
      var coordsObj = e.lngLat;
      canvas.style.cursor = '';
      var coords = Object.keys(coordsObj).map(function (key) {
        return coordsObj[key];
      });
      var end = {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: coords
          }
        }]
      };
      if (map.getLayer('end')) {
        map.getSource('end').setData(end);
      } else {
        map.addLayer({
          id: 'end',
          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: coords
                }
              }]
            }
          },
          paint: {
            'circle-radius': 10,
            'circle-color': '#f30'
          }
        }
        );
      }
      getRoute(coords);
      start = [coords[0], coords[1]]

    });

    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }))

    e.preventDefault();

  }

  handleSelect = (event) => {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: 15,
    })
    fetch(`http://dearjean.ddns.net:44301/api/Points3/RouteOnNumber?id=${this.state.currentHistoryIndex}&fbclid=IwAR2ZSVQ3WLxfVDrBgSvvejcxIm0lpE908_cm39yDAPah6LqJLqSLDLE-T_E`)
      .then(response => {
        if (response.ok) {
          return response;
        }
        throw Error(response.status)
      })
      .then(response => response.json())
      .then(data => this.setState({
        // console.log(res)
        // history: data
        history: [...this.state.history, data]

      })
      )
      .catch(error => console.log(error))
    const loop = () => {
      for (const obj of this.state.history[this.state.currentHistoryIndex]) {
        // for (const obj of this.state.history) {
        let myLatlng = new mapboxgl.LngLat(obj.X, obj.Y);
        new mapboxgl.Marker()
          .setLngLat(myLatlng)
          .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML('<h3>' + obj.Name + '</h3><p>' + obj.Description + '</p>'
            ))
          .addTo(map);
      }
    }


    this.setState({ currentHistoryIndex: event.currentTarget.value }, loop)


    var bounds = [
      [18.11318691590263, 50.022222],
      [18.90647886197926, 53.3331258]
    ];
    map.setMaxBounds(bounds);

    // initialize the map canvas to interact with later
    var canvas = map.getCanvasContainer();

    // an arbitrary start will always be the same
    // only the end or destination will change
    start = [18.59436, 53.01011];
    // this is where the code for the next step will go
    // create a function to make a directions request
    function getRoute(end) {
      // make a directions request using cycling profile
      // an arbitrary start will always be the same
      // only the end or destination will change
      // var start = [18.59436, 53.01011];
      var url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + start[0] + ',' + start[1] + ';' + end[0] +
        ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;

      // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
      var req = new XMLHttpRequest();
      req.open('GET', url, true);
      req.onload = function () {
        var json = JSON.parse(req.response);
        var data = json.routes[0];
        var route = data.geometry.coordinates;
        var geojson = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route
          }
        };
        // if the route already exists on the map, reset it using setData
        if (map.getSource('route')) {
          map.getSource('route').setData(geojson);
        } else { // otherwise, make a new request
          map.addLayer({
            id: 'route',
            type: 'line',
            source: {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: geojson
                }
              }
            },
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#3887be',
              'line-width': 5,
              'line-opacity': 0.75
            }
          });
        }
        // get the sidebar and add the instructions
        var instructions = document.getElementById('instructions');
        var steps = data.legs[0].steps;

        var tripInstructions = [];

        for (var i = 0; i < steps.length; i++) {
          tripInstructions.push(`<li> ${steps[i].maneuver.instruction} </li>`);
          instructions.innerHTML = '<br><span class="duration">Trip duration: ' + Math.floor(data.duration /
            60) +
            ' min 🚴 </span>' + tripInstructions.join("");
        }
      };
      req.send();
    }

    map.on('load', function () {
      // make an initial directions request that
      // starts and ends at the same location
      getRoute(start);

      // Add starting point to the map
      map.addLayer({
        id: 'point',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: start
              }
            }]
          }
        },
        paint: {
          'circle-radius': 10,
          'circle-color': 'black'
        }
      });
      // this is where the code from the next step will go
    });
    map.on('click', function (e) {
      var coordsObj = e.lngLat;
      canvas.style.cursor = '';
      var coords = Object.keys(coordsObj).map(function (key) {
        return coordsObj[key];
      });
      var end = {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: coords
          }
        }]
      };
      if (map.getLayer('end')) {
        map.getSource('end').setData(end);
      } else {
        map.addLayer({
          id: 'end',
          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: coords
                }
              }]
            }
          },
          paint: {
            'circle-radius': 2,
            'circle-color': '#f30'
          }
        }
        );
      }
      getRoute(coords);
      start = [coords[0], coords[1]]

    });

    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }))
    event.preventDefault();
  }

  openModal = (id) => {
    console.log(id)
    this.setState({
      isModalOpen: true,
      isModalOpen2: false
    })
    const qBank = [...this.state.qBank];
    const elements2 = [...this.state.elements2]
    const index = qBank.findIndex(q => q.id === id)
    const task = qBank.splice(index, 1)
    elements2.splice(index, 1)
    this.setState({
      qBank: task,
      elements2
    })
  }
  closeModal = () => {
    this.setState({

      isModalOpen: false,
      isModalOpen2: true,
      qBank: this.state.qBank2,
      responses: 0,
      score: 0,
    })

  }

  computeAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      this.setState({
        score: this.state.score + 1,
        point: this.state.point + 1
      })
    }
    this.setState({
      responses: this.state.responses < 5 ? this.state.responses + 1 : 5
    })
  }
  playAgain = () => {
    const qBank = [
      {
        question: "Ile pomnik ma lat?",
        answers: ["100", "200", "300", "400"],
        correct: "100",
        id: 0,

      },
      {
        question: "Jak test jest",
        answers: ["Mikołaj", "Tomasz", "Arek", "Bartosz"],
        correct: "Mikołaj",
        id: 1,

      },
      {
        question: "Jaką testowea",
        answers: ["test", "fajna", "smutną", "głupią"],
        correct: "test",
        id: 2,

      }]
    this.setState({
      responses: 0,
      score: 0
    })
  }
  openModal2 = () => {
    this.setState({
      isModalOpen2: true,
    })
  }
  closeModal2 = () => {
    this.setState({
      isModalOpen2: false,
    })
  }
  handleRoute = (e) => {
    this.setState({
      isModalOpen2: true,
    })
    fetch(`http://dearjean.ddns.net:44301/api/Routes`)
      .then(response => {
        if (response.ok) {
          return response;
        }
        throw Error(response.status)
      })
      .then(response => response.json())
      .then(data =>
        this.setState({
          // console.log(data)
          // history: data
          trasy: [...this.state.trasy, ...data],
          trasy2: [...this.state.trasy, ...data]

        })
      )
      .catch(error => console.log(error))

  }

  myIp = (id) => {

    console.log(id)
    const newHistory2 = []
    // console.log(this.state.idRt.RouteId)
    for (const point of this.state.idRt) {
      if (id === point.RouteId) {
        // console.log(point.Name)
        // console.log(point.RouteId)
        newHistory2.push({
          Name: point.Name,
          Description: point.Description,
          X: point.Y,
          Y: point.X
        });
      }
    }
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: 10,
    })
    const loop = () => {
      for (const obj of this.state.history2) {
        let myLatlng = new mapboxgl.LngLat(obj.Y, obj.X);
        new mapboxgl.Marker()
          .setLngLat(myLatlng)
          .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML('<h3>' + obj.Name + '</h3><p>' + obj.Description + '</p>'
            ))
          .addTo(map);
      }
    }
    this.setState({ history2: newHistory2 }, loop)
    this.setState({
      isModalOpen2: false,
    })



    var bounds = [
      [18.11318691590263, 50.022222],
      [18.90647886197926, 53.3331258]
    ];
    map.setMaxBounds(bounds);

    // initialize the map canvas to interact with later
    var canvas = map.getCanvasContainer();

    // an arbitrary start will always be the same
    // only the end or destination will change
    start = [18.59436, 53.01011];
    // this is where the code for the next step will go
    // create a function to make a directions request
    function getRoute(end) {
      // make a directions request using cycling profile
      // an arbitrary start will always be the same
      // only the end or destination will change
      // var start = [18.59436, 53.01011];
      var url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + start[0] + ',' + start[1] + ';' + end[0] +
        ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;

      // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
      var req = new XMLHttpRequest();
      req.open('GET', url, true);
      req.onload = function () {
        var json = JSON.parse(req.response);
        var data = json.routes[0];
        var route = data.geometry.coordinates;
        var geojson = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route
          }
        };
        // if the route already exists on the map, reset it using setData
        if (map.getSource('route')) {
          map.getSource('route').setData(geojson);
        } else { // otherwise, make a new request
          map.addLayer({
            id: 'route',
            type: 'line',
            source: {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: geojson
                }
              }
            },
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#3887be',
              'line-width': 5,
              'line-opacity': 0.75
            }
          });
        }
        // get the sidebar and add the instructions
        var instructions = document.getElementById('instructions');
        var steps = data.legs[0].steps;

        var tripInstructions = [];

        for (var i = 0; i < steps.length; i++) {
          tripInstructions.push(`<li> ${steps[i].maneuver.instruction} </li>`);
          instructions.innerHTML = '<br><span class="duration">Trip duration: ' + Math.floor(data.duration /
            60) +
            ' min 🚴 </span>' + tripInstructions.join("");
        }
      };
      req.send();
    }

    map.on('load', function () {
      // make an initial directions request that
      // starts and ends at the same location
      getRoute(start);

      // Add starting point to the map
      map.addLayer({
        id: 'point',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: start
              }
            }]
          }
        },
        paint: {
          'circle-radius': 10,
          'circle-color': 'black'
        }
      });
      // this is where the code from the next step will go
    });
    map.on('click', function (e) {
      var coordsObj = e.lngLat;
      canvas.style.cursor = '';
      var coords = Object.keys(coordsObj).map(function (key) {
        return coordsObj[key];
      });
      var end = {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: coords
          }
        }]
      };
      if (map.getLayer('end')) {
        map.getSource('end').setData(end);
      } else {
        map.addLayer({
          id: 'end',
          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: coords
                }
              }]
            }
          },
          paint: {
            'circle-radius': 2,
            'circle-color': '#f30'
          }
        }
        );
      }
      getRoute(coords);
      start = [coords[0], coords[1]]

    });

    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }))

  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.search.length === 0 && prevState.search.length === 0) {
      fetch(`http://dearjean.ddns.net:44301/api/Routes`)
        .then(response => {
          if (response.ok) {
            return response;
          }
          throw Error(response.status)
        })
        .then(response => response.json())
        .then(data =>
          this.setState({
            trasy: [...data]
          })
        )
        .catch(error => console.log(error))
    }
    if (prevState.search !== this.state.search) {
      fetch(`http://dearjean.ddns.net:44301/api/Routes/Search?word=${this.state.search}`)
        .then(response => {
          if (response.ok) {
            return response;
          }
          throw Error(response.status)
        })
        .then(response => response.json())
        .then(data =>
          // console.log(data)
          this.setState({
            // history: data
            trasy: [...data]
          })
          // this.setState(prevState => ({
          //   trasy: [prevState.data]
          // }))
        )
        .catch(error => console.log(error))
    }



  }



  render() {

    return (
      <>
        <BrowserRouter >
          <Switch>
            {<Route exact path="/" component={Welcome} />}
            {<Route path="/home" component={Home} />}
            {<Route path="/login" component={Login} />}
            {<Route path="/Signup" component={Signup} />}
            {<Route path="*" component={NotFound} />}
          </Switch>
        </BrowserRouter>



      </>

    )

  }

}
export default App;




