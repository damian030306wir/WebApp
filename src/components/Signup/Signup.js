import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {

            Password: '',
            Email: '',
            ConfirmPassword: '',
            redirectToReferrer: false
        };

        this.signup = this.signup.bind(this);
        this.onChange = this.onChange.bind(this);

    }


    signup = () => {
        const newItem = {
            "Email": this.state.Email,
            "Password": this.state.Password,
            "ConfirmPassword": this.state.ConfirmPassword
        }
        if (this.state.Email && this.state.Password && this.state.ConfirmPassword) {
            if (this.state.Password === this.state.ConfirmPassword) {
                fetch("http://dearjean.ddns.net:44301/api/Account/Register", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newItem)
                })
                    .then(res => res.text())
                    .then(res => {
                        console.log(res);
                    })
            } else alert("Hasło do siebie nie pasuja, spróbuj ponownie")
        } else (alert("Błędne dane"))

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        if (this.state.redirectToReferrer || sessionStorage.getItem('newItem')) {
            return (<Redirect to={'/home'} />)
        }
        return (

            // <div className="row " id="Body">
            //     <div className="medium-5 columns left">
            //         <h4>Rejestracja</h4>
            //         <label>Email</label>
            //         <input type="text" name="Email" placeholder="Email" onChange={this.onChange} />

            //         <label>Hasło</label>
            //         <input type="password" name="Password" placeholder="Hasło" onChange={this.onChange} />
            //         <label>Powtórz hasło</label>
            //         <input type="password" name="ConfirmPassword" placeholder="Potwierdz hasło" onChange={this.onChange} />
            //         <input type="submit" className="button" value="Zarejestruj się" onClick={this.signup} />
            //         <a href="/login">Zaloguj się</a>
            //     </div>
            // </div>


            <div className="Body">
                <div className="login-box">
                    <h1>Rejestracja</h1>
                    <div class="textbox">
                        <i class="fas fa-user"></i>
                        <input type="text" name="Email" placeholder="Email" onChange={this.onChange} />
                    </div>
                    <div class="textbox">
                        <i class="fas fa-lock"></i>
                        <input type="password" name="Password" placeholder="Hasło" onChange={this.onChange} />
                    </div>
                    <div class="textbox">
                        <i class="fas fa-lock"></i>
                        <input type="password" name="ConfirmPassword" placeholder="Potwierdz hasło" onChange={this.onChange} />
                    </div>
                    <input type="submit" className="btn2" value="Zarejestruj się" onClick={this.signup} />
                    <a href="/login" className="btn2">Zaloguj się</a>
                </div>
            </div>
        );
    }
}

export default Signup;