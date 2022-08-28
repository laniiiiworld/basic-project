export default class SimpleVideo {
  constructor({ $app, initalState, onClick }) {
    this.state = initalState;
    this.onClick = onClick;
    this.$target = document.querySelector('.upNext ul');

    this.$target.addEventListener('click', (event) => {
      const $video = event.target.closest('.next');
      onClick($video.dataset.targetId);
    });
  }
  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  render() {
    const videos = this.state.videos;
    if (!videos) return;
    //  onclick="getVideoInfo('${data.id}');"
    const upNextHtml = videos
      .map(
        (data) => `<li class="next" data-target-id="${data.id}" >
                    <div class="img"><img src="${data.snippet.thumbnails.medium.url}" alt="" /></div>
                    <div class="info">
                      <span class="title">${data.snippet.title}</span>
                      <span class="name">${data.snippet.channelTitle}</span>
                    </div>
                    <i class="fas fa-ellipsis-v"></i>
                  </li>
                  `
      )
      .join('');
    this.$target.innerHTML = upNextHtml;
  }
}
