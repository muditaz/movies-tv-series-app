import './style.scss';
import HeroBanner from './HeroBanner/HeroBanner';
import { movieCategoriesOnHomePage, optionsForTabsOnHomePage } from '../../constants/constants';
import MovieCategory from './MovieCategory/MovieCategory';
import { useEffect } from 'react';
import { apiCall, getInfoOfMovieCategoryOnHomePage } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const genresInfo = useSelector((state) => {return(state.genresInfo)});

    const getGenresInfo = async () => {
        try {
            const obj = {};
            for(let i = 0; i < optionsForTabsOnHomePage.movieTv.length; i++) {
                const { genres } = await apiCall(`/genre/${optionsForTabsOnHomePage.movieTv[i].value}/list`);
                genres.map((item) => (obj[item.id] = item));
            }
            dispatch({ type: 'setGenresInfo', payload: obj });
        } catch(err) {
            navigate('/tmdb-api-failure');
        }
    };

    useEffect(() => {
        if(!genresInfo)
        getGenresInfo();
    }, []);

    return(
        <div className='homePage'>
            <HeroBanner />
            {genresInfo && movieCategoriesOnHomePage.map((movieCategory) => {
                return(<MovieCategory movieCategory={movieCategory} defaultEndpoint={getInfoOfMovieCategoryOnHomePage(movieCategory).defaultEndpoint} />)
            })}
        </div>
    );
};

export default Home;