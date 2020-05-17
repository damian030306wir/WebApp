import React, { Component } from 'react';
import QuestionBox from "./components2/questionBox";
import Result from "./components2/Result";
import { Redirect } from 'react-router-dom';

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = "pk.eyJ1Ijoicm9iZXJ0MTk5NSIsImEiOiJjazhqZGQ4b2owN255M2VxcXBkaHp5cGowIn0.5oKYRrs_iAmrx2HfbpB-Hw";
var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
var start = [18.59436, 53.01011];


class Home extends Component {

    state = {
        history3: [],
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
        Y: 53.0331258,
        X: 18.6355611,
        search: '',
        RouteId: 1,
        Creator: false,
        Image: '',
        Quest: '',
        A: '',
        B: '',
        C: '',
        D: '',
        Good: '',
        NameRoute: '',
        password: '',
        password2: '',
        score: 0,
        responses: 0,
        result: 5,
        point: 0,
        PointId: [],
        elements: [],
        elements2: [],
        elements3: [],
        redirectToReferrer: false,
        history: [],
        idRt: [],
        qBank: [],
        trasy: [],
        history2: [],
        trasy2: [],
        ranking: [],
        user: 0,
        RouteId2: '',
        isModalOpen3: false,
        isModalOpen4: false,
        isModalRanking: false,
        isModalChangePassword: false,
        Point: '',
        activeButton: true
    };
    // tutaj zapisujemy wpisy w historii
    handleOnHistoryPush = (e) => {
        this.setState({ elements: ([]), PointId: [] });
        const newItem = {
            UpdateList: [...this.state.PointId],
            "Name": this.state.NameRoute,
            "Description": this.state.Description

        }
        fetch("http://dearjean.ddns.net:44301/api/Points3/Change", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${sessionStorage.getItem("access_token")}`
            },
            body: JSON.stringify(newItem)
        })
            .then(res => res.json())
            .then(res => {
                // console.log(res)
                this.setState({
                    history: [...this.state.history, res.Points3s]

                })
                alert("utworzyles")
            }
            )


    };
    // dodajemy kolejny element do aktualnych elementów
    appendElement = (Name, Description, X, Y, RouteId) => {
        this.setState({ activeButton: false })
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
                "Content-Type": "application/json",
                "Authorization": `bearer ${sessionStorage.getItem("access_token")}`
            },
            body: JSON.stringify(newItem)
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    PointId: [...this.state.PointId, res.Id]
                })
                console.log(res)
                this.setState({ activeButton: true })
            })
        this.setState({
            elements: ([...this.state.elements, { Name, Description, X, Y, RouteId }]),
        })


    };

    appendQuestion = (Quest, A, B, C, D, Good, RouteId2) => {

        const newItem = {
            "Question1": Quest,
            "Answers": [A, B, C, D],
            "Correct": Good,
            "RouteId": this.state.RouteId2,
        }
        fetch("http://dearjean.ddns.net:44301/api/AnswerAndQuestion2", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${sessionStorage.getItem("access_token")}`
            },
            body: JSON.stringify(newItem)
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    qBank: ([...this.state.qBank, {
                        Question1: res.Question1,
                        Answers: [...res.Answers],
                        Correct: res.Correct,
                        RouteId: res.RouteId
                    }])

                })
                console.log(res)
            })



    }

    addItem2 = (e) => {
        e.preventDefault();
    }

    componentDidMount() {

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
        })
        if (sessionStorage.getItem('access_token')) {
            console.log('feel')
        } else {
            this.setState({
                redirectToReferrer: true
            })
        }

        fetch(`http://dearjean.ddns.net:44301/api/Points3/`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": `bearer ${sessionStorage.getItem("access_token")}`
            }
        })
            .then(response => {
                if (response.ok) {
                    return response;
                }
                throw Error(response.status)
            })
            .then(response => response.json())
            .then(data => (
                this.setState({
                    idRt: [...this.state.idRt, ...data]
                })
            )

            )
            .catch(error => console.log(error))

        fetch(`http://dearjean.ddns.net:44301/api/Rewards/GetMine`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": `bearer ${sessionStorage.getItem("access_token")}`
            }
        })
            .then(response => {
                if (response.ok) {
                    return response;
                }
                throw Error(response.status)
            })
            .then(response => response.json())
            .then(data => {
                if (data.Punkty >= 500 || data.Roles[0] === "Creator") {
                    this.setState({
                        Creator: true,
                    })
                }
                this.setState({
                    Point: data.Punkty
                })
                console.log(data)

            }



            )
            .catch(error => console.log(error))

        fetch(`http://dearjean.ddns.net:44301/api/AnswerAndQuestion2`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": `bearer ${sessionStorage.getItem("access_token")}`
            }
        })
            .then(response => {
                if (response.ok) {
                    return response;
                }
                throw Error(response.status)
            })
            .then(response => response.json())
            .then(data => (
                this.setState({
                    // gBank: ([...this.state.qBank, {
                    //     Question1: data.Question1,
                    //     Answers: [...data.Answers],
                    //     Correct: data.Correct,
                    //     RouteId: data.RouteId
                    // }])
                    qBank: [...this.state.qBank, ...data]
                })
                // console.log(data)
            )

            )
            .catch(error => console.log(error))

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
            })

            fetch(`http://dearjean.ddns.net:44301/api/Rewards/Get50`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    "Authorization": `bearer ${sessionStorage.getItem("access_token")}`
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response;
                    }
                    throw Error(response.status)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.Punkty >= 500 && this.Creator === false) {
                        this.setState({ Creator: true })
                        alert(`Brawo uzyskałeś ${data.Punkty} punktów. Zostałes creatorem`)
                    }
                }
                )
                .catch(error => console.log(error))
        }
        // )
        // }

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
    closeModal4 = () => {
        this.setState({
            isModalOpen4: false,
        })
    }
    closeModalRanking = () => {
        this.setState({
            isModalRanking: false,
        })
    }
    closeModalProfile = () => {
        this.setState({
            isModalProfile: false,
        })
    }
    closeModalChangePassword = () => {
        this.setState({
            isModalChangePassword: false,
        })
    }
    handleRoute = (e) => {
        this.setState({ history2: [] })
        fetch(`http://dearjean.ddns.net:44301/api/Points3/`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": `bearer ${sessionStorage.getItem("access_token")}`
            }
        })
            .then(response => {
                if (response.ok) {
                    return response;
                }
                throw Error(response.status)
            })
            .then(response => response.json())
            .then(data => (
                this.setState({
                    idRt: [...this.state.idRt, ...data]
                })
            )

            )
            .catch(error => console.log(error))
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
        })

        this.setState({
            isModalOpen2: true,
        })
        fetch(`http://dearjean.ddns.net:44301/api/Routes/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("access_token")
            }
        })
            .then(response => {
                if (response.ok) {
                    return response;
                }
                throw Error(response.status)
            })
            .then(response => response.json())
            .then(data =>
                this.setState({
                    // trasy: [...this.state.trasy, ...data],
                    trasy2: [...this.state.trasy, ...data]

                })
            )
            .catch(error => console.log(error))

    }

    handleRanking = (e) => {
        this.setState({
            isModalRanking: true,
        })

        fetch(`http://dearjean.ddns.net:44301/api/Rewards/`, {
            method: "get",    
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
            }
        })
            .then(response => {
                if (response.ok) {
                    return response;
                }
                throw Error(response.status)
            })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    ranking: [...data],
                })
            }
            )
            .catch(error => console.log(error))
           
    }

    handleProfile = (e) => {
        this.setState({
            isModalProfile: true,
        })
        fetch(`http://dearjean.ddns.net:44301/api/Account/UserInfo/`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                "Authorization": `Bearer  ${sessionStorage.getItem("access_token")}`
            }
        })
            .then(response => {
                if (response.ok) {
                    return response;
                }
                throw Error(response.status)
            })
            .then(response => response.json())
            .then(data =>
                this.setState({
                    user: data

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
                let myLatlng = new mapboxgl.LngLat(obj.X, obj.Y);
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
            isModalOpen4: false,
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
                // var instructions = document.getElementById('instructions');
                // var steps = data.legs[0].steps;

                // var tripInstructions = [];

                // for (var i = 0; i < steps.length; i++) {
                //     tripInstructions.push(`<li> ${steps[i].maneuver.instruction} </li>`);
                //     instructions.innerHTML = '<br><span class="duration">Trip duration: ' + Math.floor(data.duration /
                //         60) +
                //         ' min 🚴 </span>' + tripInstructions.join("");
                // }
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
        if (this.state.search.length === 0) {
            fetch(`http://dearjean.ddns.net:44301/api/Routes`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("access_token")
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response;
                    }
                    throw Error(response.status)
                })
                .then(response => response.json())
                .then(data =>
                    this.setState({
                        trasy2: [...data]
                    })
                )
                .catch(error => console.log(error))
        }
        if (prevState.search !== this.state.search) {
            fetch(`http://dearjean.ddns.net:44301/api/Routes/Search?word=${this.state.search}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("access_token")
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response;
                    }
                    throw Error(response.status)
                })
                .then(response => response.json())
                .then(data =>
                    this.setState({
                        trasy2: [...data]
                    })
                )
                .catch(error => console.log(error))
        }
    }

    logout = () => {
        console.log("logout")
        sessionStorage.setItem('access_token', '');
        sessionStorage.clear()
        this.setState({
            redirectToReferrer: true
        })
    }
    gameIp(id) {
        console.log(id)
        this.setState({
            isModalOpen3: true,
        })
        const newQuestion2 = []
        for (const point of this.state.qBank) {
            if (id === point.RouteId) {
                console.log('tre')
                newQuestion2.push({
                    question: point.Question1,
                    answers: [...point.Answers],
                    correct: point.Correct,
                    id: point.Id
                });

            }

        }



        this.setState({ qBank: newQuestion2 })

        // console.log(newQuestion2)




    }
    openModal3 = () => {
        this.setState({
            isModalOpen3: true,
        })
    }
    closeModal3 = () => {
        fetch(`http://dearjean.ddns.net:44301/api/AnswerAndQuestion2`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": `bearer ${sessionStorage.getItem("access_token")}`
            }
        })
            .then(response => {
                if (response.ok) {
                    return response;
                }
                throw Error(response.status)
            })
            .then(response => response.json())
            .then(data => (
                this.setState({
                    // gBank: ([...this.state.qBank, {
                    //     Question1: data.Question1,
                    //     Answers: [...data.Answers],
                    //     Correct: data.Correct,
                    //     RouteId: data.RouteId
                    // }])
                    qBank: [...this.state.qBank, ...data]
                })
                // console.log(data)
            )

            )
            .catch(error => console.log(error))
        this.setState({
            isModalOpen3: false,
            isModalOpen2: false
        })

    }
    MyRoute = () => {
        this.setState({ trasy: [] })
        fetch(`http://dearjean.ddns.net:44301/api/Routes/GetMine`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("access_token")
            }
        })
            .then(response => {
                if (response.ok) {
                    return response;
                }
                throw Error(response.status)
            })
            .then(response => response.json())
            .then(data =>
                this.setState({
                    trasy: [...this.state.trasy, ...data],
                    // trasy2: [...this.state.trasy, ...data]

                })
                // console.log(data)
            )
            .catch(error => console.log(error))
        this.setState({
            isModalOpen4: true,
        })

    }

    changePasswordView = (id) => {
        this.setState({
            isModalChangePassword: true,
        })

    }

    changePassword = (password,password2) => {
    const newItem = {
        "OldPassword": "Abc1,2",
        "NewPassword": this.state.password,
        "ConfirmPassword": this.state.password2
     }
        if (this.state.Password === this.state.ConfirmPassword) {
                fetch("http://dearjean.ddns.net:44301/api/Account/ChangePassword/", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `bearer ${sessionStorage.getItem("access_token")}`
                    },
                    body: JSON.stringify(newItem)
                })
                    .then(res => res.text())
                    .then(res => {
                        console.log(res);
                    })
            } else alert("Hasła do siebie nie pasują, spróbuj ponownie")
        }

    myIp2 = (id) => {

        console.log(id)
        const newHistory3 = []
        // console.log(this.state.idRt.RouteId)
        for (const point of this.state.idRt) {
            if (id === point.RouteId) {
                // console.log(point.Name)
                // console.log(point.RouteId)
                newHistory3.push({
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
            for (const obj of this.state.history3) {
                let myLatlng = new mapboxgl.LngLat(obj.X, obj.Y);
                new mapboxgl.Marker()
                    .setLngLat(myLatlng)
                    .setPopup(new mapboxgl.Popup({ offset: 25 })
                        .setHTML('<h3>' + obj.Name + '</h3><p>' + obj.Description + '</p>'
                        ))
                    .addTo(map);
            }
        }
        this.setState({ history3: newHistory3 }, loop)
        this.setState({
            isModalOpen2: false,
            isModalOpen4: false,
        })
    }
    deleteTask = (id) => {
        console.log(id)
        const tasks = [...this.state.trasy]
        console.log(tasks)
        const index = tasks.findIndex(task => task.Id === id)
        tasks.splice(index, 1)
        console.log(tasks)


    }

    render() {

        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/login'} />)
        }
        const sorted = [...this.state.ranking].sort((a, b) => a.Punkty < b.Punkty);
        
        return (
            <>
                <button className="btn" onClick={this.handleRoute}>Wszystkie trasy</button>
                <button className="btn" onClick={this.handleRanking}>Ranking użykowników</button>
                <button className="btn" onClick={this.handleProfile}>Mój profil</button>
                {this.state.Creator && <button className="btn" onClick={this.MyRoute}>Moje trasy</button>}
                <div className="nav-area">
                    <button className="btn" onClick={this.logout} type='button'>Wyloguj się</button>
                </div>
                {this.state.Point >= 500 ? <h1>{`Witaj obecnie masz: ${this.state.Point} punktów`}</h1> : <h1>{`Witaj obecnie masz: ${this.state.Point} punktów, uzyskaj 500 punktów, a sam zostaniesz kreatorem tras!`}</h1>}

                {<div ref={el => this.mapContainer = el} className='mapContainer' ></div>}
                <div className="wrapper tiitle">
                    {this.state.Creator && <form onSubmit={this.addItem2} className="form">
                        <input
                            required
                            className="lefcik"
                            type="text"
                            placeholder="Podaj nazwe trasy"
                            value={this.state.NameRoute}
                            onChange={e => this.setState({
                                NameRoute: e.target.value
                            })}
                        />
                        <input
                            required
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
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div>
                                {this.state.activeButton ? <button className="btn" onClick={() => this.appendElement(this.state.Name, this.state.Description, this.state.Y, this.state.X, this.state.RouteId)}>Dodaj punkt</button> : <button disabled className="btn" onClick={() => this.appendElement(this.state.Name, this.state.Description, this.state.Y, this.state.X, this.state.RouteId)}>Dodaj punkt</button>}

                                <button className="btn" onClick={this.handleOnHistoryPush}>Utwórz trasę</button>
                                <ul style={{ listStyle: 'none' }}>
                                    {this.state.elements.map((element, index) => (
                                        <>
                                            <li key={element.index}>{`${element.Name}`}</li>
                                        </>
                                    ))}

                                </ul>
                            </div>

                        </div>


                    </form>}


                </div>
                {this.state.Creator && <form onSubmit={this.addItem2} className="form">
                    <input
                        // required
                        className="lefcik"
                        type="text"
                        placeholder="Zadaj pytanie.."
                        value={this.state.Quest}
                        onChange={e => this.setState({
                            Quest: e.target.value
                        })}
                    />
                    <input
                        // required
                        className="lefcik"
                        type="text"
                        placeholder="Przykładowa odpowiedź"
                        value={this.state.A}
                        onChange={e => this.setState({
                            A: e.target.value
                        })}
                    />
                    <input
                        // required
                        className="lefcik"
                        type="text"
                        placeholder="Przykładowa odpowiedź"
                        value={this.state.B}
                        onChange={e => this.setState({
                            B: e.target.value
                        })}
                    />
                    <input
                        // required
                        className="lefcik"
                        type="text"
                        placeholder="Przykładowa odpowiedź"
                        value={this.state.C}
                        onChange={e => this.setState({
                            C: e.target.value
                        })}
                    />
                    <input
                        // required
                        className="lefcik"
                        type="text"
                        placeholder="Przykładowa odpowiedź"
                        value={this.state.D}
                        onChange={e => this.setState({
                            D: e.target.value
                        })}
                    />
                    <input
                        // required
                        className="lefcik"
                        type="text"
                        placeholder="Poprawna odpowiedź"
                        value={this.state.Good}
                        onChange={e => this.setState({
                            Good: e.target.value
                        })}
                    />
                    <input
                        // required
                        className="lefcik"
                        type="number"
                        placeholder="Numer trasy.."
                        value={this.state.RouteId2}
                        onChange={e => this.setState({
                            RouteId2: e.target.value
                        })}
                    />
                    <button className="btn" onClick={() => this.appendQuestion(this.state.Quest, this.state.A, this.state.B, this.state.C, this.state.D, this.state.Good, this.state.RouteId2)}>Wyślij zagadkę</button>
                </form>}
                {this.state.isModalOpen &&
                    <div className="container">
                        <button className="closeButton" onClick={this.closeModal}></button>
                        <div className="title">Quiz</div>
                        {this.state.qBank.length > 0 &&
                            this.state.responses < 1 &&

                            this.state.qBank.map(
                                ({ question, answers, correct, id }) => (
                                    <QuestionBox key={id} question={question} options={answers} selected={answer => this.computeAnswer(answer, correct)} />
                                )
                            )}
                        {this.state.responses === 1 ? (<Result addItem2={this.addItem2} score={this.state.score} playAgain={this.playAgain} />) : null}
                    </div>}

                {this.state.isModalOpen2 &&
                    <div className="container">
                        <button className="closeButton" onClick={this.closeModal2}></button>
                        <div className="title">Wszystkie trasy</div>
                        <input
                            className="lefcik searching"
                            type="text"
                            placeholder="Szukaj.."
                            value={this.state.search}
                            onChange={e => this.setState({
                                search: e.target.value
                            })}

                        />

                        <ul>
                            {this.state.trasy2.map((historyRecord) => {
                                return <>
                                    <li style={{ cursor: 'pointer' }} onClick={() => this.myIp(historyRecord.Id)} key={historyRecord.Id}>{`Nazwa nr ${historyRecord.Id}: ${historyRecord.Name}`}</li><button onClick={() => this.gameIp(historyRecord.Id)} className="btn">Zagraj</button>

                                </>
                            })}

                        </ul>

                    </div>}

                {this.state.isModalRanking &&
                    <div className="container">
                        <button className="closeButton" onClick={this.closeModalRanking}></button>
                        <div className="title">Ranking Użytkowników</div>
                            {sorted.map((item, i)=>
                            <div key={i}>{i+1}. Użytkownik: {item.Email} Liczba punktów: {item.Punkty}</div>
                            )} 

                </div>}

                {this.state.isModalProfile &&
                    <div className="container">
                        <button className="closeButton" onClick={this.closeModalProfile}></button>
                        <div className="title">Profil</div>
                            <div >Email: {this.state.user.Email} </div>
                            <button onClick={() => this.changePasswordView(this.state.user.Id)} className="btn">Zmień hasło</button>
                </div>}

                {this.state.isModalChangePassword &&
                    <div className="container">
                        <button className="closeButton" onClick={this.closeModalChangePassword}></button>
                        <div className="title">Zmiana hasła</div>
                            <input className="lefcik" value={this.state.password} type="password" name="Password" placeholder="Nowe hasło" onChange={e => this.setState({
                                password: e.target.value
                            })}/>
                            <input className="lefcik" value={this.state.password2} type="password" name="ConfirmPassword" placeholder="Potwierdz hasło" onChange={e => this.setState({
                                password2: e.target.value
                            })} />
                        <button className="btn" onClick={() => this.changePassword(this.state.password, this.state.password2)}>Zmień hasło</button>
                </div>}

                {this.state.isModalOpen4 &&
                    <div className="container">
                        <button className="closeButton" onClick={this.closeModal4}></button>
                        <div className="title">Moje trasy</div>
                        <input
                            className="lefcik searching"
                            type="text"
                            placeholder="Szukaj.."
                            value={this.state.search}
                            onChange={e => this.setState({
                                search: e.target.value
                            })}

                        />

                        <ul>
                            {this.state.trasy.map((historyRecord, id) => {
                                return <>
                                    <li style={{ cursor: 'pointer' }} onClick={() => this.myIp2(historyRecord.Id)} key={historyRecord.Id}>{`Nazwa nr ${historyRecord.Id}: ${historyRecord.Name}`}</li><button onClick={() => this.deleteTask(historyRecord.Id)} className="btn">Usuń</button>

                                </>
                            })}

                        </ul>

                    </div>}


                {this.state.isModalOpen3 &&
                    <div className="container">
                        <button className="closeButton" onClick={this.closeModal3}></button>
                        <div className="title">Quiz</div>
                        {this.state.qBank.map(
                            ({ question, answers, correct, id }) => (
                                <QuestionBox key={id} question={question} options={answers} selected={Answers => this.computeAnswer(Answers, correct)} />

                            )
                        )}
                        {<Result addItem2={this.addItem2} score={this.state.score} playAgain={this.playAgain} />}
                    </div>}



            </>

        )

    }

}

export default Home;




