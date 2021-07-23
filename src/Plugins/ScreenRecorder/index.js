import { useCallback, useRef, useState } from 'react';

const ScreenRecorder = () => {
  const mediaRecorder = useRef(null);
  const mediaChunks = useRef([]);
  const mediaStream = useRef(null);

  const [status, setStatus] = useState('Idle');
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
  const [error, setError] = useState('NONE');

  const onRecordingActive = ((e) => {
    mediaChunks.current.push(e.data);
  });

  const clearMediaStream = () => {
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => track.stop());
      mediaStream.current = null;
    }
  };

  const onRecordingStop = () => {
    clearMediaStream();
    const blob = new Blob(mediaChunks.current,
      {
        type: mediaChunks.current[0].type,
      });
    console.log(`${(blob.size / 1024).toFixed(3)}KB`);
    const url = URL.createObjectURL(blob);

    // window.URL.revokeObjectURL(url);
    setStatus('Stopped');
    setMediaBlobUrl(url);
  };

  const getMediaStream = useCallback(async () => {
    setStatus('setting...');

    try {
      mediaStream.current = await window.navigator.mediaDevices.getDisplayMedia({ video: { mediaSource: 'screen' } });
    } catch (e) {
      setError(e.name);
      setStatus('Idle');
    }
  }, []);

  const stopRecording = () => {
    if (mediaRecorder.current) {
      if (mediaRecorder.current.state !== 'inactive') {
        setStatus('Stopped');
        mediaRecorder.current.stop();
        clearMediaStream();
        mediaChunks.current = [];
      }
    }
  };

  const startRecording = async () => {
    clearMediaStream();
    setError('NONE');
    if (mediaBlobUrl) {
      window.URL.revokeObjectURL(mediaBlobUrl);
      setMediaBlobUrl(null);
    }
    if (!mediaStream.current) {
      await getMediaStream();
    }

    if (mediaStream.current) {
      const streamEnded = mediaStream.current
        .getTracks()
        .some((track) => track.readyState === 'ended');
      if (streamEnded) {
        await getMediaStream();
      }
      mediaRecorder.current = new MediaRecorder(mediaStream.current);
      mediaRecorder.current.ondataavailable = onRecordingActive;
      mediaRecorder.current.onstop = onRecordingStop;
      mediaRecorder.current.onerror = () => {
        setError('NO_RECORDER');
        setStatus('Idle');
      };
      mediaRecorder.current.start();
      setStatus('Recording');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorder.current && status === 'Recording') {
      mediaRecorder.current.pause();
      setStatus('Paused');
    }
  };

  const resumeRecording = () => {
    if (mediaRecorder.current && status === 'Paused') {
      mediaRecorder.current.resume();
      setStatus('Recording');
    }
  };

  return {
    startRecording,
    mediaBlobUrl,
    stopRecording,
    error,
    status,
    pauseRecording,
    resumeRecording,
    get liveStream() {
      if (mediaStream.current) {
        // return new MediaStream(mediaStream.current.getVideoTracks());
        return mediaStream.current;
      }
      return null;
    },
  };
};

export default ScreenRecorder;
