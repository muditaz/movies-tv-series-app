import React, { useEffect, useState } from "react";

import "./style.scss";

import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import { PlayIcon } from "../Playbtn";
import VideoPopup from "../../../components/VideoPopup/VideoPopup";
import Img from "../../../components/LazyLoadImage/Img";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { apiCall } from "../../../utils/utils";

const VideosSection = () => {
    const { mediaType, id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const videos = useSelector((state) => {
        const obj = state.moviesTvShowsInfo[mediaType];
        return(obj && obj[id] && obj[id].videos)
    });

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    const getVideo = async () => {
        try {
            const data = await apiCall(`/${mediaType}/${id}/videos`);
            dispatch({ type: 'setDetails', payload: {mediaType, id, value: data?.results, key: 'videos'} });
        } catch(err) {
            navigate('/tmdb-api-failure');
        }
        
    };

    useEffect(() => {
        if(!videos)
        getVideo();
    }, [id]);

    return (
        <div className="videosSection">
            <ContentWrapper>
                {!(videos && videos.length === 0) && <div className="sectionHeading">Official Videos</div>}
                {videos ? (
                    <div className="videos">
                        {videos?.map((video) => {
                            return(<div key={video.id} className="videoItem" onClick={() => {setShow(true); setVideoId(video.key)}}>
                                <div className="videoThumbnail">
                                    <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} />
                                    <PlayIcon />
                                </div>
                                <div className="videoTitle">{video.name}</div>
                            </div>)
                        })}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;