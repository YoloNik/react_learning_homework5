import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useHistory,
  NavLink,
  Route,
  Switch,
  useParams,
  Link,
  useLocation,
} from 'react-router-dom';
import { getSingleMovie, getSearchedMovie } from 'service/apiService';
import styles from './MoviesPage.module.scss';

const Cast = lazy(
  () =>
    import(
      '../../components/Cast/Cast'
    ) /*webpackChankName:"Cast__component" */,
);
const Reviews = lazy(
  () =>
    import(
      '../../components/Reviews/Reviews'
    ) /*webpackChankName:"Reviews__component" */,
);

const URL_FOR_POSTER = 'https://image.tmdb.org/t/p/w500/';

function MoviesPage({ path }) {
  const [movie, setMovie] = useState([]);
  const [genres, setGanres] = useState([]);
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('Search movie by name');

  const history = useHistory();
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    if (history.location.state?.from !== '/navBar') {
      getSingleMovie(params.id).then(singleMovie => {
        setMovie(singleMovie);
        setGanres(singleMovie.genres);
      });
    }
  }, [history.location.state, params.id]);

  const hendleGoBack = () => {
    history.push('/homePage');
  };

  const clickSearchMovie = () => {
    getSearchedMovie(query).then(movie => setMovie(movie.results));
    if (movie.length > 0) {
      setMessage(`We cant find movie whith name: ${query}`);
    } else {
      setMessage('');
    }
  };

  const hendleChange = e => {
    const userInput = e.target.value;
    setQuery(userInput);
  };

  return location.state?.from === '/navBar' ? (
    <>
      <label>
        <input
          type="input"
          name="query"
          onChange={hendleChange}
          value={query}
        />
        <button type="submit" onClick={clickSearchMovie}>
          <Link
            to={{
              pathname: '/moviesPage',
              search: `?query=${query}`,
              state: { from: '/navBar', lable: `movie list` },
            }}
          >
            Search
          </Link>
        </button>
      </label>
      {movie.length === 0 && <p style={{ color: '#E0F4F5' }}>{message}</p>}

      <ul>
        {movie.map(el => {
          return (
            <li key={el.id}>
              <Link
                to={{
                  pathname: `/moviesPage/${el.id}`,
                  search: `?query=${query}`,
                  state: { from: location, lable: `movie list` },
                }}
              >
                {el.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  ) : (
    <div>
      <button className={styles.goBackBtn} onClick={hendleGoBack}>
        go back to home page
      </button>
      <div className={styles.singleMovie}>
        <img
          className={styles.singleMovie__poster}
          src={URL_FOR_POSTER + movie.poster_path}
          alt=""
        />
        <div>
          <p className={styles.singleMovie__title}>
            {movie.name || movie.title}{' '}
            {movie.release_date ? `(${movie.release_date.substr(0, 4)})` : ''}
          </p>
          <p className={styles.singleMovie__dis}>
            User score: {movie.vote_average}
          </p>

          <p className={styles.singleMovie__dis}>Overview: {movie.overview}</p>

          <p className={styles.singleMovie__dis}>
            Genres:{' '}
            {genres.map(el => {
              return <span key={el.id}>{el.name} </span>;
            })}
          </p>
        </div>
      </div>
      <div className={styles.singleMovie__additional}>
        <p className={styles.singleMovie__information}>
          Additional information
        </p>
        <ul className={styles.singleMovie__options}>
          <li className={styles.option__item}>
            <NavLink
              className={styles.option}
              to={`/moviesPage/${params.id}/cast`}
            >
              Cast
            </NavLink>
          </li>
          <li className={styles.option__item}>
            <NavLink
              className={styles.option}
              to={`/moviesPage/${params.id}/reviews`}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
        <Switch>
          <Route path={`/moviesPage/${params.id}/cast`}>
            <Suspense fallback={<div>Loading...</div>}>
              <Cast id={params.id} />
            </Suspense>
          </Route>
          <Route path={`${path}/${params.id}/reviews`}>
            <Suspense fallback={<div>Loading...</div>}>
              <Reviews id={params.id} />
            </Suspense>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default MoviesPage;
