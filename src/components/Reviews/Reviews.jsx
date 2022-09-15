import React from 'react';
import PropTypes from 'prop-types';
import style from './Reviews.module.scss';
import { useEffect, useState } from 'react';
import { getReviews } from 'service/apiService';

function Reviews({ id }) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getReviews(id).then(movieReviews => {
      setReviews(movieReviews.results);
    });
  }, [id]);

  return (
    <>
      {reviews.length !== 0 ? (
        <ul className={style.reviewsList}>
          {reviews.map(el => (
            <li className={style.review} key={el.id}>
              <p className={style.review__author}>{el.author}</p>
              <p className={style.review__content}>{el.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={style.message}>For this movie no reviewes yet</p>
      )}
    </>
  );
}

Reviews.propTypes = {
  reviews: PropTypes.object,
};

export default Reviews;
