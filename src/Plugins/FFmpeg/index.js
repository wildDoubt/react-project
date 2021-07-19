import { useEffect } from 'react';
import Downloader from '../Downloader';

const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg');

const ffmpeg = createFFmpeg({
  corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',
  log: false,
});

const Converter = () => {
  const loadable = !!window.SharedArrayBuffer;
  const downloader = new Downloader();

  const load = async () => {
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }
  };

  const convertFile = async (url) => {
    if (url !== undefined) {
      ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(url));
      ffmpeg.run(
        '-i',
        'input.mp4',
        '-vf',
        'fps=10,scale=720:-1:flags=lanczos',
        '-loop',
        '0',
        '-f',
        'gif',
        'output.gif',
        '-pix_fmt',
        'rgb24',
      ).then(() => {
        const data = ffmpeg.FS('readFile', 'output.gif');
        const gifUrl = URL.createObjectURL(
          new Blob([data.buffer], { type: 'image/gif' }),
        );
        downloader.download(gifUrl, 'gif');
      })
        .catch((e) => Error(e));
    }
  };

  useEffect(() => {
    load();
  }, []);

  return {
    loadable,
    convertFile,
  };
};
export default Converter;
