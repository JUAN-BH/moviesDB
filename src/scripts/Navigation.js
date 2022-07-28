let maxPage;
let page = 1;
let infiniteScroll;
window.addEventListener("DOMContentLoaded", navigation, false);
window.addEventListener("hashchange", navigation, false);
window.addEventListener("scroll", infiniteScroll, { passive: false });

function navigation() {
  if (infiniteScroll) {
    window.removeEventListener("scroll", infiniteScroll, { passive: false });
    infiniteScroll = undefined;
    page = 1;
  }

  // console.log("location", { location });
  if (location.hash.startsWith("#trends")) {
    renderTrendsMovies();
  } else if (location.hash.startsWith("#topRated")) {
    renderTopRatedMovies();
  } else if (location.hash.startsWith("#upComing")) {
    renderUpComingMovies();
  } else if (location.hash.startsWith("#search=")) {
    renderSearchMovies();
  } else if (location.hash.startsWith("#movieInfo=")) {
    renderMovieInfo();
  } else if (location.hash.startsWith("#category=")) {
    renderCategoryMovies();
  } else {
    renderHome();
    // changeLanguage();
    // getSavedMovies();
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
  // window.scrollTo({ top: 0, behavior: "smooth" });
  // window.scrollTo({ top: 0, behavior: "smooth" });
  // window.scrollTo({ top: 0, behavior: "smooth" });
  // window.scrollTo({ top: 0, behavior: "smooth" });
  // window.scrollTo({ top: 0, behavior: "smooth" });
  // window.scrollTo({ top: 0, behavior: "smooth" });
  if (infiniteScroll) {
    window.addEventListener("scroll", infiniteScroll, { passive: false });
  }
}
function renderTrendsMovies() {
  // console.log("TRENDS");
  //*HEADER
  //hide
  homeHeader.classList.remove("movieInfoHeader");
  homeHeaderTitle.classList.add("hidden");
  searchHeaderTitle.classList.add("hidden");
  categoryHeaderTitle.classList.add("hidden");
  topRatedHeadertitle.classList.add("hidden");
  upComingHeadertitle.classList.add("hidden");
  movieInfoImg.classList.add("hidden");
  langSelector.classList.remove("hidden");
  langSelector.style.position = "absolute";
  langSelector.style.right = "30px";
  langSelector.style.top = "12px";
  movie__btn.classList.add("hidden");
  //render
  trendsHeadertitle.classList.remove("hidden");
  homeHeader.classList.add("backHeader");
  arrowBack.style.display = "flex";
  arrowBack.classList.remove("arrowBackMovieInfo");
  //*BODYHOME
  searchInputSection.style.display = "none";
  categoriesSection.classList.add("hidden");
  trendsSection.classList.add("hidden");
  topRatedSection.classList.add("hidden");
  upComingSection.classList.add("hidden");
  myListSection.classList.add("hidden");
  //*MOVIEINFO
  movieInfoSection.classList.add("hidden");
  similarMoviesSection.classList.add("hidden");
  //*RESULTS
  resultsSection.classList.remove("hidden");
  resultsSection.style.marginTop = "50px";

  infiniteScroll = getMoreTrendsMovies;
}
function renderTopRatedMovies() {
  // console.log("TOP RATED");
  //*HEADER
  //hide
  homeHeader.classList.remove("movieInfoHeader");
  homeHeaderTitle.classList.add("hidden");
  searchHeaderTitle.classList.add("hidden");
  categoryHeaderTitle.classList.add("hidden");
  trendsHeadertitle.classList.add("hidden");
  upComingHeadertitle.classList.add("hidden");
  movieInfoImg.classList.add("hidden");
  langSelector.classList.remove("hidden");
  langSelector.style.position = "absolute";
  langSelector.style.right = "30px";
  langSelector.style.top = "12px";
  movie__btn.classList.add("hidden");

  //render
  topRatedHeadertitle.classList.remove("hidden");
  homeHeader.classList.add("backHeader");
  arrowBack.style.display = "flex";
  arrowBack.classList.remove("arrowBackMovieInfo");
  //*BODYHOME
  searchInputSection.style.display = "none";
  categoriesSection.classList.add("hidden");
  trendsSection.classList.add("hidden");
  topRatedSection.classList.add("hidden");
  upComingSection.classList.add("hidden");
  myListSection.classList.add("hidden");
  //*MOVIEINFO
  movieInfoSection.classList.add("hidden");
  similarMoviesSection.classList.add("hidden");
  //*RESULTS
  resultsSection.classList.remove("hidden");
  resultsSection.style.marginTop = "50px";

  infiniteScroll = getMoreTopRatedMovies;
}
function renderUpComingMovies() {
  // console.log("UP COMING");
  //*HEADER
  //hide
  homeHeader.classList.remove("movieInfoHeader");
  homeHeaderTitle.classList.add("hidden");
  searchHeaderTitle.classList.add("hidden");
  categoryHeaderTitle.classList.add("hidden");
  trendsHeadertitle.classList.add("hidden");
  topRatedHeadertitle.classList.add("hidden");
  movieInfoImg.classList.add("hidden");
  langSelector.classList.remove("hidden");
  langSelector.style.position = "absolute";
  langSelector.style.right = "30px";
  langSelector.style.top = "12px";
  movie__btn.classList.add("hidden");

  //render
  upComingHeadertitle.classList.remove("hidden");
  homeHeader.classList.add("backHeader");
  arrowBack.style.display = "flex";
  arrowBack.classList.remove("arrowBackMovieInfo");
  //*BODYHOME
  searchInputSection.style.display = "none";
  categoriesSection.classList.add("hidden");
  trendsSection.classList.add("hidden");
  topRatedSection.classList.add("hidden");
  upComingSection.classList.add("hidden");
  myListSection.classList.add("hidden");
  //*MOVIEINFO
  movieInfoSection.classList.add("hidden");
  similarMoviesSection.classList.add("hidden");
  //*RESULTS
  resultsSection.classList.remove("hidden");
  resultsSection.style.marginTop = "50px";

  infiniteScroll = getMoreUpComingMovies;
}
function renderSearchMovies() {
  // console.log("SEARCH");
  //*HEADER
  //hide
  homeHeader.classList.remove("movieInfoHeader");
  homeHeaderTitle.classList.add("hidden");
  categoryHeaderTitle.classList.add("hidden");
  trendsHeadertitle.classList.add("hidden");
  topRatedHeadertitle.classList.add("hidden");
  upComingHeadertitle.classList.add("hidden");
  movieInfoImg.classList.add("hidden");
  langSelector.classList.remove("hidden");
  langSelector.style.position = "absolute";
  langSelector.style.right = "30px";
  langSelector.style.top = "12px";
  movie__btn.classList.add("hidden");

  //render
  homeHeader.classList.add("backHeader");
  searchHeaderTitle.classList.remove("hidden");
  arrowBack.style.display = "flex";
  arrowBack.classList.remove("arrowBackMovieInfo");
  //*BODYHOME
  searchInputSection.style.display = "flex";
  searchInputSection.style.marginTop = "74px";
  categoriesSection.classList.add("hidden");
  trendsSection.classList.add("hidden");
  topRatedSection.classList.add("hidden");
  upComingSection.classList.add("hidden");
  myListSection.classList.add("hidden");
  //*MOVIEINFO
  movieInfoSection.classList.add("hidden");
  similarMoviesSection.classList.add("hidden");
  //*RESULTS
  resultsSection.classList.remove("hidden");
  resultsSection.style.marginTop = "11px";

  const search = location.hash.split("=")[1];
  // console.log("search", search.replace(/%20/g, " "));
  displaySearchedMovies(search.replace(/%20/g, " "));
  infiniteScroll = getMoreSearchMovies(search.replace(/%20/g, " "));
}
function renderMovieInfo() {
  // console.log("MOVIE INFO");
  //*HEADER
  //hide
  homeHeader.classList.remove("backHeader");
  homeHeaderTitle.classList.add("hidden");
  searchHeaderTitle.classList.add("hidden");
  categoryHeaderTitle.classList.add("hidden");
  trendsHeadertitle.classList.add("hidden");
  topRatedHeadertitle.classList.add("hidden");
  upComingHeadertitle.classList.add("hidden");
  langSelector.classList.remove("hidden");
  langSelector.style.position = "absolute";
  langSelector.style.top = "568px";
  langSelector.style.right = "30px";
  langSelector.style.border = "1px solid #0f4c75";
  movie__btn.classList.remove("hidden");

  //render
  homeHeader.classList.add("movieInfoHeader");
  arrowBack.style.display = "flex";
  arrowBack.classList.add("arrowBackMovieInfo");
  movieInfoImg.classList.remove("hidden");
  //*BODYHOME
  searchInputSection.style.display = "none";
  categoriesSection.classList.add("hidden");
  trendsSection.classList.add("hidden");
  topRatedSection.classList.add("hidden");
  upComingSection.classList.add("hidden");
  myListSection.classList.add("hidden");
  //*MOVIEINFO
  movieInfoSection.classList.remove("hidden");
  similarMoviesSection.classList.remove("hidden");
  //*RESULTS
  resultsSection.classList.add("hidden");

  const movieId = location.hash.split("=")[1];
  // displayMovieInformation(movieId);
  getMovieLanguages(movieId, "de");
  displaySimilarMovies(movieId);
}
function renderCategoryMovies() {
  //*HEADER
  //hide
  homeHeader.classList.remove("movieInfoHeader");
  homeHeaderTitle.classList.add("hidden");
  searchHeaderTitle.classList.add("hidden");
  trendsHeadertitle.classList.add("hidden");
  topRatedHeadertitle.classList.add("hidden");
  upComingHeadertitle.classList.add("hidden");
  movieInfoImg.classList.add("hidden");
  langSelector.classList.remove("hidden");
  langSelector.style.position = "absolute";
  langSelector.style.right = "30px";
  langSelector.style.top = "12px";
  movie__btn.classList.add("hidden");

  //render
  homeHeader.classList.add("backHeader");
  categoryHeaderTitle.classList.remove("hidden");
  arrowBack.style.display = "flex";
  arrowBack.classList.remove("arrowBackMovieInfo");
  //*BODYHOME
  searchInputSection.style.display = "none";
  categoriesSection.classList.add("hidden");
  trendsSection.classList.add("hidden");
  topRatedSection.classList.add("hidden");
  upComingSection.classList.add("hidden");
  myListSection.classList.add("hidden");
  //*MOVIEINFO
  movieInfoSection.classList.add("hidden");
  similarMoviesSection.classList.add("hidden");
  //*RESULTS
  resultsSection.classList.remove("hidden");

  const idGenre = location.hash.split("=")[1].split("-")[0];
  const nameGenre = location.hash.split("=")[1].split("-")[1];
  // console.log("nameGenre", nameGenre);
  categoryHeaderTitle.innerHTML = `${decodeURI(nameGenre)}`;
  getMoviesByCategory(idGenre);
  infiniteScroll = getMoreCategoriesMovies;
}
function renderHome() {
  // console.log("HOME");
  //*HEADER
  //hide
  arrowBack.style.display = "none";
  searchHeaderTitle.classList.add("hidden");
  categoryHeaderTitle.classList.add("hidden");
  trendsHeadertitle.classList.add("hidden");
  topRatedHeadertitle.classList.add("hidden");
  upComingHeadertitle.classList.add("hidden");
  movieInfoImg.classList.add("hidden");
  langSelector.classList.remove("hidden");
  langSelector.style.marginLeft = "120px";
  langSelector.style.position = "absolute";
  langSelector.style.right = "30px";
  langSelector.style.top = "12px";
  movie__btn.classList.add("hidden");

  //render
  homeHeader.classList.remove("backHeader");
  homeHeader.classList.remove("movieInfoHeader");
  homeHeaderTitle.classList.remove("hidden");

  //*BODYHOME
  searchInputSection.style.display = "flex";
  searchInputSection.style.marginTop = "20px";
  inputSearch.value = "";
  categoriesSection.classList.remove("hidden");
  trendsSection.classList.remove("hidden");
  topRatedSection.classList.remove("hidden");
  upComingSection.classList.remove("hidden");
  myListSection.classList.remove("hidden");
  //*MOVIEINFO
  movieInfoSection.classList.add("hidden");
  similarMoviesSection.classList.add("hidden");
  //*RESULTS
  resultsSection.classList.add("hidden");
  //*GET CATEGORIES AND MOVIES
  getCategoriesHome();
  getTrendMoviesPrev();
  getTopRatedMoviesPrev();
  getUpComingMoviesPrev();
  getSavedMovies();
}

arrowBack.addEventListener("click", function () {
  // location.hash = "#home";
  history.back();
  // results__resultsContainer.innerHTML = "";
  homeHeader.removeChild(movieTtitleFail);
  homeHeader.appendChild(movieInfoImg);
});
inputSearch.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    location.hash = `#search=${inputSearch.value}`;
  }
});
btnSearch.addEventListener("click", function () {
  if (inputSearch.value.length == 0) {
  } else {
    location.hash = `#search=${inputSearch.value}`;
  }
});

btn__trends.addEventListener("click", function () {
  location.hash = "#trends";
  getTrendMoviesAll();
});
btn__topRated.addEventListener("click", function () {
  location.hash = "#topRated";
  getTopRatedMoviesAll();
});
btn__upComing.addEventListener("click", function () {
  location.hash = "#upComing";
  getUpComingMoviesAll();
});
