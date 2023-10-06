export const BASE_URL = "https://api.themoviedb.org/3";

export const headers = {
    Authorization: 'Bearer ' + process.env.REACT_APP_TMDB_TOKEN
};

export const optionsForTabsOnHomePage = {
    movieTv: [{
        label: 'Movies',
        value: 'movie'
    }, {
        label: 'TV Shows',
        value: 'tv'
    }],
    dayWeek: [{
        label: 'Day',
        value: 'day'
    }, {
        label: 'Week',
        value: 'week'
    }]
};

export const movieCategoriesOnHomePage = ['trending', 'popular', 'top_rated'];

export const cachingLimit = 5;

export const sortbyData = [
    { value: "popularity.desc", label: "Most Popular" },
    { value: "vote_average.desc", label: "Top Rated" },
    { value: "primary_release_date.desc", label: "Recent Releases" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];