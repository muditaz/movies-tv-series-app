import { useState, useEffect } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import Img from '../../../components/LazyLoadImage/Img';
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper'
import { useSelector } from 'react-redux';
import { movieCategoriesOnHomePage } from '../../../constants/constants';

const HeroBanner = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [bg, setBg] = useState('');
    const imagesInfoFromTmdbApi = useSelector((state) => {return(state.imagesInfoFromTmdbApi)});
    const movieCategoryOnHomePage = useSelector((state) => {
        const obj = state.movieCategoriesOnHomePage[movieCategoriesOnHomePage[0]]; 
        if(obj) {
            return(obj[Object.keys(obj)[0]]);
        }
    });

    useEffect(() => {
        if(movieCategoryOnHomePage) {
            const bg = imagesInfoFromTmdbApi.secure_base_url + 'original' + (movieCategoryOnHomePage.results[Math.floor(Math.random() * 10)].backdrop_path);
            setBg(bg);
        }
    }, [movieCategoryOnHomePage]);


    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    const handleClick = (event) => {
        if(query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    return(
        <div className='heroBanner'>
            {bg && <div className='backdrop-img'>
                <Img src={bg} />
            </div>}
            <div className='opacity-layer'></div>
            <ContentWrapper>
            <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <div className="searchInput">
                        <input type="text" placeholder="Search for a movie or tv show...." value={query} onChange={handleChange} onKeyUp={searchQueryHandler} />
                        <button onClick={handleClick}>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;