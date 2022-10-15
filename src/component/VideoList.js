import VideoItem from './VideoItem.js';
import { routeChange } from '../router.js';

export default class VideoList {
  constructor({ $target, initialState }) {
    this.state = initialState;
    this.$target = document.createElement('ul');
    this.$target.className = this.state.className;
    $target.appendChild(this.$target);

    this.$target.addEventListener('click', (event) => {
      const $video = event.target.closest('.videoItem');
      const videoId = $video.dataset?.targetId;
      videoId && routeChange(`/detail/${videoId}`);
    });
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const videos = this.state.videos;
    const displayType = this.$target.className.indexOf('list') > -1 ? 'row' : 'column';
    if (!videos) return;
    this.$target.innerHTML = '';
    videos.map((video) => {
      return new VideoItem({ $target: this.$target, initialState: { className: `videoItem ${displayType}`, video } });
    });
  }
}
