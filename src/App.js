import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import { Route, BrowserRouter } from 'react-router-dom';
import {PrivateRoute} from './Components/PrivateRoute/PrivateRoute'
import Switch from 'react-bootstrap/esm/Switch';
import Login from './pages/login/login';
import Salas from './pages/salas/Salas';
import JogoVelha from './pages/jogo/jogovelha';

function App() {
  return (
      <BrowserRouter basename="/" >
          <Switch>
              <Route exact path="/" component={props => <Login {...props}></Login>} />
              <Route exact path="/salas" component={props => <Salas {...props}></Salas>} />
              <Route exact path="/jogo/:id" component={props => <JogoVelha {...props}></JogoVelha>} />              
              <PrivateRoute exact path="/indicadores" permissao={"Gerencial:Geral"} component={props => <Login {...props}></Login>} />
          </Switch>
      </BrowserRouter>
  );
}

export default App;
