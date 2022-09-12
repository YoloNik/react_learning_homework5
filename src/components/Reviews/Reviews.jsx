import React from 'react';
import PropTypes from 'prop-types';
import style from './Reviews.module.scss';

function Reviews({ reviews }) {
  const resultsList = reviews.results;
  return (
    <>
      <ul className={style.reviewsList}>
        {resultsList.map(el => (
          <li className={style.review} key={el.id}>
            <p className={style.review__author}>{el.author}</p>
            <p className={style.review__content}>{el.content}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

Reviews.propTypes = {
  reviews: PropTypes.object,
};

export default Reviews;
