/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import { NavLink } from 'react-router-dom';

class Serie extends Component {
    state = {
        serie : {},
        statusGet : false
    }

    loadSeries = () => {
        var url = Global.urlSeries + '/api/series/' + this.props.idserie;
        axios.get(url).then(response => {
            this.setState({
                serie : response.data,
                statusGet : true
            })
        });
    }

    componentDidMount = () => {
        this.loadSeries();
    }

    componentDidUpdate = (oldProps) => {
        if (oldProps.idserie !== this.props.idSerie) {
            this.loadSeries();
        }
    }

    render() {
        if (this.state.statusGet === true) {
            return (
                <div className='w-75 mx-auto my-2 border rounded text-center'>
                    <img src={this.state.serie.imagen} className='my-3' style={{maxHeight:"40vh",maxWidth:"90%"}}/>
                    <h2> {this.state.serie.nombre} </h2>
                    <p className='my-3'> 
                        IMDB: {this.state.serie.puntuacion} 
                    </p>
                    <NavLink className='btn btn-success mb-3' to={'/personajes/' + this.state.serie.idSerie}>
                        Personajes
                    </NavLink>
                </div>
            )            
        } else {
            return (<h1 className='my-2'>La página está cargando...</h1>)
        }
    }
}

export default Serie;