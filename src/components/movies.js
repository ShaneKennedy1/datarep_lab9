// Import the MovieItem component to be used in the Movies component
import MovieItem from "./movieitem";

// Define the Movies component, which receives props as a parameter
const Movies = (props) => {
    // Return the mapped list of movies
    return props.myMovies.map(
        (movie) => {
            // For each movie, return a MovieItem component          
            return <MovieItem mymovie={movie} key={movie._id} Reload={props.ReloadData} />;
        }
    );
}

// Export the Movies component to be used in other parts of the application
export default Movies;
