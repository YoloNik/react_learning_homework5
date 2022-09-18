import axios from 'axios';

const MAIN_URL = 'https://api.themoviedb.org/';
const API_KEY = 'api_key=df8eaa7d666a95e9b3954327da3d6aac';

const getTrandingMovies = async () => {
  try {
    const trendingMovies = await axios
      .get(`${MAIN_URL}3/trending/all/day?${API_KEY}`)
      .then(res => {
        const trend = res.data.results;
        return trend;
      });
    return trendingMovies;
  } catch (error) {
    console.log(error);
  }
};

const getSingleMovie = async movieId => {
  try {
    const singleMovie = await axios
      .get(`${MAIN_URL}3/movie/${movieId}?${API_KEY}`)
      .then(res => {
        const movie = res.data;
        return movie;
      });
    return singleMovie;
  } catch (error) {
    console.log(error);
  }
};

const getSearchedMovie = async query => {
  try {
    const searchedMovie = await axios
      .get(`${MAIN_URL}3/search/movie?query=${query}&${API_KEY}`)
      .then(res => {
        const movie = res.data;
        return movie;
      });
    return searchedMovie;
  } catch (error) {
    console.log(error);
  }
};

const getCast = async movieId => {
  try {
    const cast = await axios
      .get(`${MAIN_URL}3/movie/${movieId}/credits?${API_KEY}`)
      .then(res => res.data);
    return cast;
  } catch (error) {
    console.log(error);
  }
};

const getReviews = async movieId => {
  try {
    const reviews = await axios
      .get(`${MAIN_URL}3/movie/${movieId}/reviews?${API_KEY}`)
      .then(res => res.data);
    return reviews;
  } catch (error) {
    console.log(error);
  }
};

export {
  getTrandingMovies,
  getSingleMovie,
  getSearchedMovie,
  getCast,
  getReviews,
};
