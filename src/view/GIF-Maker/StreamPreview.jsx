import { useState, useRef, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const StreamPreview = ({ stream, streamStatus, mediaUrl }) => {
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth / 1.7);
  const [currentHeight, setCurrentHeight] = useState(window.innerHeight / 1.7);

  const preview = useRef();

  const updateWindowDimensions = () => {
    const newWidth = window.innerWidth / 1.7;
    const newHeight = window.innerHeight / 1.7;

    setCurrentWidth(newWidth);
    setCurrentHeight(newHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions);
    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    };
  }, []);

  useEffect(() => {
    if (preview.current && mediaUrl && streamStatus === 'Stopped') {
      preview.current.src = mediaUrl;
      preview.current.controls = true;
    }
  }, [mediaUrl]);

  useEffect(() => {
    if (preview.current && stream && streamStatus !== 'Stopped') {
      preview.current.srcObject = stream;
      preview.current.controls = false;
    } else {
      preview.current.srcObject = null;
    }
  }, [stream]);

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      ref={preview}
      width={currentWidth}
      height={currentHeight}
      autoPlay
      loop
      playsInline
      controls={false}
      style={{ padding: 'auto' }}
    />
  );
};

export default StreamPreview;
