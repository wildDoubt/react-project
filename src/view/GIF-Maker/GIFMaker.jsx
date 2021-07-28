import { useState } from 'react';
import { Button, Col, Row } from 'antd';
import StreamPreview from './StreamPreview';
import ScreenRecorder from '../../Plugins/ScreenRecorder';
import Converter from '../../Plugins/FFmpeg';
import Downloader from '../../Plugins/Downloader';

const GIFMaker = () => {
  const {
    liveStream,
    mediaBlobUrl,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    status,
  } = ScreenRecorder();

  const downloader = new Downloader();
  const [loading, setLoading] = useState(false);

  const {
    loadable,
    convertFile,
  } = Converter();

  const renderMediaButton = () => (
    <>
      {(status === 'Idle' || status === 'Stopped') && <Button type="primary" onClick={startRecording}>record</Button>}
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
        {status === 'Paused'
          ? <p>녹화가 되고 있지 않아요!</p>
          : null}
      </Row>
      <Row justify="center">
        {renderMediaButton()}
      </Row>
      <Row justify="center" style={{ margin: '10px 0' }}>
        {status !== 'Stopped'
          ? (
            <>
              {/* 녹화 전 */}
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  downloader.download(mediaBlobUrl);
                }}
              >
                MP4
              </Button>
              <Button
                onClick={() => {
                  setLoading(true);
                  convertFile(mediaBlobUrl)
                    .then(() => {
                      setLoading(false);
                    });
                }}
                disabled={!loadable}
                loading={loading}
              >
                GIF
              </Button>
            </>
          )}
      </Row>
    </>
  );
};

export default GIFMaker;
