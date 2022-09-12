import { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import HomePage from 'pages/HomePage/HomePage';
import MoviesPage from 'pages/MoviesPage/MoviesPage';
import { getTrandingMovies } from 'service/apiService';

function Main() {
  const [trendMovies, setTrendMovie] = useState([]);

  useEffect(() => {
    getTrandingMovies().then(movies => {
      setTrendMovie(movies);
    });
  }, []);

  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/homePage" />} />

        <Route path="/homePage">
          <HomePage trendMovies={trendMovies} />
        </Route>
        <Route exact path="/moviesPage">
          <MoviesPage />
        </Route>
        <Route path="/moviesPage/:id">
          <MoviesPage />
        </Route>
      </Switch>
    </>
  );
}

export default Main;
