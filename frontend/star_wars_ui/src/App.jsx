import './App.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/Form/Home';
import Character from './components/Form/Character';
import Planet from './components/Form/Planet';
import Film from './components/Form/Film';

function App() {

  return (
    <>
      <Router>
        <div>
          <Switch>
            <Route path="/" exact><Home /></Route>
            <Route path="/character/:characterid"><Character /></Route>
            <Route path="/planet/:planetid"><Planet /></Route>
            <Route path="/film/:filmid"><Film /></Route>
          </Switch>
        </div>
      </Router>
    </>
  )
}

export default App;
