import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [characters, setCharacters] = useState([]);
    const [charactersList, setCharactersList] = useState([]);

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

        renderCharacters(matchingCharacters);
    }

    const renderCharacters = async characters => {
        const characterDivs = await Promise.all(characters.map(character =>
            <div key={character.id}><Link to={`/character/${character.id}`}>{character.name}</Link></div>
        ));
        setCharactersList(characterDivs);
    }

    return (
        <>
            <div>
                <h1>Star Wars Universe Lookup</h1>
                <label htmlFor="searchString">Who you looking for? <span className="small">(Regular expressions are cool
                    here)</span></label>
                <input id="searchString" onInput={filterCharacters} autoComplete="off" />
            </div>
            <section id="charactersList">
                {charactersList}
            </section>
        </>
    )
}

export default Home;