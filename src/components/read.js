import axios from "axios";
import { useState, useEffect } from "react";

// Import the Movies component to display the list of movies
import Movies from "./movies";

// Define the Read component
function Read() {
    // Declare a state variable 'data' to store the movie data and a function 'setData' to update it
    const [data, setData] = useState([]);

    // Define a function 'Reload' to fetch movie data from the server
    const Reload = () => {
        console.log("Reloading movie data..."); 
        axios.get('http://localhost:4000/api/movies')
            .then((response) => {
                // On success, update the 'data' state with the response data
                setData(response.data);
            })
            .catch((error) => {
                // Log any errors that occur during the request
                console.error("Error reloading data:", error);
            });
    };

    // Use the useEffect hook to call the Reload function when the component mounts
    useEffect(() => {
        Reload(); 
    }, []); 

    // Render the component
    return (
        <div>
            
            <h2>Movie List</h2>
            {/* Pass the fetched movie data and Reload function to the Movies component */}
            <Movies myMovies={data} ReloadData={Reload} />
        </div>
    );
}

// Export the Read component to be used in other parts of the application
export default Read;
