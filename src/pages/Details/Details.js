import { useEffect, useState } from "react";
import DetailsBanner from "./DetailsBanner/DetailsBanner";
import { apiCall } from "../../utils/utils";
import { useParams } from "react-router-dom";

const Details = () => {

    const [video, setVideo] = useState(null);
    const { mediaType, id } = useParams();

    const getVideo = async () => {
        const data = await apiCall(`/${mediaType}/${id}/videos`);
        const video = data?.results?.[0];
        setVideo(video);
    };

    useEffect(() => {
        getVideo();
    }, []);

    return(
        <div>
            <DetailsBanner video={video} />
        </div>
    );
};

export default Details;