import React from 'react';
import Icon from '../images/pngegg.png';
import useViewport from '../hooks/useViewport';
import SearchBox from './SearchBox';

const NavBar = (props) => {
  const { mediaWidth } = useViewport();
  const navStyle = {
    base: {
      backgroundColor: 'rgb(0, 0, 0)',
      position: 'fixed',
      width: '100%',
      top: '0',
      left: '0',
    },
    mobile: {
      height: '50px',
    },
    laptop: {
      height: '70px',
    },
  };

  const mediaStyle = (_width) => {
    if (_width < 1024) {
      return { ...navStyle.base, ...navStyle.mobile };
    }
    return { ...navStyle.base, ...navStyle.laptop };
  };

  return (
    <div>
      <div
        className="nav-bar"
        style={mediaStyle(mediaWidth)}
      >
        <SearchBox placeholder="Find some movies ..." />
      </div>
    </div>
  );
};
export default NavBar;
