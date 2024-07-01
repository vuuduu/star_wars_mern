import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [characters, setCharacters] = useState([]);
  const [matchingCharacters, setMatchingCharacters] = useState([]);

  useEffect(() => {
    getCharacters();
  }, []);

  async function getCharacters() {
    let url = 'http://localhost:3000/api/characters';
    let fetchedCharacters;

    try {
      fetchedCharacters = await fetch(url)
        .then(res => res.json())
      setCharacters(fetchedCharacters);
    }
    catch (ex) {
      console.error("Error reading characters.", ex.message);
    }
    renderCharacters(fetchedCharacters);
  }

  const filterCharacters = () => {
    const searchString = document.querySelector("#searchString").value;
    const re = new RegExp(searchString, "i");
    const matchingCharacters = characters.filter(character => re.test(character.name));
    setMatchingCharacters(matchingCharacters);
    renderCharacters(matchingCharacters);
  }

  const renderCharacters = characters => {
    const divs = characters.map(character => {
      const el = document.createElement('div');
      el.addEventListener('click', () => goToCharacterPage(character.id));
      el.textContent = character.name;
      return el;
    })
    charactersList.replaceChildren(...divs)
  }

  const goToCharacterPage = id => window.location = `/character.html?id=${id}`

  return (
    <>
      <div>
        <h1>Star Wars Universe Lookup</h1>
        <label htmlFor="searchString">Who you looking for? <span className="small">(Regular expressions are cool
            here)</span></label>
        <input id="searchString" onInput={filterCharacters} autoComplete="off" />
      </div>
      <section id="charactersList">
      </section>
    </>
  )
}

export default App
