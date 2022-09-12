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
import {
  getCast,
  getSingleMovie,
  getReviews,
  getSearchedMovie,
} from 'service/apiService';
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

function MoviesPage() {
  const [movie, setMovie] = useState([]);
  const [genres, setGanres] = useState([]);
  const [cast, setCast] = useState();
  const [reviews, setReviews] = useState();
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('Search movie by name');
  const history = useHistory();
  const { search } = useLocation();
  const params = useParams();

  console.log(search);

  useEffect(() => {
    if (history.location.state?.from !== '/homePage') {
      getSingleMovie(params.id).then(singleMovie => {
        setMovie(singleMovie);
        setGanres(singleMovie.genres);
      });
      //console.log(movie.genres.map(el => el.name));
      getCast(params.id).then(movieCast => setCast(movieCast));
      getReviews(params.id).then(movieReviews => setReviews(movieReviews));
    }
  }, [history.location.state, params.id]);

  const hendleGoBack = () => {
    history.push('/homePage');
  };

  const clickSearchMovie = () => {
    getSearchedMovie(query).then(movie => setMovie(movie.results));
    if (movie.length === 0) {
      setMessage(`We cant find movie whith name: ${query}`);
    } else {
      setMessage('');
    }
  };

  const hendleChange = e => {
    const userInput = e.target.value;
    setQuery(userInput);
  };

  return history.location.state?.from === '/homePage' ? (
    <>
      <label>
        <input
          type="input"
          name="query"
          onChange={hendleChange}
          value={query}
        />
        <button type="submit" onClick={clickSearchMovie}>
          Search
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

                  state: { from: '/moviesPageSearch' },
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
        go back
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
              <Cast cast={cast} />
            </Suspense>
          </Route>
          <Route path={`/moviesPage/${params.id}/reviews`}>
            <Suspense fallback={<div>Loading...</div>}>
              <Reviews reviews={reviews} />
            </Suspense>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default MoviesPage;
