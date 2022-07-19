const $ = (selector) => document.querySelector(selector);
//*HEADER
const homeHeader = $(".homeHeader");
//*HEADER ELEMENTS
const homeHeaderTitle = $(".homeHeader__title"); //movieDB
const searchHeaderTitle = $(".searchHeader__title"); //results
const categoryHeaderTitle = $(".categoryHeader__title"); //?
const trendsHeadertitle = $(".trendsHeader__title"); //trends
const topRatedHeadertitle = $(".topRatedHeader__title"); //topRated
const upComingHeadertitle = $(".upComingHeader__title"); //upComing
const arrowBack = $(".arrowBack");
const movieInfoImg = $(".movieInfoImg");
//*BODYHOME
const searchInputSection = $(".searchInput");
const categoriesSection = $(".categories");
const trendsSection = $(".trends");
const topRatedSection = $(".topRated");
const upComingSection = $(".upcoming");
const inputSearch = $(".searchInput__input");
const btnSearch = $(".btnSearch");
const btn__trends = $(".btn__trends");
const btn__topRated = $(".btn__topRated");
const btn__upComing = $(".btn__upcoming");
//*MOVIEINFO
//sections
const movieInfoSection = $(".movieInfo");
const similarMoviesSection = $(".similarMovies");
//elements
const movieInfoTitle = $(".movieInfo__title");
const movieRate = $(".rate");
const movieDuration = $(".duration");
const movieRelease = $(".release");
const movieInfoCategories = $(".movieInfo__categories");
const movieDescription = $(".description");
const similarMoviesSlider = $(".similarMovies__slider"); //container
//*RESULTS
const resultsSection = $(".results");
//ELEMENTS
const results__resultsContainer = $(".results__resultsContainer");
const imgMovieResults = $(".imgMovieResults");
const infoResult__MovieName = $(".infoResult__MovieName");
const infoResult__MovieYear = $(".infoResult__MovieYear");
const infoResult__MovieRate = $(".infoResult__MovieRate");
