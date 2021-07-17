import React, { useState } from 'react';
import { Button } from 'antd';
import config from './Config';
import StreamPreview from './StreamPreview';
import ScreenRecorder from '../../Components/ScreenRecorder';

const GIFMaker = () => {
  const [download, setDownload] = useState(false);

  const {
    liveStream,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    status,
  } = ScreenRecorder({ downloadable: download });

  const renderMediaButton = () => (
    <>
      <br />
      {(status === 'Idle' || status === 'Stopped') && <Button onClick={startRecording}>record</Button>}
      {status === 'Recording' && <Button onClick={pauseRecording}>pause</Button>}
      {status === 'Paused' && <Button onClick={resumeRecording}>resume</Button>}
      {(status === 'Recording' || status === 'Paused') && <Button onClick={stopRecording}>stop</Button>}
    </>
  );
  return (
    <>
      {StreamPreview({ stream: liveStream })}
      {config({ download, setDownload })}
      {renderMediaButton()}
    </>
  );
};

export default GIFMaker;
