export default class Downloader {
  static instance;

  constructor() {
    if (Downloader.instance) {
      return Downloader.instance;
    }
    this.aElement = document.createElement('a');
    document.body.appendChild(this.aElement);
    this.aElement.style = 'display: none';
    Downloader.instance = this;
  }

  download(url, fileExtension = 'mp4') {
    this.aElement.href = url;
    this.aElement.download = `${Date()}.${fileExtension}`;
    this.aElement.click();
  }
}
