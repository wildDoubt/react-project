import React, { useRef, useEffect } from 'react';

const StreamPreview = ({ stream }) => {
  const preview = useRef();

  useEffect(() => {
    if (preview.current && stream) {
      preview.current.srcObject = stream;
    }
  }, [stream]);

  if (!stream) {
    return <div style={{ width: 1520, height: 680 }} />;
  }
  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video ref={preview} width={1520} height={680} autoPlay />;
};

export default StreamPreview;
