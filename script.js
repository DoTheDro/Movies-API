const searchBar = document.querySelector(".searchBar");
let searchMovieTitle = "";
const APIKey = "9f74012b";
const row = document.querySelector(".movie-row");
const pagination = document.querySelector("#pagination");
const pageNumber = document.querySelector(".pageNumber");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
let currentPageNum = 1;

document.querySelector("form").addEventListener("submit", (e) => {

    //form submitted
    e.preventDefault();
    searchMovieTitle = searchBar.value;
    searchBar.value = "";
    let queryPage = paginationFunction(currentPageNum);
    fetchMovie(queryPage);
})

const renderMovie = (movies) => {
    pagination.setAttribute("class", "show");
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

const paginationFunction = (numOfPage) => {

    prev.addEventListener("click", () => {
        numOfPage = numOfPage - 1;
        console.log(numOfPage);
        return numOfPage;
    })

    next.addEventListener("click", () => {
        numOfPage = numOfPage + 1;
        console.log(numOfPage);
        return numOfPage;
    })

}

const fetchMovie = (queryPage) => {
    const API = `http://www.omdbapi.com/?s=${searchMovieTitle}&page=${queryPage}&apikey=${APIKey}`;
    
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