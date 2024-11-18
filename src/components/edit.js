// Import necessary modules from React and react-router-dom
import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Define the Edit component
export default function Edit(props) {
  // Extract the `id` parameter from the URL using useParams
  let { id } = useParams();

  // Define state variables to hold movie details: title, year, and poster URL
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [poster, setPoster] = useState("");

  // useNavigate hook to programmatically navigate to another route
  const navigate = useNavigate();

  // useEffect hook to fetch movie details from the server when the component mounts
  useEffect(() => {
    // Make a GET request to fetch movie data by ID
    axios.get('http://localhost:4000/api/movie/' + id)
      .then((response) => {
        // Set the state variables with the fetched data
        setTitle(response.data.title);
        setYear(response.data.year);
        setPoster(response.data.poster);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]); 

  // Function to handle form submission
  const handleSubmit = (event) => {

    // Prevent the default form submission behavior
    event.preventDefault();

    // Create a newMovie object with the updated movie details
    const newMovie = { id, title, year, poster };

    // Make a PUT request to update the movie on the server
    axios.put('http://localhost:4000/api/movie/' + id, newMovie)
      .then((res) => {
     
        console.log(res.data);
        // Navigate to the "/read" route 
        navigate('/read');
      });
  }

  // Return the JSX to render the form for editing the movie
  return (
    <div>
      {/* Form to edit movie details */}
      <form onSubmit={handleSubmit}>
        {/* Input field for editing the movie title */}
        <div className="form-group">
          <label>Edit Movie Title: </label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Input field for editing the release year */}
        <div className="form-group">
          <label>Edit Release Year: </label>
          <input
            type="text"
            className="form-control"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        {/* Input field for editing the poster URL */}
        <div className="form-group">
          <label>Edit Poster URL: </label>
          <input
            type="text"
            className="form-control"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
          />
        </div>

        {/* Submit button to update the movie */}
        <div className="form-group">
          <input type="submit" value="Edit Movie" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
