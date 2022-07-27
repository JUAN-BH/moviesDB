//*DATOS (API Y LOCALSTORAGE)
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});
function savedMovies() {
  //Miramos si hay algo en localStorage, si no hay nada, se devuleve un obj vacio, si hay algo en localStorage, se devuelve un obj con los datos
  const savedMovies = JSON.parse(localStorage.getItem("savedMovies")); //pasamos el string a obj
  let movies;
  if (savedMovies) {
    movies = savedMovies;
  } else {
    movies = {};
  }
  return movies;
}
function saveMovie(movie) {
  const saved = savedMovies();
  console.log("SAVED", saved);
  if (saved[movie.id]) {
    saved[movie.id] = undefined;
  } else {
    saved[movie.id] = movie;
  }
  localStorage.setItem("savedMovies", JSON.stringify(saved));
  if (location.hash == "") {
    getSavedMovies();
    // getTrendingMoviesPreview();
  }
}
//*GETTING CATEGOIRES
async function getCategoriesHome() {
  const { data, status } = await api(`genre/movie/list`);
  const categories = data.genres;
  // categoriesHome.innerHTML = "";
  const categoriesNames = categories
    .map((e) => {
      return `
      <span class="fadeIn category" id="${e.id}">${e.name.replace(
        " ",
        ""
      )}</span>

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
const renderSlidersMovies = (movies, container, clasCon, clasImg) => {
  container.innerHTML = ``;
  movies.slice(0, 10).forEach((e) => {
    const article = document.createElement("article");
    article.classList.add(`${clasCon}`, "movie");
    const trendMovieImg = document.createElement("img");
    trendMovieImg.classList.add("movieImage", `${clasImg}`);
    trendMovieImg.setAttribute("id", `${e.id}`);
    // trendMovieImg.setAttribute("alt", `${e.title}`);
    trendMovieImg.setAttribute(
      "data_src",
      `https://image.tmdb.org/t/p/w300${e.poster_path}`
    );
    article.appendChild(trendMovieImg);
    observer.observe(trendMovieImg);
    container.appendChild(article);

    const movie__btn = document.createElement("button");
    movie__btn.classList.add("movie__btn");
    savedMovies()[e.id] && movie__btn.classList.add("movie__btn--active");

    movie__btn.addEventListener("click", () => {
      movie__btn.classList.toggle("movie__btn--active");
      saveMovie(e);
      // getSavedMovies();
    });
    article.appendChild(movie__btn);
  });
  const movieImg = document.querySelectorAll(`.${clasImg}`);
  movieImg.forEach((e) => {
    e.addEventListener("click", () => {
      location.hash = `#movieInfo=${e.id}`;
    });
  });
};
async function getTrendMoviesPrev() {
  const { data, status } = await api(`trending/movie/day`);
  const movies = data.results;
  renderSlidersMovies(
    movies,
    trendsPrevSlider,
    "trend__movie",
    "trendMovieImg"
  );
}
async function getTopRatedMoviesPrev() {
  const { data, status } = await api(`movie/top_rated`);
  const movies = data.results;
  renderSlidersMovies(
    movies,
    topRatedPrevSlider,
    "topRated__movie",
    "topRatedMovieImg"
  );
}
async function getUpComingMoviesPrev() {
  const { data, status } = await api(`movie/upcoming`);
  const movies = data.results;
  renderSlidersMovies(
    movies,
    upComingPrevSlider,
    "upcoming__movie",
    "upcomingMovieImge"
  );
}
function getSavedMovies() {
  const saved = savedMovies();
  const savedMoviesValues = Object.values(saved);
  // console.log("SAVED MOVIES", savedMoviesValues);
  renderSlidersMovies(
    savedMoviesValues,
    myListPrevSlider,
    "myList__movie",
    "myListMovieImg"
  );
}
//*GETTING RESULTS BY CATEGORIES, TREND, TOP RATED, UPCOMING AND SEARCH
const renderResultMovies = (movies, { clean = true } = {}) => {
  if (clean) {
    results__resultsContainer.innerHTML = "";
  }
  movies.forEach((e) => {
    //*CREATE
    const movieResultArticle = document.createElement("article");
    movieResultArticle.classList.add("movieResult", "fadeIn");
    movieResultArticle.setAttribute("id", `${e.id}`);
    const movieImgFailCon = document.createElement("div");
    movieImgFailCon.classList.add("imgMovieResult");
    movieImgFailCon.setAttribute("id", `${e.id}`);
    const movieImgFail = document.createElement("h2");
    movieImgFail.classList.add("movieImgFail");
    movieImgFail.innerHTML = e.original_title;
    const movieResultImg = document.createElement("img");
    movieResultImg.classList.add("imgMovieResult");
    movieResultImg.setAttribute("id", `${e.id}`);
    movieResultImg.setAttribute(
      "data_src",
      `https://image.tmdb.org/t/p/w300${e.poster_path}`
    );
    const movieInfoDiv = document.createElement("div");
    movieInfoDiv.classList.add("infoResult");
    const movieTitle = document.createElement("p");
    movieTitle.classList.add("infoResult__text", "infoResult__MovieName");
    movieTitle.innerHTML =
      e.title.length > 12 ? `${e.title.substring(0, 12)}...` : e.title;
    const movieYear = document.createElement("p");
    movieYear.classList.add("infoResult__text", "infoResult__MovieYear");
    movieYear.innerHTML =
      e.release_date === undefined
        ? "-"
        : e.release_date.length == 0
        ? "-"
        : e.release_date.substring(0, 4);
    const movieRating = document.createElement("p");
    movieRating.classList.add(
      "infoResult__text",
      "infoResult__MovieRateContainer"
    );
    const movieRatingIcon = document.createElement("span");
    movieRatingIcon.classList.add("star");
    const movieRate = document.createElement("span");
    movieRate.classList.add("infoResult__MovieRate");
    movieRate.innerHTML = e.vote_average;

    const movie__btn = document.createElement("button");
    movie__btn.classList.add("movie__btn");
    // savedMovies()[e.id] && movie__btn.classList.add("movie__btn--active");
    movie__btn.addEventListener("click", () => {
      console.log("CLICKED");
      movie__btn.classList.toggle("movie__btn--active");
      saveMovie(e);
      // getSavedMovies();
    });

    //*APPEND
    movieImgFailCon.appendChild(movieImgFail);
    if (e.poster_path === null) {
      movieResultArticle.appendChild(movieImgFailCon);
    } else {
      movieResultArticle.appendChild(movieResultImg);
    }
    movieInfoDiv.appendChild(movieTitle);
    movieInfoDiv.appendChild(movieYear);
    movieInfoDiv.appendChild(movieRating);
    movieRating.appendChild(movieRatingIcon);
    movieRating.appendChild(movieRate);
    movieResultArticle.appendChild(movieInfoDiv);
    movieResultArticle.appendChild(movie__btn);
    results__resultsContainer.appendChild(movieResultArticle);
  });

  for (let i = 0; i < results__resultsContainer.children.length; i++) {
    observerMovieResult.observe(results__resultsContainer.children[i]);
    observer.observe(results__resultsContainer.children[i].children[0]);
  }
  const imgMovieResult = document.querySelectorAll(".imgMovieResult");
  imgMovieResult.forEach((e) => {
    e.addEventListener("click", () => {
      location.hash = `#movieInfo=${e.id}`;
      // console.log("tageet", e.id);
      // displayMovieInformation(e.id);
    });
  });
};
async function getMoreMovies(endpoint) {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 25;
  const pageIsNotMax = page < maxPage;
  if (scrollIsBottom && pageIsNotMax) {
    page++;
    const { data, status } = await api(`${endpoint}`, {
      params: {
        page: page,
      },
    });
    const movies = data.results;
    console.log("SCROLL", data);
    renderResultMovies(movies, { clean: false });
  }
}
function getMoreTrendsMovies() {
  getMoreMovies(`trending/movie/day`);
}
function getMoreTopRatedMovies() {
  getMoreMovies(`movie/top_rated`);
}
function getMoreUpComingMovies() {
  getMoreMovies(`movie/upcoming`);
}
function getMoreCategoriesMovies() {
  const idGenre = location.hash.split("=")[1].split("-")[0];
  getMoreMovies(`discover/movie?with_genres=${idGenre}`);
}
function getMoreSearchMovies(query) {
  return async function () {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 25;
    const pageIsNotMax = page < maxPage;
    if (scrollIsBottom && pageIsNotMax) {
      page++;
      const { data, status } = await api(`search/movie`, {
        params: {
          page: page,
          query,
        },
      });
      const movies = data.results;
      console.log("SCROLL", data);
      renderResultMovies(movies, { clean: false });
    }
  };
}

