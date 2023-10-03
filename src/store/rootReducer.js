import initialState from "./initialState";
import { produce } from "immer";

const rootReducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch(action.type) {
            case 'setImagesInfoFromTmdbApi': {
                draft.imagesInfoFromTmdbApi = action.payload;
                break;
            }
            case 'setMovieCategoryOnHomePage': {
                const { movieCategory, endpoint, movieCategoryResult } = action.payload;
                if(draft.movieCategoriesOnHomePage[movieCategory]) {
                    draft.movieCategoriesOnHomePage[movieCategory][endpoint] = movieCategoryResult;
                } else {
                    draft.movieCategoriesOnHomePage[movieCategory] = {[endpoint]: movieCategoryResult};
                }
                break;
            }
            case 'setGenresInfo': {
                draft.genresInfo = action.payload;
                break;
            }
            case 'setCastAndCrew': {
                const {mediaType, id, data} = action.payload;
                draft.moviesTvShowsInfo[mediaType][id].cast = data.cast;
                draft.moviesTvShowsInfo[mediaType][id].crew = data.crew;
                break;
            }
            case 'setDetails': {
                const { mediaType, id, key, value } = action.payload;
                if(draft.moviesTvShowsInfo[mediaType]) {
                    if(draft.moviesTvShowsInfo[mediaType][id]) {
                        draft.moviesTvShowsInfo[mediaType][id][key] = value;
                    } else {
                        draft.moviesTvShowsInfo[mediaType][id] = {[key]: value};
                    }
                } else {
                    draft.moviesTvShowsInfo[mediaType] = {[id]: {[key]: value}};
                }
                break;
            }
            default:
                break;
        }
    });
};

export default rootReducer;