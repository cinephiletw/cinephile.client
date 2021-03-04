import { React, useEffect, useState } from 'react';

const useViewport = () => {
  const [mediaWidth, setMediaWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setMediaWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return { mediaWidth };
};

export default useViewport;
