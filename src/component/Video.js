const EMBED_URL = 'https://www.youtube.com/embed/';

export default class Video {
  constructor({ $app, initialState }) {
    this.state = initialState;
    this.videoPlayer = document.querySelector('.videoPlayer iframe');
    this.videoTitle = document.querySelector('.videoInfo .metadata .title');
    this.description = document.querySelector('.videoInfo .description .info');
    this.hitsAndDays = document.querySelector('.videoInfo .hitsAndDays');
  }
  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  render() {
    //동영상 정보 세팅 setVideoInfo
    const video = this.state;
    this.videoPlayer.src = EMBED_URL + video.id;
    this.videoTitle.innerHTML = video.snippet.title;
    let str = video.snippet.description;
    //줄바꿈 변환
    str = str.replaceAll('\n', '<br/>');
    //url link로 변경
    str = str.replace(/(?:https?:\/\/)[a-zA-Z0-9\.\/\-]+/g, (link) => `<a href='${link}' target='_blank'>${link}</a>`);
    //태그들 link로 변경
    str = str.replace(/#[a-zA-Z0-9ㄱ-ㅎ가-힣]+/g, (tag) => `<a href='#'>${tag}</a>`);
    this.description.innerHTML = str;

    this.hitsAndDays.innerHTML = '';
  }
}
