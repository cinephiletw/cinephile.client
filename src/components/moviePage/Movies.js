import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CastList from './CastList';

// 這是個別電影頁設計

const Movies = (props) => {
  // 參數網址
  const { match } = props;
  const [movieInfo, setMovieInfo] = useState([{ title: 'loading', content: 'loading' }]);
  const [castInfo, setCastInfo] = useState([null]);
  const backDropPath = `http://localhost:4000/images/backdrop/image_path_${match.params.movieId}/${match.params.movieId}_0.jpg`;
  const posterPath = `http://localhost:4000/images/poster/poster_path_${match.params.movieId}.jpg`;

  // 頁面
  const layoutStyle = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  };
  // 主容器
  const coverStyle = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    zIndex: '2',
    height: '630px',
    width: '1120px',
    backgroundColor: 'rgb(10, 10, 10)',
    overflow: 'hidden',
  };
  // 背景照片
  const backDropStyle = {
    position: 'absolute',
    height: '746px',
    width: '1120px',
    zIndex: '1',
    opacity: '0.15',
  };
  // 海報
  const posterStyle = {
    position: 'absolute',
    left: '5%',
    height: '420px',
    width: '280px',
    zIndex: '3',
  };
  // 標題
  const titleStyle = {
    position: 'absolute',
    top: '10%',
    left: '35%',
    zIndex: '3',
    fontSize: '30pt',
    color: '#FFFFFF',
    opacity: '1',
  };
  // 介紹文字
  const textStyle = {
    position: 'absolute',
    top: '30%',
    left: '35%',
    width: '60%',
    zIndex: '3',
    fontSize: '14pt',
    fontFamily: 'THeiti Light',
    color: '#FFFFFF',
    opacity: '1',
  };
  // 導演
  const directorStyle = {
    position: 'absolute',
    top: '45%',
    left: '35%',
    width: '60%',
    zIndex: '3',
    fontSize: '13pt',
    color: '#FFFFFF',
    opacity: '1',
  };

  // 演員標題
  const castTitleStyle = {
    position: 'absolute',
    top: '50%',
    left: '35%',
    width: '8%',
    zIndex: '3',
    fontSize: '12pt',
    fontFamily: 'THeiti Light',
    color: 'rgb(200, 200, 200)',
    opacity: '1',
  };

  // 演員陣容
  const castStyle = {
    position: 'absolute',
    top: '50.1%',
    left: '42%',
    width: '55%',
    zIndex: '3',
    fontSize: '12pt',
    fontFamily: 'THeiti Light',
    color: '#FFFFFF',
    opacity: '1',
  };
  // 電影公司
  const companyStyle = {
    position: 'absolute',
    top: '55%',
    left: '35%',
    width: '60%',
    zIndex: '3',
    fontSize: '12.5pt',
    color: '#FFFFFF',
    opacity: '1',
  };

  // 接API 取得電影資訊
  const fetchMoviesData = () => (
    axios.get(`http://localhost:4000/moviePages/movies/${match.params.movieId}`)
      .then((res) => (res.data))
      .catch((error) => { console.log(error); })
  );

  useEffect(() => {
    const fetchData = async () => {
      const [movieData] = await Promise.all([
        fetchMoviesData(),
      ]);
      setMovieInfo(movieData.data[0]);
      setCastInfo(movieData.data[0].cast);
    };
    fetchData();
  }, []);
  // const castList = castInfo.map((item) => (` ${item.name_tw}( ${item.name_en} )`));
  return (
    <div style={layoutStyle}>
      <div style={coverStyle}>
        <img src={backDropPath} alt="backdrop" style={backDropStyle} />
        <img src={posterPath} alt="poster" style={posterStyle} />
        <h3 style={titleStyle}>{movieInfo.title}</h3>
        <h3 style={textStyle}>{movieInfo.content}</h3>
        <CastList castList={castInfo} />
      </div>
    </div>
  );
};

// <h3 style={castStyle}>{castList.toString()}</h3>
// <h3 style={castTitleStyle}>演員陣容：</h3>

Movies.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      movieId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Movies;
