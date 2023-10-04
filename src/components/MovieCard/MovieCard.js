import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import Img from "../LazyLoadImage/Img";
import CircleRating from "../CircleRating/CircleRating";
import Genres from "../Genres/Genres";

const MovieCard = ({ data, showGenresAndRating, mediaType }) => {
    const imagesInfoFromTmdbApi = useSelector((state) => {return(state.imagesInfoFromTmdbApi)});
    const navigate = useNavigate();
    const posterUrl = imagesInfoFromTmdbApi.secure_base_url + 'original' + data.poster_path;

    return (
        <div
            className="movieCard"
            onClick={() =>
                navigate(`/${data.media_type || mediaType}/${data.id}`)
            }
        >
            <div className="posterBlock">
                <Img className="posterImg" src={posterUrl} />                
                {showGenresAndRating && <React.Fragment>
                    <CircleRating rating={data.vote_average.toFixed(1)} />
                    <Genres data={data.genre_ids.slice(0, 2)} />
                </React.Fragment>}
            </div>
            <div className="textBlock">
                <span className="title">{data.title || data.name}</span>
                <span className="date">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;