export default class VideoList {
  constructor({ $target, initalState }) {
    this.state = initalState;
    this.$target = document.createElement('section');
    this.$target.className = this.state.className;
    $target.appendChild(this.$target);

    this.$target.addEventListener('click', (event) => {
      this.onClick && this.onClick(event);
    });
  }
  setClickEventListener(onClick) {
    this.onClick = onClick;
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  render() {
    const videos = this.state.videos;
    if (!videos) return;
    const videoListHtml = `<ul>${videos
      .map(
        (data) => `<li class="next" data-target-id="${data.id}" >
                    <div class="img"><img src="${data.snippet.thumbnails.medium.url}" alt="" /></div>
                    <div class="infoAndIcon">
                      <div class="info">
                        <span class="title">${data.snippet.title}</span>
                        <span class="name">${data.snippet.channelTitle}</span>
                      </div>
                      <i class="fas fa-ellipsis-v"></i>
                    </div>
                  </li>
                  `
      )
      .join('')}</ul>`;
    this.$target.innerHTML = videoListHtml;
  }
}
