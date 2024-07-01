import { useState } from 'react'
import './App.css'

function App() {

  const baseApiUrl = 'http://localhost:3000/'
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [mass, setMass] = useState("");
  const [height, setHeight] = useState("");
  const [homeWorld, setHomeworld] = useState("");
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getCharacter(id)
  }, []);

  async function fetchFilm(id) {
    let filmUrl = `${baseUrl}/films/${id}`;
    const filmResponse = await fetch(filmUrl).then(res => res.json())
    .then(responseJson => {
      localStorage.setItem(`film${responseJson.id}`, JSON.stringify(responseJson));
      return responseJson;
    });

    return filmResponse;
  }

  async function getCharacter(id) {
    // Try grabbing current character from browser cache
    var character = await fetch(baseApiUrl + `/characters/${id}`);

    renderCharacter(character);
    
    // Asynchronously preload content for all the links on the page
    
  }
  async function fetchCharacter(id) {
    let characterUrl = `${baseUrl}/characters/${id}`;
    return await fetch(characterUrl)
      .then(res => res.json())
  }

  async function fetchHomeworld(character) {
    const homeworldId = character?.homeworld;
    var planet = localStorage.getItem(`planet${homeworldId}`);

    if (!planet) {
      const url = `${baseUrl}/planets/${homeworldId}`;
      const planet = await fetch(url)
        .then(res => res.json());
      localStorage.setItem(`planet${homeworldId}`, JSON.stringify(planet));
    }
    
    return `planet${homeworldId}`;
  }

  async function fetchFilms(character) {
    const url = `${baseUrl}/characters/${character?.id}/films`;
    var filmKeyList = [];
    const films = await fetch(url)
      .then(res => res.json())
      .then(filmList => filmList.forEach(film => {
        var currFilm = localStorage.getItem(`film${film.id}`);

        if (!currFilm) {
          fetchFilm(film.id);
        }

        filmKeyList.push(`film${film.id}`);
      }))
    return filmKeyList;
  }

  const renderCharacter = character => {
    document.title = `SWAPI - ${character?.name}`;  // Just to make the browser tab say their name
    nameH1.textContent = character?.name;
    heightSpan.textContent = character?.height;
    massSpan.textContent = character?.mass;
    birthYearSpan.textContent = character?.birth_year;
    // Grabs homeworldObject from local storage
    const homeworldObject = JSON.parse(localStorage.getItem(character?.homeworld));
    homeworldSpan.innerHTML = `<a href="/planet.html?id=${homeworldObject.id}">${homeworldObject.name}</a>`;
    const filmsList = character?.films?.map(filmKey => {
      const filmObject = JSON.parse(localStorage.getItem(filmKey));
      console.log(filmObject);
      return `<li><a href="/film.html?id=${filmObject.id}">${filmObject.title}</li>`;
    })
    filmsUl.innerHTML = filmsList.join("");
  }


  return (
    <>
      <h1 id="name"></h1>
      <section id="generalInfo">
        <p>Height: <span id="height"></span> cm</p>
        <p>Mass: <span id="mass"></span> kg</p>
        <p>Born: <span id="birth_year"></span></p>
      </section>
      <section id="planets">
        <h2>Homeworld</h2>
        <p><span id="homeworld"></span></p>
      </section>
      <section id="films">
        <h2>Films appeared in</h2>
        <ul></ul>
      </section>
    </>
  )
}

export default App
