/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Menu from './Menu';
import Home from './Home';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Serie from './Serie';
import Personajes from './Personajes';
import ModificarPersonaje from './ModificarPersonaje';
import NuevoPersonaje from './NuevoPersonaje';

class Router extends Component {
    render() {
        
        function SerieElement() {
            var { idserie } = useParams();
            return (
                <Serie idserie = {idserie}/>
            );
        }

        function PersonajesElement() {
            var { idserie } = useParams();
            return (
                <Personajes idserie = {idserie}/>
            );
        }

        return (
            <BrowserRouter>
                <Menu/>
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/serie/:idserie' element={<SerieElement />}/>
                    <Route path='/personajes/:idserie' element={<PersonajesElement />}/>
                    <Route path='/modificarpersonajes' element={<ModificarPersonaje />}/>
                    <Route path='/nuevopersonaje' element={<NuevoPersonaje />}/>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default Router;