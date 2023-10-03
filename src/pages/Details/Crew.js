import { useEffect } from "react";
import { apiCall } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Crew = ({ mediaType, id }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const crew = useSelector((state) => {return(state.moviesTvShowsInfo[mediaType][id].crew)});
    const director = crew?.filter((f) => f.job === "Director");
    const writer = crew?.filter(
        (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
    );

    const getData = async () => {
        try {
            const data = await apiCall(`/${mediaType}/${id}/credits`);
            dispatch({ type: 'setCastAndCrew', payload: {mediaType, id, data} });
        } catch(err) {
            navigate('/tmdb-api-failure');
        }    
    };

    useEffect(() => {
        if(!crew)
        getData();
    }, []);

    if(!crew)
    return(null);

    return(
        <>
            {director.length > 0 && <div className="info">
                    <span className="text bold">Director:{" "}</span>
                    <span className="text">
                        {director?.map((d, i) => (
                            <span key={i}>
                                {d.name}
                                {director.length -
                                    1 !==
                                    i && ", "}
                            </span>
                        ))}
                    </span>
            </div>}
            {writer.length > 0 && <div className="info">
                    <span className="text bold">Writer:{" "}</span>
                    <span className="text">
                        {writer?.map((d, i) => (
                            <span key={i}>
                                {d.name}
                                {writer.length -
                                    1 !==
                                    i && ", "}
                            </span>
                       ))}
                   </span>
            </div>}
        </>
    );
};

export default Crew;