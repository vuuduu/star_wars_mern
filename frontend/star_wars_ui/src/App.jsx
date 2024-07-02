import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Form/Home';
import Character from './components/Form/Character';
import Planet from './components/Form/Planet';
import Film from './components/Form/Film';
import NoPage from './components/Form/NoPage';

import './App.css'

function App() {

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/character/:characterid" element={<Character />}></Route>
            <Route path="/planet/:planetid" element={<Planet />}></Route>
            <Route path="/film/:filmid" element={<Film />}></Route>
            <Route path="*" element={<NoPage />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App;