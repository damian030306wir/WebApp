import React, { Component } from 'react';
import './Welcome.css';


class Welcome extends Component {
    render() {
        return (


            <header>
                <div className="wrap">
                    <div className="logo">
                        <img src="" alt="" />
                    </div>
                    <ul className="nav-area">
                        <li><a href="/login" className="button3">Zaloguj się</a></li>
                        <li><a href="/signup" className="button3">Rejestracja</a></li>
                    </ul>

                    <h1 className="visitare">Visitare</h1>

                </div>


            </header>
        );
    }
}

export default Welcome;