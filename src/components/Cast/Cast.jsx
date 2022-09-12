import React from 'react';
import PropTypes from 'prop-types';
import style from './Cast.module.scss';

const URL_FOR_POSTER = 'https://image.tmdb.org/t/p/w500/';

function Cast({ cast }) {
  return (
    <>
      <ul className={style.castList}>
        {cast.cast.map(el => (
          <li className={style.actor} key={el.id}>
            <img
              className={style.actor__img}
              loading="lazy"
              src={URL_FOR_POSTER + el.profile_path}
              alt={el.name}
            />
            <p className={style.actor__dis}>{el.name}</p>
            <p className={style.actor__dis}>{el.character}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

Cast.propTypes = {
  cast: PropTypes.object,
};

export default Cast;