/*----------------*/
async function getMoviesByCategory(id) {
  const { data, status } = await api(`discover/movie`, {
    params: {
      with_genres: id,
    },
  });
  const movies = data.results;
  maxPage = data.total_pages;
  renderResultMovies(movies, `discover/movie`, { clean: true });
}
async function getTrendMoviesAll() {
  const { data, status } = await api(`trending/movie/day`);
  const movies = data.results;
  maxPage = data.total_pages;
  renderResultMovies(movies, { clean: true });
}
async function getTopRatedMoviesAll() {
  const { data, status } = await api(`movie/top_rated`);
  const movies = data.results;
  maxPage = data.total_pages;
  renderResultMovies(movies, { clean: true });
}
async function getUpComingMoviesAll() {
  const { data, status } = await api(`movie/upcoming`, { clean: true });
  const movies = data.results;
  maxPage = data.total_pages;
  renderResultMovies(movies, { clean: true });
}
async function displaySearchedMovies(query) {
  const { data, status } = await api(`search/movie`, {
    params: {
      query: query,
    },
  });
  const movies = data.results;
  maxPage = data.total_pages;
  console.log("searchedMovies", data);
  if (movies.length == 0) {
    results__resultsContainer.innerHTML = `
    <article class="noResultsFounded">
      <h2 class="noResultsFounded__title">No results found</h2>
    </article>
    `;
  } else {
    renderResultMovies(movies, { clean: true });
  }
  // renderResultMovies(movies);
}
//*GETTING MOVIE INFORMATION
function displayMovieInformation({
  src,
  title,
  vote,
  time,
  date,
  overView,
  genres,
}) {
  // const { data, status } = await api(`movie/${id}`);
  // const movie = data;
  const movieImage = `https://image.tmdb.org/t/p/w500${src}`;
  if (src == null) {
    movieTtitleFail.classList.add("movieTitleFail");
    movieTtitleFail.innerHTML = title;
    homeHeader.appendChild(movieTtitleFail);
    homeHeader.removeChild(movieInfoImg);
  } else {
    movieInfoImg.setAttribute("src", movieImage);
  }
  movieInfoTitle.innerHTML = `
  <h2 class="section__title fadeIn">${title}</h2>
  `;
  rateContainer.innerHTML = `
  <span class="star fadeIn"></span> 
  <span class="rate fadeIn">${vote}</span>
  `;
  durationContainer.innerHTML = `
  <p class="infoTitle movieInfoContent fadeIn">
    <span class="infoTitle__title durationTitle">Duration:</span>
   <span class="duration infoText fadeIn">${time} min</span>
  </p>
  `;
  releaseContainer.innerHTML = `
  <p class="infoTitle movieInfoContent fadeIn">
    <span class="infoTitle__title releaseTitle">Release date:</span>
   <span class="release infoText fadeIn">${date}</span>
  </p>
  `;
  descriptionInfoContainer.innerHTML = `
  <p class="description fadeIn">${overView}</p>`;

  const movieCategories = genres
    .map((category) => {
      return `
    <span class="categoryMovieInfo fadeIn">${category.name}</span>
    `;
    })
    .join("");
  movieInfoCategories.innerHTML = movieCategories;
}
async function displaySimilarMovies(id) {
  const res = await api(`movie/${id}/recommendations`);
  const movies = res.data.results;
  renderSlidersMovies(
    movies,
    similarMoviesSlider,
    "similar__movie",
    "similarMoviesMovieImg"
  );
}
//*INSERCTION OBSERVER TRY
const loadImg = (entries) => {
  // console.log(entries);
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // console.log("entry.target.id", entry.target.getAttribute("data_src"));
      entry.target.classList.add("visible");
      entry.target.setAttribute("src", entry.target.getAttribute("data_src"));
    } else {
      // entry.target.setAttribute("src", "");
    }
  });
};
const loadImgResult = (entries) => {
  entries.forEach((entry) => {
    // console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("visibleMovieResult");
    } else {
      // entry.target.classList.remove("visibleMovieResult", "fadeIn");
    }
  });
};
let observer = new IntersectionObserver(loadImg, {
  root: null,
  rootMargin: "0px",
  threshold: 0,
});
let observerMovieResult = new IntersectionObserver(loadImgResult, {
  root: null,
  rootMargin: "1000px",
  threshold: 0,
});
//*INTERNATIONAL LANGUAGE
async function getMovieLanguages(id) {
  const { data, status } = await api(`movie/${id}`, {
    params: { language: `${langSelector.value}` },
  });
  // console.log("LANG", langSelect.value);
  // console.log("MOVIE", data);
  displayMovieInformation({
    src: data.poster_path,
    title: data.title,
    vote: data.vote_average,
    time: data.runtime,
    date: data.release_date,
    overView: data.overview,
    genres: data.genres,
  });
}

