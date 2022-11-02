/* eslint-disable jsx-a11y/alt-text */

import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import { NavLink } from 'react-router-dom';

class Personajes extends Component {

    state = {
        personajes : [],
        statusGet : false 
    }

    loadPersonajes = () => {
        var url = Global.urlSeries + '/api/Series/PersonajesSerie/' + this.props.idserie;
        axios.get(url).then(response => {
            this.setState({
                personajes : response.data,
                statusGet : true
            });
        });
    }

    componentDidMount = () => {
        this.loadPersonajes();
    }

    render() {
        return (
            <div className='w-75 mx-auto mt-2'>
                <NavLink className='btn btn-danger mb-2' 
                         to={'/serie/' + this.props.idserie}>
                    Volver
                </NavLink> 
                <div>
                    <table className='table table-bordered table-dark align-middle'>
                        <thead>
                            <tr>
                                <th>Personaje</th>
                                <th>Serie</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.statusGet === true && (
                                    this.state.personajes.map((personaje, index) => {
                                        return (
                                            <tr key={personaje.idPersonaje}>
                                                <td>{personaje.nombre}</td>
                                                <td>
                                                    <img src={personaje.imagen}
                                                            style={{maxHeight:"80px"}}/>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Personajes;