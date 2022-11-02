/* eslint-disable no-unused-vars */

import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import { Navigate } from 'react-router-dom';

class NuevoPersonaje extends Component {
    cajaNombre = React.createRef();
    cajaImagen = React.createRef();
    selectSeries = React.createRef();

    state = {
        series : [],
        statusSeries : false,
        statusInsertado : false
    }

    generarSeries = () => {
        var url = Global.urlSeries + "/api/series";
        axios.get(url).then(response => {
            this.setState({
                series : response.data,
                statusSeries : true
            });
        });
    }

    insertarPersonaje = (e) => {
        e.preventDefault();

        var nombre = this.cajaNombre.current.value;
        var imagen = this.cajaImagen.current.value;

        var url = Global.urlSeries + "/api/Personajes";
        var miPersonaje = {
            idPersonaje : 0,
            nombre : nombre,
            imagen : imagen,
            idSerie : parseInt(this.getCurrentSerieID())
        }
        axios.post(url, miPersonaje).then(response => {
            this.setState({
                statusInsertado : true
            });
        });
    }

    getCurrentSerieID = () => {
        var optionsSerie = this.selectSeries.current.options;
        var selectIdSerie = ""; 
        for (var optSerie of optionsSerie) {
            if (optSerie.selected === true) {
                selectIdSerie = optSerie.value;
            }
        }
        return selectIdSerie;
    }

    componentDidMount = () => {
        this.generarSeries();
    }

    render() {
        if (this.state.statusInsertado === true) {
            return (<Navigate to={"/personajes/" + this.getCurrentSerieID()}/>)
        }
        return (
            <div>
                <h1 className='pb-2 pt-1 text-bg-dark'>Nuevo Personaje</h1>
                <form className='w-75 mx-auto mt-2'>
                    <label className='form-label'>Nombre:</label>
                    <input type='text' required className='form-control' ref={this.cajaNombre}/>

                    <label className='form-label mt-2'>Imagen:</label>
                    <input type='text' required className='form-control' ref={this.cajaImagen}/>

                    <label className='form-label mt-2'>Serie:</label>
                    <select ref={this.selectSeries} className='form-control' required>
                        {
                            this.state.statusSeries === true && (
                                this.state.series.map((serie, index) => {
                                    return(
                                        <option key={serie.idSerie} value={serie.idSerie}>
                                            {serie.nombre}
                                        </option>
                                    );
                                })
                            )
                        }
                    </select>

                    <button className='btn btn-success my-3' onClick={this.insertarPersonaje}>
                        Insertar Personaje
                    </button>
                </form>
            </div>
        )
    }
}

export default NuevoPersonaje;