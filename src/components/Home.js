/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import logoSerie from '../assets/images/series-tv.jpg';

class Home extends Component {
    render() {
        return (
            <div>
                <img src={logoSerie} className="mx-auto" style={{maxHeight:"70vh", maxWidth:"80vw"}}/>
            </div>
        )
    }
}

export default Home;