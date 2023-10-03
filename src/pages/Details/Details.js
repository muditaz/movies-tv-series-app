import DetailsBanner from "./DetailsBanner/DetailsBanner";
import Cast from "./Cast/Cast";
import VideosSection from "./VideosSection/VideosSection";
import Similar from "./Carousels/Similar";
import Recommendations from "./Carousels/Recommendations";

const Details = () => {

    return(
        <div>
            <DetailsBanner />
            <Cast />
            <VideosSection />
            <Similar />
            <Recommendations />
        </div>
    );
};

export default Details;