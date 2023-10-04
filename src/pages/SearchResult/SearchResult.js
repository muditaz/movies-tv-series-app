import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiCall } from "../../utils/utils";
import Spinner from "../../components/Spinner/Spinner";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import './style.scss';
import MovieCard from "../../components/MovieCard/MovieCard";

const SearchResult = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const { query } = useParams();
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const dataResponse = await apiCall(`/search/multi?query=${query}&page=${pageNum}`);
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
        window.addEventListener('scroll', handleScroll);
        if(data && pageNum <= data.total_pages)
        getData();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [pageNum]);

    useEffect(() => {
        if(data)
        setData(null);
        if(pageNum > 1)
        setPageNum(1);
    }, [query]);

    useEffect(() => {
        if(!data)
        getData();
    }, [data]);

    return(
        <div className="searchResultsPage">
            {data ? <ContentWrapper>
                {data.results.length > 0 ? (
                    <>
                        <div className="pageTitle">
                            {`Search ${
                                        data?.total_results > 1
                                            ? "results"
                                            : "result"
                                    } of '${query}'`}
                        </div>
                        <div className="content">
                        {data?.results.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    if(!item.poster_path) return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            showGenresAndRating={false}
                                            data={item}
                                        />
                                    );
                                })}
                        </div>
                    </>
                ) : (
                    <span className="resultNotFound">Sorry, Results Not Found!!</span>
                )}
            </ContentWrapper> : <Spinner initial={true}/>}
        </div>
    );
};

export default SearchResult;