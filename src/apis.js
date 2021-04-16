import axios from 'axios';

// 首頁電影條
const homePageRequest = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? '/api/v1/movies'
    : 'http://localhost:4000/api/v1/movies',
});

// 分頁電影資料
const moviePageRequest = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'api/v1/moviePages/movie'
    : 'http://localhost:4000/api/v1/moviePages/movie',
});

// 首頁電影條api
export const apiHomePageMovies = (type) => (
  homePageRequest.get(`/${type}`)
    .then((res) => (res.data))
    .catch((error) => { console.log(error); })
);

// 分頁電影資料api
export const apiMoviePageMovies = (id) => (
  moviePageRequest.get(`/${id}`)
    .then((res) => (res.data))
    .catch((error) => { console.log(error); })
);

// 以下為圖像path
// 海報
export const posterRequest = {
  baseURL: process.env.NODE_ENV === 'production'
    ? 'api/v1/images/poster'
    : 'http://localhost:4000/images/poster',
};

// 劇照
export const backdropRequest = {
  baseURL: process.env.NODE_ENV === 'production'
    ? 'api/v1/images/backdrop'
    : 'http://localhost:4000/images/backdrop',
};
// 影城
export const theaterIconRequest = {
  baseURL: process.env.NODE_ENV === 'production'
    ? 'api/v1/icons'
    : 'http://localhost:4000/icons',
};
