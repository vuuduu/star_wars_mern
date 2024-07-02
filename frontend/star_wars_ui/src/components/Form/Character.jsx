import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';

const Character = () => {
    const { characterid } = useParams();
    const [character, setCharacter] = useState();
    const [homeworld, setHomeworld] = useState();
    const [films, setFilms] = useState();

    useEffect(() => {
        async function fetchData() {
            // TODO: Abstract base URI to .env
            // Can optimize using Promise.all
            const character = await fetch(`http://localhost:3000/api/characters/${characterid}`).then(res => res.json());
            const homeworld = await fetch(`http://localhost:3000/api/characters/${characterid}/planet`).then(res => res.json());
            const films = await fetch(`http://localhost:3000/api/characters/${characterid}/films`).then(res => res.json());
            setCharacter(character);
            setHomeworld(homeworld);
            setFilms(films);
        }
        fetchData();
    }, []);

    return (
        <main>
            <h1 id="name">{character?.name}</h1>
            <section id="generalInfo">
                <p>Height: <span id="height">{character?.height}</span> cm</p>
                <p>Mass: <span id="mass">{character?.mass}</span> kg</p>
                <p>Born: <span id="birth_year">{character?.birth_year}</span></p>
            </section>
            <section id="planets">
                <h2>Homeworld</h2>
                <p><span id="homeworld"><a onClick={() => window.location = `/planet/${homeworld?.id}`}>{homeworld?.name}</a></span></p>
            </section>
            <section id="films">
                <h2>Films appeared in</h2>
                <ul>
                    {films?.map((film) =>
                        <li><a onClick={() => window.location = `/film/${film?.id}`}>{film?.title}</a></li>
                    )}
                </ul>
            </section>
        </main>
    )
}

export default Character;