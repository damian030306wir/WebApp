import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';


class Login extends Component {

    constructor() {
        super();

        this.state = {
            Username: '',
            Password: '',
            grant_type: 'password',
            redirectToReferrer: false
        };

        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);

    }



    login = () => {
        var details = {
            'Username': this.state.Username,
            'Password': this.state.Password,
            'grant_type': 'password'
        };

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('http://dearjean.ddns.net:44301' + '/Token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
            .then(res => res.json())
            .then(result => {

                let responseJson = result;
                if (responseJson.access_token) {

                    sessionStorage.setItem('access_token', responseJson.access_token)
                    this.setState({
                        redirectToReferrer: true
                    })
                } else {
                    alert("Błędne dane, proszę wpisać poprawne dane")
                }

                console.log(result)
            })

    }



    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }




    render() {

        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/home'} />)
        }

        if (sessionStorage.getItem('access_token')) {
            return (<Redirect to={'/home'} />)
        }

        return (
            // <div className="row" id="Body">
            //     <div className="medium-5 columns left">
            //         <h4>Zaloguj się</h4>
            //         <label>Nazwa użytkownika</label>
            //         <input className="lefcik" type="text" name="Username" placeholder="Nazwa użytkownika" onChange={this.onChange} />
            //         <label>Hasło</label>
            //         <input type="password" name="Password" placeholder="Hasło" onChange={this.onChange} />
            //         <input type="submit" className="button success" value="Zaloguj się" onClick={this.login} />
            //         <a href="/signup">Rejestracja</a>
            //     </div>
            // </div>
            <div className="Body">
                <div className="login-box">
                    <h1>Zaloguj się</h1>
                    <div className="textbox">
                        <i className="fas fa-user"></i>
                        <input type="text" name="Username" placeholder="Nazwa użytkownika" onChange={this.onChange} />
                    </div>
                    <div className="textbox">
                        <i className="fas fa-lock"></i>
                        <input type="password" name="Password" placeholder="Hasło" onChange={this.onChange} />
                    </div>
                    <input type="submit" className="btn2" value="Zaloguj się" onClick={this.login} />
                    <a href="/signup" className="btn2">Rejestracja</a>
                </div>
            </div>






        );
    }
}

export default Login;