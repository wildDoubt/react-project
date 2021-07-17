import React, {useState, useEffect, useRef, useCallback} from 'react';


const ScreenRecorder = () => {
    const mediaRecorder = useRef(null);
    const mediaChunks = useRef([]);
    const mediaStream = useRef(null);

    const [status, setStatus] = useState('Idle');
    const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
    const [error, setError] = useState('NONE');

    const onRecordingActive = ((e) => {
        mediaChunks.current.push(e.data);
    })

    const onRecordingStop = () => {
        const [chunk] = mediaChunks.current;
        // const blobProperty = Object.assign({
        //         type: chunk.type
        //     },
        //     {type: 'video/mp4'})
        const blob = new Blob(mediaChunks.current,
            {
                type: 'video/webm'
            });
        const url = URL.createObjectURL(blob);
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        a.href = url;
        a.download = 'test.webm';
        a.click();
        window.URL.revokeObjectURL(url);
        setStatus('Stopped');
        setMediaBlobUrl(url);
    }

    const getMediaStream = useCallback(async () => {
        setStatus('setting...');

        try {
            const stream = await window.navigator.mediaDevices.getDisplayMedia({video: {mediaSource:'screen'}});
            mediaStream.current = stream;
        } catch (error) {
            setError(error.name);
            setStatus('Idle');
        }
    }, [])

    const stopRecording = ()=>{
        if(mediaRecorder.current){
            if(mediaRecorder.current.state !== 'inactive'){
                setStatus('Stopping');
                mediaRecorder.current.stop();
                mediaStream.current&&
                    mediaStream.current.getTracks().forEach((track)=>track.stop());
                mediaChunks.current = [];
            }
        }
    }

    const startRecording = async () => {
        setError('NONE');
        if (!mediaStream.current) {
            await getMediaStream();
        }

        if (mediaStream.current) {
            const streamEnded = mediaStream.current
                .getTracks()
                .some(track => track.readyState === 'ended');
            if (streamEnded) {
                console.log('stream ended')
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
    }

    const pauseRecording = ()=>{
        if(mediaRecorder.current&&status==='Recording'){
            mediaRecorder.current.pause();
            setStatus('Paused');
        }
    }

    const resumeRecording = ()=>{
        if(mediaRecorder.current&&status==='Paused'){
            mediaRecorder.current.resume();
            setStatus('Recording');
        }
    }

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
        }
    };
}

export default ScreenRecorder;
