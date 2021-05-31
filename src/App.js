import './App.css';
import React, { Component } from "react";
import ProposeChannels from "./components/ProposeChannels"
import ViewChannels from "./components/ViewChannels"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends Component {

  render () {
    return (
      <Router>
        <div className="App">
          <h4>Propon canales para el server</h4>
          <p>Aqui te dejamos un herramienta para que puedas enviar una propuesta de canales que te gustaría ver en el server, tanto de tus intereses como los que creas que sean útiles para la comunidad.<br/>
          Os recordamos que la idea principal del server apunta hacía estos puntos:</p>
          <ul>
            <li>Ayudar a las personas en el sector de la informática, tecnología, etc... </li>
            <li>Compartir recursos y noticias sobre la temática de la tecnología</li>
            <li>Tener un espacio social para charla y cosas off-topic</li>
          </ul>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/check">
              <ViewChannels />
            </Route>
            <Route path="/">
              <ProposeChannels />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }

}

export default App;