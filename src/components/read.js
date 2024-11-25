import axios from "axios";
import { useState, useEffect } from "react";
import Movies from "./movies";

function Read() {
    const [data, setData] = useState([]);

    const Reload = () => {
        console.log("Reloading movie data...");
        axios.get('http://localhost:4000/api/movies')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error reloading data:", error);
            });
    };

    useEffect(() => {
        Reload();
    }, []);

    return (
        <div>
            <h2>Movie List</h2>
            <Movies myMovies={data} ReloadData={Reload} />
        </div>
    );
}

export default Read;