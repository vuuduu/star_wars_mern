import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Character = () => {
    const { characterid } = useParams();

    return (
        <h1>Characters id: {characterid}</h1>
    )
}

export default Character;