const searchBar = document.querySelector(".searchBar");
let searchMovieTitle = "";
const row = document.querySelector(".movie-row");

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

        //create element for contents
        const movieColumn = document.createElement("div");
        const moviePoster = document.createElement("img");
        const movieTitle = document.createElement("h2");
        const movieYear = document.createElement("p");

        //assign movie contents
        movieTitle.textContent = movie.Title;
        movieYear.textContent = movie.Year;

        //setting attributes
        moviePoster.setAttribute("src", `${movie.Poster}`);
        movieColumn.setAttribute("class", "col-md-3 movie-column");

        movieColumn.appendChild(moviePoster);
        movieColumn.appendChild(movieTitle);
        movieColumn.appendChild(movieYear);
        movieResults.push(movieColumn);
    })

    if (row.children.length === 0) {

        movieResults.forEach(result => {
            row.appendChild(result);
        })

    } else {

        row.replaceChildren();
        movieResults.forEach(result => {
            row.appendChild(result);
        })

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