import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import SearchResult from './pages/SearchResult/SearchResult'
import PageNotFound from './pages/404/PageNotFound/PageNotFound';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { apiCall } from './utils/utils';
import Details from './pages/Details/Details';
import Explore from './pages/Explore/Explore';

function App() {
  const dispatch = useDispatch();
  const imagesInfoFromTmdbApi = useSelector((state) => {return(state.imagesInfoFromTmdbApi)});
  const navigate = useNavigate();

  const getImagesInfoFromTmdbApi = async () => {
    try {
      const data = await apiCall('/configuration');
      dispatch({ type: 'setImagesInfoFromTmdbApi', payload: data?.images });
    } catch(err) {
      navigate('/tmdb-api-failure');
    }
  };

  useEffect(() => {
    if(!imagesInfoFromTmdbApi)
    getImagesInfoFromTmdbApi();
  }, []);

  if(!imagesInfoFromTmdbApi)
  return;

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Details />} />
        <Route path='/search/:query' element={<SearchResult />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
