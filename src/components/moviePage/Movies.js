import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import NameList from './NameList';

// 這是個別電影頁設計

const Movies = (props) => {
  // 參數網址
  const { match } = props;
  const [movieInfo, setMovieInfo] = useState([{ title: 'loading', content: 'loading' }]);
  const [castInfo, setCastInfo] = useState([null]);
  const [directorInfo, setDirectorInfo] = useState([null]);
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
    background: 'rgb(0, 0, 0)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    zIndex: '1',
    height: '630px',
    width: '1120px',
    overflow: 'hidden',
  };
  // 背景照片
  const backDropStyle = {
    position: 'absolute',
    height: '746px',
    width: '1120px',
    zIndex: '2',
  };
  // 漸層
  const transpaStyle = {
    background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1))',
    position: 'absolute',
    display: 'flex',
    zIndex: '3',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  };
  // 海報
  const posterStyle = {
    position: 'absolute',
    left: '5%',
    height: '420px',
    width: '280px',
    zIndex: '4',
  };
  // 標題
  const titleStyle = {
    position: 'absolute',
    top: '15%',
    left: '35%',
    zIndex: '3',
    fontSize: '30pt',
    color: '#FFFFFF',
    opacity: '1',
  };
  // 介紹文字
  const textStyle = {
    position: 'absolute',
    top: '40%',
    left: '35%',
    width: '60%',
    zIndex: '3',
    fontSize: '14pt',
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
      setDirectorInfo(movieData.data[0].director);
    };
    fetchData();
  }, []);

  return (
    <div style={layoutStyle}>
      <div style={coverStyle}>
        <img src={backDropPath} alt="backdrop" style={backDropStyle} />
        <div style={transpaStyle} />
        <img src={posterPath} alt="poster" style={posterStyle} />
        <h3 style={titleStyle}>{movieInfo.title}</h3>
        <h3 style={textStyle}>{movieInfo.content}</h3>
        <NameList nameList={directorInfo} height={65} titleType="導演監製：" />
        <NameList nameList={castInfo} height={72} titleType="演員陣容：" />
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
