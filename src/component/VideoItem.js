export default class VideoItem {
  constructor({ $target, initialState }) {
    this.state = initialState;
    this.$target = document.createElement('li');
    this.$target.className = this.state.className;
    $target.appendChild(this.$target);
    this.render();
  }
  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const video = this.state.video;
    if (!video) return;
    const videoHtml = `
        <div class="thumbnail">
          <img class="thumbnailImg" src="${video.snippet.thumbnails.medium.url}" alt="" />
        </div>
        <div class="info">
          <span class="title">${video.snippet.title}</span>
          <span class="channelTitle">${video.snippet.channelTitle}</span>
        </div>
    `;
    this.$target.dataset.targetId = `${video.id?.videoId ? video.id.videoId : video.id}`;
    this.$target.innerHTML = videoHtml;
  }
}
