const searchBar = document.querySelector(".searchBar");
let searchMovieTitle = "";
const APIKey = "9f74012b";
const row = document.querySelector(".movie-row");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const viewMode = document.querySelector("#view-mode");

viewMode.addEventListener("click", () => {

    if (viewMode.getAttribute("class") == "lightMode-toggled") {
        document.querySelector("header").setAttribute("class", "dark-mode");
        viewMode.setAttribute("class", "darkMode-toggled");
        viewMode.textContent = "To Light Mode";
        document.body.style.backgroundColor = "#000";
    } else {
        document.querySelector("header").setAttribute("class", "light-mode");
        viewMode.setAttribute("class", "lightMode-toggled");
        viewMode.textContent = "To Dark Mode";
        document.body.style.backgroundColor = "#FFF";
    }
})

document.querySelector("form").addEventListener("submit", (e) => {

    //form submitted
    e.preventDefault();
    searchMovieTitle = searchBar.value;
    searchBar.value = "";
    fetchMovie();
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

const fetchMovie = () => {
    const API = `http://www.omdbapi.com/?s=${searchMovieTitle}&apikey=${APIKey}`;
    
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