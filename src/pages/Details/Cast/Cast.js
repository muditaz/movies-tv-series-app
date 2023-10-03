import { useSelector } from "react-redux";

import "./style.scss";

import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import Img from "../../../components/LazyLoadImage/Img";
import { useParams } from "react-router-dom";

const Cast = () => {
    const { mediaType, id } = useParams();
    const imagesInfoFromTmdbApi = useSelector((state) => {return(state.imagesInfoFromTmdbApi)});
    const cast = useSelector((state) => {
        const obj = state.moviesTvShowsInfo[mediaType]; 
        return(obj && obj[id] && obj[id].cast);
    });

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    
    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {cast ? (
                    <div className="listItems">
                        {cast.map((item) => {
                            if(item.profile_path) {
                                return(
                                    <div key={item.key} className="listItem">
                                        <div className="profileImg">
                                            <Img src={imagesInfoFromTmdbApi.secure_base_url + 'original' + item.profile_path}/>
                                        </div>
                                        <div className="name">{item.name}</div>
                                        <div className="character">
                                           {item.character}
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;