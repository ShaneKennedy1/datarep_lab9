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

// Define a route to handle GET requests for a specific movie by its ID
app.get('/api/movie/:id', async (req, res) => {
  // Fetch the movie with the specified ID from the database
  let movie = await movieModel.findById({ _id: req.params.id });
  res.send(movie);
});

// Define a route to handle PUT requests to update a movie by its ID
app.put('/api/movie/:id', async (req, res) => {
  // Find the movie by its ID and update it with the data from the request body
  let movie = await movieModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(movie);
});

// Define a route to handle DELETE requests to remove a movie by its ID
app.delete('/api/movie/:id', async (req, res) => {
  console.log('Deleting movie with ID:', req.params.id);
  const movie = await movieModel.findByIdAndDelete(req.params.id);

  // Respond with a success message and details of the deleted movie
  res.status(200).send({ message: "Movie deleted successfully", movie });
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
