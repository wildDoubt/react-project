import React, { useState, useRef, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const StreamPreview = ({ stream }) => {
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth / 2);
  const [currentHeight, setCurrentHeight] = useState(window.innerHeight / 2);

  const preview = useRef();

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth / 2;
      const newHeight = window.innerHeight / 2;
      setCurrentWidth(newWidth);
      setCurrentHeight(newHeight);
    };

    window.addEventListener('resize', updateWindowDimensions);
    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    };
  }, []);

  useEffect(() => {
    if (preview.current && stream) {
      preview.current.srcObject = stream;
    }
  }, [stream]);

  return (
    { stream }
      // eslint-disable-next-line jsx-a11y/media-has-caption
      ? <video ref={preview} width={currentWidth} height={currentHeight} autoPlay style={{ padding: 'auto' }} />
      : <div style={{ width: currentWidth, height: currentHeight, padding: 'auto' }} />
  );
};

export default StreamPreview;
