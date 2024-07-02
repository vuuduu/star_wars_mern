import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';

const Film = () => {
    const { filmid } = useParams();
    const [film, setFilm] = useState();
    const [characters, setCharacters] = useState();
    const [planets, setPlanets] = useState();

    useEffect(() => {
        async function fetchData() {
            // TODO: Abstract base URI to .env
            // Can optimize using Promise.all
            const film = await fetch(`http://localhost:3000/api/films/${filmid}`).then(res => res.json());
            const characters = await fetch(`http://localhost:3000/api/films/${filmid}/characters`).then(res => res.json());
            const planets = await fetch(`http://localhost:3000/api/films/${filmid}/planets`).then(res => res.json());
            setFilm(film);
            setCharacters(characters);
            setPlanets(planets);
        }
        fetchData();
    }, []);

    return (
        <main>
            <h1 id="title">{film?.title}</h1>
            <section id="generalInfo">
                <p>Episode: <span id="episode">{film?.episode}</span></p>
                <p>Release Date: <span id="releaseDate">{film?.release_date}</span></p>
                <p>Director: <span id="director">{film?.director}</span></p>
                <p>Producer: <span id="producer">{film?.producer}</span></p>
                <p>Opening Crawl: <span id="openingCrawl">{film?.opening_crawl}</span></p>
            </section>
            <section id="characters">
                <h2>Characters in Film</h2>
                <ul>
                    {characters?.map((character) =>
                        <li><a onClick={() => window.location = `/character/${character?.id}`}>{character.name}</a></li>
                    )}
                </ul>
            </section>
            <section id="planets">
                <h2>Planets in Film</h2>
                <ul>
                    {planets?.map((planet) =>
                        <li><a onClick={() => window.location = `/planet/${planet?.id}`}>{planet?.name}</a></li>
                    )}
                </ul>
            </section>
        </main>
    )
}

export default Film;