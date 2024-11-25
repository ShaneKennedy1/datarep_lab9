import { useEffect } from "react";

// Import the Card and Button components from React-Bootstrap for styling
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// Import the Link component from React Router for navigation
import { Link } from "react-router-dom";

// Import axios for making HTTP requests
import axios from "axios";

// Define the MovieItem component that receives props as its parameter
const MovieItem = (props) => {

  // Function to handle the deletion of a movie
  const handleDelete = (e) => {
    e.preventDefault(); 
    // Make a DELETE request to the server to remove the movie
    axios.delete('http://localhost:4000/api/movie/' + props.mymovie._id)
        .then(() => {
            // Call the Reload function passed via props to refresh the movie list
            props.Reload();
        })
        .catch((error) => {
            // Log any errors that occur during the deletion process
            console.error("Error deleting movie:", error);
        });
  };

  // Use the useEffect hook to log the movie data when the component mounts
  useEffect(() => {
    console.log("Movie Item:", props.mymovie); // Log the current movie's details
  }, [props.mymovie]); // Dependency array ensures this runs only when `mymovie` changes

  // Render the movie item as a Bootstrap Card
  return (
    <div>
      {/* Display a Bootstrap Card for the movie */}
      <Card>
        {/* Display the movie's title in the card header */}
        <Card.Header>{props.mymovie.title}</Card.Header>
        <Card.Body>
          {/* Display the movie's poster and year in the card body */}
          <blockquote className="blockquote mb-0">
            <img src={props.mymovie.poster} alt={props.mymovie.title} /> {/* Movie poster */}
            <footer>{props.mymovie.year}</footer> {/* Movie year */}
          </blockquote>
        </Card.Body>
        {/* Link to the edit page for updating the movie */}
        <Link className="btn btn-primary" to={"/edit/" + props.mymovie._id}>Update</Link>
        {/* Button to delete the movie */}
        <Button className="btn btn-danger" onClick={handleDelete}>Delete</Button>
      </Card>
    </div>
  );
}

// Export the MovieItem component for use in other parts of the application
export default MovieItem;
