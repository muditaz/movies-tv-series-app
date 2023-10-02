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
                if(draft.movieCategoriesOnHomePage[action.payload.movieCategory]) {
                    draft.movieCategoriesOnHomePage[action.payload.movieCategory][action.payload.endpoint] = action.payload.movieCategoryResult;
                } else {
                    const objToAssign = {};
                    objToAssign[action.payload.endpoint] = action.payload.movieCategoryResult;
                    draft.movieCategoriesOnHomePage[action.payload.movieCategory] = objToAssign;
                }
                break;
            }
            case 'setGenresInfo': {
                draft.genresInfo = action.payload;
                break;
            }
            default:
                break;
        }
    });
};

export default rootReducer;