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
const langSelector = $(".selectLanguage");
//*BODYHOME
const searchInputSection = $(".searchInput");
const categoriesSection = $(".categories");
const categoriesHome = $(".categories__slider");
const trendsSection = $(".trends");
const trendsPrevSlider = $(".trends__slider");
const topRatedSection = $(".topRated");
const topRatedPrevSlider = $(".topRated__slider");
const upComingSection = $(".upcoming");
const upComingPrevSlider = $(".upcoming__slider");
const myListSection = $(".myList");
const myListPrevSlider = $(".myList__slider");
const inputSearch = $(".searchInput__input");
const btnSearch = $(".btnSearch");
const btn__trends = $(".btn__trends");
const btn__topRated = $(".btn__topRated");
const btn__upComing = $(".btn__upcoming");
//elements
const searchInput = $(".searchInput__input");
const categoriesTitle = $(".categories__title");
const trendsTitle = $(".trends__title");
const topRatedTitle = $(".topRated__title");
const upComingTitle = $(".upcoming__title");
const myList = $(".myList__title");
const footerText = $(".footer__text");
//*MOVIEINFO
//sections
const movieInfoSection = $(".movieInfo");
const similarMoviesSection = $(".similarMovies");
//elements
const movieInfoTitle = $(".movieInfo__title");
const rateContainer = $(".rateContainer");
const durationContainer = $(".durationContainer");
const releaseContainer = $(".releaseContainer");
const movieInfoCategories = $(".movieInfo__categories");
const descriptionInfoContainer = $(".descriptionInfoContainer");
const similarMoviesSlider = $(".similarMovies__slider"); //container
const movieTtitleFail = document.createElement("h1");

// const durationTitle = querySelector(".durationTitle");
// const releaseTitle = querySelector(".releaseTitle");

//*RESULTS
const resultsSection = $(".results");

//ELEMENTS
const movieResults = $(".movieResult");
const results__resultsContainer = $(".results__resultsContainer");
const imgMovieResults = $(".imgMovieResults");
const infoResult__MovieName = $(".infoResult__MovieName");
const infoResult__MovieYear = $(".infoResult__MovieYear");
const infoResult__MovieRate = $(".infoResult__MovieRate");
