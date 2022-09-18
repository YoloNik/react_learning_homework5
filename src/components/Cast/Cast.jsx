import React from 'react';
import PropTypes from 'prop-types';
import style from './Cast.module.scss';
import { useEffect, useState } from 'react';
import { getCast } from 'service/apiService';

function Cast({ id }) {
  const URL_FOR_POSTER = 'https://image.tmdb.org/t/p/w500/';
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getCast(id).then(movieCast => {
      setCast(movieCast.cast);
    });
  }, [id]);

  return (
    <>
      <ul className={style.castList}>
        {cast.map(el => (
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
  id: PropTypes.string,
};

export default Cast;
