import { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import HomePage from 'pages/HomePage/HomePage';
import MoviesPage from 'pages/MoviesPage/MoviesPage';
import { getTrandingMovies } from 'service/apiService';

function Main() {
  const [trendMovies, setTrendMovie] = useState([]);
  const params = useParams();

  useEffect(() => {
    getTrandingMovies().then(movies => {
      setTrendMovie(movies);
    });
    //console.log(params);
  }, []);

  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/homePage" />} />

        <Route path="/homePage">
          <HomePage trendMovies={trendMovies} path="/homePage" />
        </Route>
        <Route path="/moviesPage/:id">
          <MoviesPage path="/moviesPage" />
        </Route>
        <Route path="/moviesPage">
          <MoviesPage path="/moviesPage" />
        </Route>
      </Switch>
    </>
  );
}

export default Main;
