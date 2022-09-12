import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './HomePageStyles.module.scss';

const URL_FOR_POSTER = 'https://image.tmdb.org/t/p/w500/';

function HomePage({ trendMovies }) {
  const [trendMovie, setTrendMovie] = useState([]);

  useEffect(() => {
    setTrendMovie(trendMovies);
  }, [trendMovies]);

  return (
    <div className={style.homePage}>
      <h1 className={style.homePageTitle}>trending movies</h1>
      <ul className={style.movieList}>
        {trendMovie.map(movie => (
          <li key={movie.id} id={movie.id} className={style.singleMovie}>
            <Link
              className={style.singleMovie__link}
              to={{
                pathname: `/moviesPage/${movie.id}`,
                state: { from: '/homePageCard' },
              }}
            >
              <img
                className={style.singleMovie__poster}
                src={URL_FOR_POSTER + movie.poster_path}
                alt={movie.name || movie.title}
              />
              <p className={style.singleMovie__title}>
                {movie.name || movie.title}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

HomePage.propTypes = {
  trendMovies: PropTypes.array.isRequired,
};

export default HomePage;
