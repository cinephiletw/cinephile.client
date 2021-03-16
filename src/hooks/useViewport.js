import { React, useEffect, useState } from 'react';

const useViewport = () => {
  const [mediaWidth, setMediaWidth] = useState(window.innerWidth);
  const [mediaHeight, setMediaHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleWindowResize = () => {
      setMediaWidth(window.innerWidth);
      setMediaHeight(window.innerHeight);

    };
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return { mediaWidth, mediaHeight };
};

export default useViewport;
