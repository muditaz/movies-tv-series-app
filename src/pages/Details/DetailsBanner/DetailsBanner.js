import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import Genres from "../../../components/Genres/Genres";
import CircleRating from "../../../components/CircleRating/CircleRating";
import Img from "../../../components/LazyLoadImage/Img";
import { PlayIcon } from "../Playbtn"
import { apiCall } from '../../../utils/utils';
import Crew from "../Crew";
import VideoPopup from "../../../components/VideoPopup/VideoPopup";

const DetailsBanner = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { mediaType, id } = useParams();
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const info = useSelector((state) => {
        return(state.moviesTvShowsInfo[mediaType] && state.moviesTvShowsInfo[mediaType][id] && state.moviesTvShowsInfo[mediaType][id].info);
    });
    const videos = useSelector((state) => {return(state.moviesTvShowsInfo[mediaType] && state.moviesTvShowsInfo[mediaType][id] && state.moviesTvShowsInfo[mediaType][id].videos)}); 
    const video = videos && videos[0];
    const imagesInfoFromTmdbApi = useSelector((state) => {return(state.imagesInfoFromTmdbApi)});
    const _genres = info?.genres?.map((g) => g.id);
    const poster_path = imagesInfoFromTmdbApi.secure_base_url + 'original' + info?.poster_path;

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    const getData = async () => {
        try {
            const data = await apiCall(`/${mediaType}/${id}}`);
            dispatch({ type: 'setParticularMovie/TvInfo', payload: { mediaType, id, info: data } });    
        } catch(err) {
            navigate('/tmdb-api-failure');
        }
    };

    useEffect(() => {
        if(!info)
        getData();
    }, []);

    return (
        <div className="detailsBanner">
            {info ? (
                <>
                    <React.Fragment>
                        <div className="opacity-layer"></div>
                        <ContentWrapper>
                            <div className="content">
                                <div className="left">
                                    {info.poster_path ? <Img className='posterImg' src={poster_path} /> : ''}
                                </div>
                                <div className="right">
                                    <div className="title">
                                        {`${info.name || info.title} (${dayjs(info?.release_date).format("YYYY")})`}
                                    </div>
                                    <div className="subtitle">
                                        {info.tagline}
                                    </div>
                                    <Genres data={_genres} />
                                    <div className="row">
                                       <CircleRating rating={info.vote_average.toFixed(1)} />
                                       <div className="playbtn" onClick={() => {
                                                    setShow(true);
                                                    setVideoId(video.key);
                                                }}>
                                            <PlayIcon />
                                            <span className="text">Watch Trailer</span>
                                       </div>
                                    </div>
                                    <div className="overview">
                                        <div className="heading">
                                            Overview
                                        </div>
                                        <div className="description">
                                            {info.overview}
                                        </div>
                                    </div>
                                    <div className="info">
                                        {info.status && (
                                            <div className="infoItem">
                                                <span className="text bold">
                                                    Status:{" "}
                                                </span>
                                                <span className="text">
                                                    {info.status}
                                                </span>
                                            </div>
                                        )}
                                        {info.release_date && (
                                            <div className="infoItem">
                                                <span className="text bold">
                                                    Release Date:{" "}
                                                </span>
                                                <span className="text">
                                                    {dayjs(info.release_date).format("MMM D, YYYY")}
                                                </span>
                                            </div>
                                        )}
                                        {info.runtime && (
                                            <div className="infoItem">
                                                <span className="text bold">
                                                    Runtime:{" "}
                                                </span>
                                                <span className="text">
                                                    {toHoursAndMinutes(
                                                        info.runtime
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <Crew mediaType={mediaType} id={id} />
                                    {info?.created_by?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Creator:{" "}
                                                </span>
                                                <span className="text">
                                                    {info?.created_by?.map(
                                                        (d, i) => (
                                                            <span key={i}>
                                                                {d.name}
                                                                {info
                                                                    ?.created_by
                                                                    .length -
                                                                    1 !==
                                                                    i && ", "}
                                                            </span>
                                                        )
                                                    )}
                                                </span>
                                            </div>
                                    )}
                                </div>
                            </div>
                            <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId}/>
                        </ContentWrapper>
                    </React.Fragment>
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;