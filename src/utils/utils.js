import { BASE_URL, headers, optionsForTabsOnHomePage } from "../constants/constants";

export const apiCall = async (url, params) => {
    try {
        const response = await fetch(BASE_URL + url, { headers, params });
        const result = await response.json();
        return(result);
    } catch(err) {
        return(err);
    }
};

export const getInfoOfMovieCategoryOnHomePage = (movieCategory, endpoint) => {
    const movieCategoryInfo = {};

    switch (movieCategory) {
        case 'trending': {
            movieCategoryInfo.tabOptions = optionsForTabsOnHomePage.dayWeek;
            movieCategoryInfo.title = "Trending";
            movieCategoryInfo.url = `/${movieCategory}/movie/${endpoint}`;
            break;
        }
        case 'popular': {
            movieCategoryInfo.tabOptions = optionsForTabsOnHomePage.movieTv;
            movieCategoryInfo.title = "What's Popular";
            movieCategoryInfo.url = `/${endpoint}/${movieCategory}`
            break;
        }
        case 'top_rated': {
            movieCategoryInfo.tabOptions = optionsForTabsOnHomePage.movieTv;
            movieCategoryInfo.title = "Top Rated";
            movieCategoryInfo.url = `/${endpoint}/${movieCategory}`
            break;
        }
        default:
            break;
    }
    movieCategoryInfo.defaultEndpoint = movieCategoryInfo.tabOptions[0].value;

    return(movieCategoryInfo);
};