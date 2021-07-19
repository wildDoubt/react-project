import { useState, useRef, useCallback } from 'react';

const ScreenRecorder = ({ downloadable }) => {
  const mediaRecorder = useRef(null);
  const mediaChunks = useRef([]);
  const mediaStream = useRef(null);

  const [status, setStatus] = useState('Idle');
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
  const [error, setError] = useState('NONE');

  const onRecordingActive = ((e) => {
    mediaChunks.current.push(e.data);
  });

  const downloadMedia = (blobUrl) => {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = blobUrl;

    a.download = `${Date()}.mp4`;
    a.click();
  };

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
    const url = URL.createObjectURL(blob);

    if (downloadable) {
      downloadMedia(url);
    }

    // window.URL.revokeObjectURL(url);
    setStatus('Stopped');
    setMediaBlobUrl(url);
  };

  const getMediaStream = useCallback(async () => {
    setStatus('setting...');

    try {
      const stream = await window.navigator.mediaDevices.getDisplayMedia({ video: { mediaSource: 'screen' } });
      mediaStream.current = stream;
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
    setError('NONE');
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
