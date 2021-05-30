import './App.css';
import React, { Component } from "react";
import ProposeChannels from "./components/ProposeChannels"
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
          <p>Envianos los canales que te gustaría ver en el server, tanto de tus intereses como los que creas que sean útiles para la comunidad.<br/>
          Os recordamos que la idea principal detrás de los canales pueden albergar estos puntos:</p>
          <ul>
            <li>Ayudar a las personas con recomendaciones</li>
            <li>Compartir recursos y noticias sobre la temática de la technología</li>
            <li>Tener un espacio para la charla y cosas off-topic</li>
          </ul>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/">
              <ProposeChannels />
            </Route>
            {/* <Route path="/check">
              <ViewChannels />
            </Route> */}
          </Switch>
        </div>
      </Router>
    );
  }

}

export default App;