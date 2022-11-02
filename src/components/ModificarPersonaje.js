/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import { Navigate } from 'react-router-dom';

class ModificarPersonaje extends Component {
    selectSeries = React.createRef();
    selectPersonajes = React.createRef();

    state = {
        series : [],
        personajes : [],
        statusSeries : false,
        statusPersonajes : false,
        serieActual : {},
        personajeActual : {},
        statusSerieActual : false,
        statusPersonajeActual : false,
        modificacionCompletada : false
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

    generarPersonajes = () => {
        var url = Global.urlSeries + "/api/personajes";
        axios.get(url).then(response => {
            this.setState({
                personajes : response.data,
                statusPersonajes : true
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

    getCurrentPersonajeID = () => {
        var optionsPersonaje = this.selectPersonajes.current.options; 
        var selectIdPersonaje = ""; 
        for (var optPersonaje of optionsPersonaje) {
            if (optPersonaje.selected === true) {
                selectIdPersonaje = optPersonaje.value;
            }
        }
        return selectIdPersonaje;
    }

    modificarPersonajes = (e) => {
        e.preventDefault();

        var selectIdSerie = this.getCurrentSerieID(), 
        selectIdPersonaje = this.getCurrentPersonajeID();
        
        var url = Global.urlSeries + "/api/Personajes/" + selectIdPersonaje + "/" + selectIdSerie;
        axios.put(url).then(response => {
            this.setState({
                modificacionCompletada : true
            });
        });
    }

    mostrarSerie = () => {
        var url = Global.urlSeries + "/api/Series/" + this.getCurrentSerieID();
        axios.get(url).then(response => {
            this.setState({
                serieActual : response.data,
                statusSerieActual : true
            });
        });
    }

    mostrarPersonaje = () => {
        var url = Global.urlSeries + "/api/Personajes/" + this.getCurrentPersonajeID();
        axios.get(url).then(response => {
            this.setState({
                personajeActual : response.data,
                statusPersonajeActual : true
            });
        });
    }

    componentDidMount = () => {
        this.generarSeries();
        this.generarPersonajes();
    }

    render() {
        if (this.state.modificacionCompletada === true) {
            return (<Navigate to={"/personajes/" + this.getCurrentSerieID()}/>)
        }
        return (
            <div>
                <h1 className='pb-2 pt-1 text-bg-dark'>Personajes y Series</h1>
                <form onSubmit={this.modificarPersonajes} className='w-75 mx-auto mt-2'>
                    <label>Seleccione una serie:</label>
                    <select ref={this.selectSeries} className='form-control' required onChange={this.mostrarSerie}>
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

                    <label>Seleccione un Personaje:</label>
                    <select ref={this.selectPersonajes} className='form-control' required onChange={this.mostrarPersonaje}>
                        {
                            this.state.statusPersonajes === true && (
                                this.state.personajes.map((personaje, index) => {
                                    return(
                                        <option key={personaje.idPersonaje} value={personaje.idPersonaje}>
                                            {personaje.nombre}
                                        </option>
                                    );
                                })
                            )
                        }
                    </select>
                    
                    <button className='btn btn-primary my-2'>
                        Guardar cambios
                    </button>
                </form>
                {
                    this.state.statusSerieActual === true && (
                        <div>
                            <h1 className='text-danger'>
                                { this.state.serieActual.nombre }
                            </h1>
                            <img src={this.state.serieActual.imagen} className="w-50" style={{maxHeight:"35vh"}}/>
                        </div>
                    )
                }
                {
                    this.state.statusPersonajeActual === true && (
                        <div>
                            <h1 className='text-danger'>
                                { this.state.personajeActual.nombre }
                            </h1>
                            <img src={this.state.personajeActual.imagen} className="w-50" style={{maxHeight:"35vh"}}/>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default ModificarPersonaje;