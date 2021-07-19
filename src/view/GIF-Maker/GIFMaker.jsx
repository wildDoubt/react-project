import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import config from './Config';
import StreamPreview from './StreamPreview';
import ScreenRecorder from '../../Plugins/ScreenRecorder';
import Converter from '../../Plugins/FFmpeg';

const GIFMaker = () => {
  const [download, setDownload] = useState(false);

  const {
    liveStream,
    mediaBlobUrl,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    status,
  } = ScreenRecorder({ downloadable: download });

  const {
    convertFile,
  } = Converter();

  const renderMediaButton = () => (
    <>
      {(status === 'Idle' || status === 'Stopped') && <Button onClick={startRecording}>record</Button>}
      {status === 'Recording' && <Button onClick={pauseRecording}>❚❚</Button>}
      {status === 'Paused' && <Button onClick={resumeRecording}>▶</Button>}
      {(status === 'Recording' || status === 'Paused') && <Button onClick={() => { stopRecording(); }}>■</Button>}
    </>
  );

  return (
    <>
      <Row justify="center" style={{ padding: '10px 0' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          {StreamPreview({
            stream: liveStream,
            streamStatus: status,
            mediaUrl: mediaBlobUrl,
          })}
        </Col>
      </Row>
      <Row justify="center">
        {config({ download, setDownload })}
      </Row>
      <Row justify="center">
        {status === 'Paused'
          ? <p>녹화가 되고 있지 않아요!</p>
          : null}
      </Row>

      <Row justify="center" style={{ margin: '10px 0' }}>
        {renderMediaButton()}
        {status !== 'Stopped'
          ? (
            <>
              {/* 녹화 전 */}
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  convertFile(mediaBlobUrl);
                }}
              >
                변환
              </Button>
            </>
          )}
      </Row>
    </>
  );
};

export default GIFMaker;
