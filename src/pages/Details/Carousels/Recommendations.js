import { useNavigate, useParams } from "react-router-dom";
import Carousel from "../../../components/Carousel/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { apiCall } from "../../../utils/utils";
import { optionsForTabsOnHomePage } from "../../../constants/constants";

const Recommendations = () => {
    const {mediaType, id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector((state) => {
        const obj = state.moviesTvShowsInfo[mediaType];
        return(obj && obj[id] && obj[id].recommendations);
    });

    const getData = async () => {
        try {
            const data = await apiCall(`/${mediaType}/${id}/recommendations`);
            dispatch({ type: 'setDetails', payload: {mediaType, id, key: 'recommendations', value: data?.results}});
        } catch(err) {
            navigate('/tmdb-api-failure');
        }
    };

    useEffect(() => {
        if(!data)
        getData();
    }, [id]);

    let title;

    for(let i = 0; i < optionsForTabsOnHomePage.movieTv.length; i++) {
        if(optionsForTabsOnHomePage.movieTv[i].value === mediaType) {
            title = `Recommended ${optionsForTabsOnHomePage.movieTv[i].label}`;
            break;
        }
    }

    return (
        <Carousel
            title={title}
            data={data}
            endpoint={mediaType}
        />
    );
};

export default Recommendations;