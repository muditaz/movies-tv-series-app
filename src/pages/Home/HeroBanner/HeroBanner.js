import { useState } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import Img from '../../../components/LazyLoadImage/Img';
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper'

const HeroBanner = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const bg = "https://image.tmdb.org/t/p/original/iiXliCeykkzmJ0Eg9RYJ7F2CWSz.jpg";

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    return(
        <div className='heroBanner'>
            <div className='backdrop-img'>
                <Img src={bg} />
            </div>
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
                        <button>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;