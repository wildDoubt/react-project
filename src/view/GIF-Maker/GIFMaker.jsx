import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
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
          {StreamPreview({ stream: liveStream })}
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
              {/* 녹화 종료 */}
            </>
          )}
      </Row>
    </>
  );
};

export default GIFMaker;
