// Import the necessary packages
const express = require('express'); 
const app = express(); 
const port = 4000; // Define the port to run the server

// Import CORS to enable cross-origin requests
const cors = require('cors'); 
app.use(cors()); 

// Set headers to handle CORS and preflight requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next(); 
});

// Import body-parser to parse incoming request bodies
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(bodyParser.json()); // Parse JSON data

// Import mongoose to interact with MongoDB
const mongoose = require('mongoose');
// Connect to your MongoDB Atlas database using mongoose
mongoose.connect('mongodb+srv://g00393988:admin@yours.hfgz6.mongodb.net/');

// Define a schema for movies
const movieSchema = new mongoose.Schema({
  title: String, 
  year: String,  
  poster: String 
});

// Create a model from the schema
const movieModel = mongoose.model('myMovies', movieSchema);

// Handle GET requests to fetch a list of movies
app.get('/api/movies', (req, res) => {
   const movies = [ 
        {
          "Title": "Avengers: Infinity War (server)",
          "Year": "2018",
          "imdbID": "tt4154756",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
        },
        {
          "Title": "Captain America: Civil War (server)",
          "Year": "2016",
          "imdbID": "tt3498820",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
        },
        {
          "Title": "World War Z (server)",
          "Year": "2013",
          "imdbID": "tt0816711",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
        }
     ];

   // Send back the sample movie data as a JSON response
   res.status(200).json({ movies });
});

// Handle POST requests to add a new movie
app.post('/api/movies', async (req, res) => {
    console.log("Movie added: " + req.body.title); 

    const { title, year, poster } = req.body; 
    const newMovie = new movieModel({ title, year, poster }); // Create a new movie document
    newMovie.save(); 
    res.send("Movie Added!"); // Send a response
});

// Handle GET requests to fetch all movies from the database
app.get('/api/movies', async (req, res) => {
  const movies = await movieModel.find({}); 
  res.json(movies); 
});

// Handle GET requests to fetch a single movie by its ID
app.get('/api/movie/:id', async (req, res) => {
  const movie = await movieModel.findById(req.params.id); 
  res.send(movie); 
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); 
});
