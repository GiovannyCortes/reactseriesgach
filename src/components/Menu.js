/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import Global from '../Global';
import logoMenu from '../assets/images/menulogo.png';

class Menu extends Component {
    state = {
        series : [],
        statusGet : false
    }

    loadSeries = () => {
        var url = Global.urlSeries + '/api/series';
        axios.get(url).then(response => {
            this.setState({
                series : response.data,
                statusGet : true
            })
        });
    }

    componentDidMount = () => {
        this.loadSeries();
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to='/'>
                        <img src={logoMenu} style={{maxHeight:"40px"}}/> &nbsp;
                    </NavLink>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to="/nuevopersonaje">Nuevo Personaje</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to="/modificarpersonajes">Modificar Personajes</NavLink>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Series
                            </a>
                            <ul className="dropdown-menu">
                                {/* <li><a className="dropdown-item" href="#">Action</a></li> Esto es lo que queremos generar dinámicamente */}
                                {
                                    (this.state.statusGet === true) && (
                                        this.state.series.map((serie, index) => {
                                            return (
                                                <li key={serie.idSerie}>
                                                    <NavLink className="dropdown-item" to={'/serie/' + serie.idSerie}>
                                                        {serie.nombre}
                                                    </NavLink>
                                                </li>
                                            );
                                        })
                                    )
                                }
                            </ul>
                        </li>

                        </ul>
                    </div>
                </div>
                </nav>
            </div>
        )
    }
}

export default Menu;