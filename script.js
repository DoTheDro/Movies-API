const searchBar = document.querySelector(".searchBar");
let searchMovieTitle = "";
const row = document.querySelector(".movie-row");
const column = document.querySelectorAll(".movie-column");

document.querySelector("form").addEventListener("submit", (e) => {

    //form submitted
    e.preventDefault();
    searchMovieTitle = searchBar.value;
    searchBar.value = "";
    const API = `http://www.omdbapi.com/?s=${searchMovieTitle}&page=1&apikey=9f74012b`;
    fetchMovie(API);
})

const renderMovie = (movies) => {
    const movieResults = [];

    //only accept movies with poster
    const filteredMovies = movies.filter(movie => {
        return movie.Poster.length > 3;
    })

    filteredMovies.forEach(movie => {
        movieResults.push(movie);
    })

    for (let i = 0; i < movieResults.length; i++) {
        //create element for contents
        const moviePoster = document.createElement("img");
        const movieTitle = document.createElement("h2");
        const movieYear = document.createElement("p");

        //assign movie contents
        movieTitle.textContent = movieResults[i].Title;
        movieYear.textContent = movieResults[i].Year;

        moviePoster.setAttribute("src", `${movieResults[i].Poster}`)

        if (column[i].children.length === 3) {
            column[i].replaceChildren(moviePoster, movieTitle, movieYear);
        }

        column[i].appendChild(moviePoster);
        column[i].appendChild(movieTitle);
        column[i].appendChild(movieYear);
        
    }

}

const fetchMovie = (API) => {
    
    //fetch the URL
    fetch(API).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            console.warn("Failed To Fetch API");
        }
    }).then(datas => {
        renderMovie(datas.Search);
    })
}