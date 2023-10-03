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
                    const objToAssign = {};
                    objToAssign[endpoint] = movieCategoryResult;
                    draft.movieCategoriesOnHomePage[movieCategory] = objToAssign;
                }
                break;
            }
            case 'setGenresInfo': {
                draft.genresInfo = action.payload;
                break;
            }
            case 'setParticularMovie/TvInfo': {
                const {mediaType, id, info} = action.payload;
                if(draft.moviesTvShowsInfo[mediaType]) {
                    if(draft.moviesTvShowsInfo[mediaType][id]) {
                        draft.moviesTvShowsInfo[mediaType][id].info = info;
                    } else {
                        draft.moviesTvShowsInfo[mediaType][id] = { info };
                    }
                } else {
                    const objToAssign = {};
                    objToAssign[id] = { info };
                    draft.moviesTvShowsInfo[mediaType] = objToAssign;
                }
                break;
            }
            case 'setCastAndCrew': {
                const {mediaType, id, data} = action.payload;
                draft.moviesTvShowsInfo[mediaType][id].cast = data.cast;
                draft.moviesTvShowsInfo[mediaType][id].crew = data.crew;
                break;
            }
            default:
                break;
        }
    });
};

export default rootReducer;