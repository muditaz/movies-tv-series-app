import { useEffect, useState } from "react";
import { apiCall, getInfoOfMovieCategoryOnHomePage } from "../../../utils/utils";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/SwitchTabs/SwitchTabs";
import Carousel from "../../../components/Carousel/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MovieCategory = ({movieCategory, defaultEndpoint}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [endpoint, setEndpoint] = useState(defaultEndpoint);
    const { tabOptions, title, url } = getInfoOfMovieCategoryOnHomePage(movieCategory, endpoint);
    const movieCategoryData = useSelector((state) => {
        return(state.movieCategoriesOnHomePage[movieCategory] && state.movieCategoriesOnHomePage[movieCategory][endpoint]);    
    });

    const getMovieCategoryData = async () => {
        try {
            const movieCategoryResult = await apiCall(`${url}`);
            dispatch({ type: 'setMovieCategoryOnHomePage', payload: { movieCategory, endpoint, movieCategoryResult } });
        } catch(err) {
            navigate('/tmdb-api-failure');
        }
    };

    useEffect(() => {
        if(!movieCategoryData)
        getMovieCategoryData();
    }, [endpoint]);

    const onTabChange = (tab) => {
        setEndpoint(tab);
    };

    return(
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">{title}</span>
                <SwitchTabs data={tabOptions} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={movieCategoryData?.results} endpoint={endpoint} />
        </div>
    );
};

export default MovieCategory;