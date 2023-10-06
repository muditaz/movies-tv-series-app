import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import "./style.scss";
import { apiCall } from "../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import Spinner from '../../components/Spinner/Spinner';
import MovieCard from "../../components/MovieCard/MovieCard";
import { optionsForTabsOnHomePage, sortbyData } from "../../constants/constants";

const Explore = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const genresSelected = useSelector((state) => {return(state.genresSelected)});
    const sortbySelected = useSelector((state) => {return(state.sortbySelected)});
    const { mediaType } = useParams();
    const genresData = useSelector((state) => {return(state[`${mediaType}GenresInfo`])});

    const getData = async () => {
        try {
            let dataResponse;
            let genreURL;
            let sortbyURL;
            if(genresSelected.length > 0)
            genreURL = JSON.stringify(genresSelected.map((g) => g.id)).slice(1, -1);
            if(sortbySelected !== null)
            sortbyURL = sortbySelected.value;
            if(genresSelected.length === 0 && sortbySelected === null) {
                dataResponse = await apiCall(`/discover/${mediaType}?page=${pageNum}`);
            } else if(genresSelected.length > 0 && sortbySelected === null) {
                dataResponse = await apiCall(`/discover/${mediaType}?with_genres=${genreURL}&page=${pageNum}`);
            } else if(genresSelected.length === 0 && sortbySelected !== null) {
                dataResponse = await apiCall(`/discover/${mediaType}?sort_by=${sortbyURL}&page=${pageNum}`);
            } else {
                dataResponse = await apiCall(`/discover/${mediaType}?sort_by=${sortbyURL}&with_genres=${genreURL}&page=${pageNum}`);
            }
            dataResponse.results = [...(data ? data.results : []), ...(dataResponse.results)];
            setData(dataResponse);
        } catch(err) {
            navigate('/tmdb-api-failure');
        }
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
          setPageNum(pageNum + 1);
        }
    };

    useEffect(() => {
        setData(null);
        setPageNum(1);
    }, [mediaType]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        getData();
        return () => {window.removeEventListener('scroll', handleScroll);}
    }, [genresSelected, sortbySelected, pageNum]);

    const onChange = (selectedItems, action) => {
        dispatch({ type: 'setFieldsInExplore', payload: {key: action.name, value: selectedItems} });
        setData(null);
        setPageNum(1);
    };

    const getPageTitle = () => {
        for(let i = 0; i < optionsForTabsOnHomePage.movieTv.length; i++) {
            if(optionsForTabsOnHomePage.movieTv[i].value === mediaType)
            return(`Explore ${optionsForTabsOnHomePage.movieTv[i].label}`);
        }
    };

    return (
        <div className="explorePage">
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">{getPageTitle()}</div>
                    <div className="filters">
                        <Select
                            isMulti
                            name="genres"
                            value={genresSelected}
                            closeMenuOnSelect={false}
                            options={genresData}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            onChange={onChange}
                            placeholder="Select genres"
                            className="react-select-container genresDD"
                            classNamePrefix="react-select"
                        />
                        <Select
                            name="sortby"
                            value={sortbySelected}
                            options={sortbyData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Sort by"
                            className="react-select-container sortbyDD"
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>
                {data ? <>
                {data.results.length > 0 ? (
                    <>
                        
                        <div className="content">
                        {data?.results.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    if(!item.poster_path) return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            showGenresAndRating={true}
                                            data={item}
                                            mediaType={mediaType}
                                        />
                                    );
                                })}
                        </div>
                    </>
                ) : (
                    <span className="resultNotFound">Sorry, Results Not Found!!</span>
                )}
            </> : <Spinner initial={true}/>}
            </ContentWrapper>
        </div>
    );
};

export default Explore;