function langs({
  lang,
  searchPlaceholder,
  categories,
  trends,
  topRated,
  upComing,
  myList,
  footerText,
  duration,
  release,
  description,
  similarMovies,
} = {}) {
  this.lang = lang;
  this.captions = {
    searchPlaceholder: searchPlaceholder,
    categories: categories,
    trends: trends,
    topRated: topRated,
    upComing: upComing,
    myList: myList,
    footerText: footerText,
  };
  this.movieInformation = {
    duration: duration,
    release: release,
    description: description,
    similarMovies: similarMovies,
  };
}
const langsEN = new langs({
  lang: "en",
  searchPlaceholder: "Search",
  categories: "Categories",
  trends: "Trends",
  topRated: "Top Rated",
  upComing: "Up Coming",
  myList: "My List",
  footerText: "Made by Juan Manuel Becerra",
  duration: "Duration",
  release: "Release",
  description: "Description",
  similarMovies: "Similar Movies",
});
const langsES = new langs({
  lang: "es",
  searchPlaceholder: "Buscar",
  categories: "Categorias",
  trends: "Tendencias",
  topRated: "Mejor Valoradas",
  upComing: "Próximas Estrenos",
  myList: "Mi Lista",
  footerText: "Hecho por Juan Manuel Becerra",
  duration: "Duración",
  release: "Estreno",
  description: "Descripción",
  similarMovies: "Peliculas Similares",
});
const langsFR = new langs({
  lang: "fr",
  searchPlaceholder: "Chercher",
  categories: "Catégories",
  trends: "Tendances",
  topRated: "Meilleures notes",
  upComing: "Prochaines sorties",
  myList: "Ma liste",
  footerText: "Créé par Juan Manuel Becerra",
  duration: "Durée",
  release: "Sortie",
  description: "Description",
  similarMovies: "Pelicules similaires",
});
const langsPT = new langs({
  lang: "pt",
  searchPlaceholder: "Procurar",
  categories: "Categorias",
  trends: "Tendencias",
  topRated: "Melhores Avaliadas",
  upComing: "Próximas Lançamentos",
  myList: "Minha Lista",
  footerText: "Feito por Juan Manuel Becerra",
  duration: "Duração",
  release: "Lançamento",
  description: "Descrição",
  similarMovies: "Peliculas Similares",
});
langSelector.addEventListener("change", changeLanguage);
function changeLanguage() {
  if (langSelector.value == "es") {
    searchInput.setAttribute("placeholder", langsES.captions.searchPlaceholder);
    categoriesTitle.innerHTML = langsES.captions.categories;
    trendsTitle.innerHTML = langsES.captions.trends;
    topRatedTitle.innerHTML = langsES.captions.topRated;
    upComingTitle.innerHTML = langsES.captions.upComing;
    myList.innerHTML = langsES.captions.myList;
    footerText.innerHTML = langsES.captions.footerText;
  } else if (langSelector.value == "en") {
    searchInput.setAttribute("placeholder", langsEN.captions.searchPlaceholder);
    categoriesTitle.innerHTML = langsEN.captions.categories;
    trendsTitle.innerHTML = langsEN.captions.trends;
    topRatedTitle.innerHTML = langsEN.captions.topRated;
    upComingTitle.innerHTML = langsEN.captions.upComing;
    myList.innerHTML = langsEN.captions.myList;
    footerText.innerHTML = langsEN.captions.footerText;
  } else if (langSelector.value == "fr") {
    searchInput.setAttribute("placeholder", langsFR.captions.searchPlaceholder);
    categoriesTitle.innerHTML = langsFR.captions.categories;
    trendsTitle.innerHTML = langsFR.captions.trends;
    topRatedTitle.innerHTML = langsFR.captions.topRated;
    upComingTitle.innerHTML = langsFR.captions.upComing;
    myList.innerHTML = langsFR.captions.myList;
    footerText.innerHTML = langsFR.captions.footerText;
  } else if (langSelector.value == "pt") {
    searchInput.setAttribute("placeholder", langsPT.captions.searchPlaceholder);
    categoriesTitle.innerHTML = langsPT.captions.categories;
    trendsTitle.innerHTML = langsPT.captions.trends;
    topRatedTitle.innerHTML = langsPT.captions.topRated;
    upComingTitle.innerHTML = langsPT.captions.upComing;
    myList.innerHTML = langsPT.captions.myList;
    footerText.innerHTML = langsPT.captions.footerText;
  }
  const movieId = location.hash.split("=")[1];
  getMovieLanguages(movieId);
}
