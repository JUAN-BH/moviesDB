//*AXIOS
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});
//*GETTING CATEGOIRES
const categoriesHome = document.querySelector(".categories__slider");
async function getCategoriesHome() {
  const { data, status } = await api(`genre/movie/list`);
  const categories = data.genres;
  // console.log("categories", categories);
  const categoriesNames = categories
    .map((e) => {
      return `
      <span class="category" id="${e.id}">${e.name.replace(" ", "")}</span>

              `;
    })
    .join("");
  categoriesHome.innerHTML = categoriesNames;
  const categoriesSpan = document.querySelectorAll(".category");
  categoriesSpan.forEach((e) => {
    e.addEventListener("click", () => {
      location.hash = `#category=${e.id}-${e.innerHTML}`;
    });
  });
}
//*GETTING PREV MOVIES
// const trendsPrevSlider = document.querySelector(".trends__slider");
const topRatedPrevSlider = document.querySelector(".topRated__slider");
const upComingPrevSlider = document.querySelector(".upcoming__slider");
const renderResultMovies = (movies) => {
  const moviesToRender = movies
    .map((movie) => {
      return `
    <article class="movieResult" id="${movie.id}">
    <img
      src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
      class="imgMovieResult"
      id="${movie.id}"
    />
    <div class="infoResult">
      <p class="infoResult__text infoResult__MovieName">${
        movie.title.length > 12
          ? movie.title.substring(0, 12) + "..."
          : movie.title
      }</p>
      <p class="infoResult__text infoResult__MovieYear">${
        movie.release_date === undefined
          ? "-"
          : movie.release_date.length == 0
          ? "-"
          : movie.release_date.substring(0, 4)
      }</p>
      <p class="infoResult__text infoResult__MovieRateContainer">
        <span class="star"></span>
        <span class="infoResult__MovieRate">${movie.vote_average}</span>
      </p>
    </div>
  </article>
    `;
    })
    .join("");
  results__resultsContainer.innerHTML = moviesToRender;
  const imgMovieResult = document.querySelectorAll(".imgMovieResult");
  imgMovieResult.forEach((e) => {
    e.addEventListener("click", () => {
      location.hash = `#movieInfo=${e.id}`;
      // console.log("tageet", e.id);
      // displayMovieInformation(e.id);
    });
  });
};
async function getTrendMoviesPrev() {
  const { data, status } = await api(`trending/movie/day`);
  const movies = data.results;
  // console.log("trends", movies.slice(0, 5));
  //   movies.slice(0, 10).map((e) => {
  //     trendsPrevSlider.innerHTML += `
  //       <article class="trend__movie movie">
  //               <img
  //                 src="https://image.tmdb.org/t/p/w300${e.poster_path}"
  //                 alt="e.original_title"
  //                 class="movieImage trendMovieImg"
  //               />
  //             </article>
  //       `;
  //   });
  const trendsPrevSlider = document.querySelector(".trends__slider");
  trendsPrevSlider.innerHTML = ``;
  movies.slice(0, 5).forEach((e) => {
    const trendMoviePrev = document.createElement("article");
    trendMoviePrev.classList.add("trend__movie", "movie");
    const trendMovieImg = document.createElement("img");
    trendMovieImg.classList.add("movieImage", "trendMovieImg");
    trendMovieImg.setAttribute("id", `${e.id}`);
    trendMovieImg.setAttribute("alt", `${e.title}`);
    trendMovieImg.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w300${e.poster_path}`
    );
    trendMoviePrev.appendChild(trendMovieImg);
    trendsPrevSlider.appendChild(trendMoviePrev);
  });
  const trendMovieImg = document.querySelectorAll(".trendMovieImg");
  trendMovieImg.forEach((e) => {
    e.addEventListener("click", () => {
      location.hash = `#movieInfo=${e.id}`;
      // displayMovieInformation(e.id);
    });
  });
}
async function getTopRatedMoviesPrev() {
  const { data, status } = await api(`movie/top_rated`);
  const movies = data.results;
  // console.log("topRated", movies.slice(0, 5));
  const topRated5Movies = movies
    .slice(0, 10)
    .map((e) => {
      return `
          <article class="topRated__movie movie" id="${e.id}">
                  <img
                    src="https://image.tmdb.org/t/p/w300${e.poster_path}"
                    alt="${e.original_title}"
                    id="${e.id}"
                    class="movieImage topRatedMovieImg"
                  />
                </article>
          `;
    })
    .join("");
  topRatedPrevSlider.innerHTML = topRated5Movies;
  const topRatedMovieImg = document.querySelectorAll(".topRatedMovieImg");
  topRatedMovieImg.forEach((e) => {
    e.addEventListener("click", (e) => {
      console.log(e.target.id);
      location.hash = `#movieInfo=${e.target.id}`;
      // displayMovieInformation(e.target.id);
    });
  });
}
async function getUpComingMoviesPrev() {
  const { data, status } = await api(`movie/upcoming`);
  const movies = data.results;
  // console.log("upcoming", movies.slice(0, 5));
  const upComing5movies = movies
    .slice(0, 10)
    .map((e) => {
      return `
            <article class="upcoming__movie movie" id="${e.id}">
                    <img
                      src="https://image.tmdb.org/t/p/w300${e.poster_path}"
                      alt="${e.original_title}"
                      class="movieImage upcomingMovieImge"
                      id="${e.id}"
                    />
            </article>
            `;
    })
    .join("");
  upComingPrevSlider.innerHTML = upComing5movies;
  const upcomingMovieImg = document.querySelectorAll(".upcomingMovieImge");
  upcomingMovieImg.forEach((e) => {
    e.addEventListener("click", (e) => {
      console.log(e.target.id);
      location.hash = `#movieInfo=${e.target.id}`;
      // displayMovieInformation(e.target.id);
    });
  });
}
async function getMoviesByCategory(id) {
  const { data, status } = await api(`discover/movie`, {
    params: {
      with_genres: id,
    },
  });
  const movies = data.results;
  renderResultMovies(movies);
}
async function getTrendMoviesAll() {
  const { data, status } = await api(`trending/movie/day`);
  const movies = data.results;
  // resultsSection.innerHTML = ``;
  renderResultMovies(movies);
}
async function getTopRatedMoviesAll() {
  const { data, status } = await api(`movie/top_rated`);
  const movies = data.results;
  renderResultMovies(movies);
}
async function getUpComingMoviesAll() {
  const { data, status } = await api(`movie/upcoming`);
  const movies = data.results;
  renderResultMovies(movies);
}
async function displaySearchedMovies(query) {
  const { data, status } = await api(`search/movie`, {
    params: {
      query: query,
    },
  });
  const movies = data.results;
  console.log("searchedMovies", movies);
  if (movies.length == 0) {
    results__resultsContainer.innerHTML = `
    <article class="noResultsFounded">
      <h2 class="noResultsFounded__title">No results found</h2>
    </article>
    `;
  } else {
    renderResultMovies(movies);
  }
  // renderResultMovies(movies);
}
async function displayMovieInformation(id) {
  const { data, status } = await api(`movie/${id}`);
  const res = await api(`movie/${id}/similar`);
  const movie = data;
  movieInfoImg.setAttribute(
    "src",
    `https://image.tmdb.org/t/p/w300${movie.poster_path}`
  );
  movieRate.innerText = movie.vote_average;
  movieInfoTitle.innerText = movie.title;
  movieDuration.innerText = `${movie.runtime} min`;
  movieRelease.innerText = `${movie.release_date}`;
  movieDescription.innerText = movie.overview;

  const movieCategories = movie.genres
    .map((category) => {
      return `
    <span class="categoryMovieInfo">${category.name}</span>
    `;
    })
    .join("");
  movieInfoCategories.innerHTML = movieCategories;
  const similarMovies = res.data.results
    .slice(0, 5)
    .map((movie) => {
      return `
    <article class="similar__movie movie" id="${movie.id}">
      <img
        src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
        alt="${movie.original_title}"
        class="movieImage similarMoviesMovieImg"
        id="${movie.id}"
      />
    </article>
    `;
    })
    .join("");
  similarMoviesSlider.innerHTML = similarMovies;
  const similarMoviesImg = document.querySelectorAll(".similarMoviesMovieImg");
  similarMoviesImg.forEach((e) => {
    e.addEventListener("click", (e) => {
      console.log(e.target.id);
      location.hash = `#movieInfo=${e.target.id}`;
      // displayMovieInformation(e.target.id);
    });
  });
}
