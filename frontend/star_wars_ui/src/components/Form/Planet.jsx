import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Planet = () => {
    const { planetid } = useParams();
    const baseurl = "http://localhost:3000/api";

    const [planetDetail, setPlanetDetail] = useState({
        name: "",
        terrain: "",
        population: ""
    })

    const [characterList, setCharacterList] = useState();
    const [filmList, setFilmList] = useState();

    useEffect(() => {
        console.log("render");
        fetchPlanetDetail();
    }, []); // 

    // fetch data
    async function fetchPlanetDetail() {
        const planeturl = `${baseurl}/planets/${planetid}`;
        console.log(planeturl);
        const planet = await fetch(planeturl)
            .then(res => res.json());

        console.log(planet);
        setPlanetDetail(planetDetail => ({
            ...planetDetail,
            name: planet.name,
            terrain: planet.terrain,
            population: planet.population
        }))

        fetchFilms();
        fetchcharacters();
    }

    async function fetchFilms() {
        const filmurl = `${baseurl}/planets/${planetid}/films`;
        const fetchFilmList = await fetch(filmurl).then(res => res.json())

        // fetchFilmList.map(film => { return `<li><Link to="/film/${film.id}">${film.title}</Link></li>`; })
        // fetchFilmList.map(film => {
        //     `<li><a href="/films/${film.id}">${film.name}</li>`
        // })
        setFilmList(fetchFilmList);
    }

    async function fetchcharacters() {
        const characterurl = `${baseurl}/planets/${planetid}/characters`;
        const fetchCharList = await fetch(characterurl).then(res => res.json());
        setCharacterList(fetchCharList);
    }


    return (
        <>
            <h1 id="name">{planetDetail.name}</h1>
            <section id="generalInfo">
                <p>Terrain: <span id="terrain">{planetDetail.terrain}</span></p>
                <p>Climate: <span id="climate">{planetDetail.population}</span></p>
                <p>Population: <span id="population">{planetDetail.population}</span> creatures</p>
            </section>

            <section id="characters">
                <h2>Characters appeared in</h2>
                <ul>
                    {/* {characterList?.map(character =>
                        <li><Link to={`api/characters/${character.id}`}>{character.name}</Link></li>
                    )} */}
                    {characterList?.map(character =>
                        <li key={character.id}><a onClick={() => window.location = `/character/${character?.id}`}>{character?.name}</a></li>
                    )}
                </ul>
            </section>

            <section id="films">
                <h2>Films appeared in</h2>
                <ul>
                    {filmList?.map(film =>
                        <li key={film.id}><a onClick={() => window.location = `/film/${film?.id}`}>{film?.title}</a></li>
                    )}
                </ul>
            </section>
        </>
    )
}

export default Planet;