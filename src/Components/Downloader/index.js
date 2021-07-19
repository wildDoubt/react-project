export default class Downloader {
  static instance;

  constructor() {
    if (Downloader.instance) {
      return Downloader.instance;
    }

    Downloader.instance = this;
  }

  static download(url, fileExtension = 'mp4') {
    this.a = document.createElement('a');
    document.body.appendChild(this.a);
    this.a.style = 'display: none';
    this.a.href = url;

    this.a.download = `${Date()}.${fileExtension}`;
    this.a.click();
  }
}
