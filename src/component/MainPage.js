import VideoList from './VideoList.js';
import { routeChange } from '../router.js';
import Loading from './Loading.js';

export default class MainPage {
  constructor({ $target, initialState, youtube }) {
    this.youtube = youtube;
    this.state = initialState;
    this.$mainPage = $target;
    this.$mainPage.className = this.state.className;
    this.state = { videoLists: [], channelInfo: [] };
    this.loading = new Loading(this.$mainPage);
    this.loading.show();
    this.videoList = new VideoList({
      $target: this.$mainPage,
      initalState: { className: 'videoColumn', videos: this.state.videoLists },
    });
    this.videoList.setClickEventListener(this.onNextVideoClick);
    this.init();
  }

  setState(nextState) {
    this.state = nextState;
    this.videoList.setState({ className: 'videoColumn', videos: this.state.videoLists });
  }

  init = async () => {
    try {
      const channelInfo = [];
      const videoLists = await this.youtube.videos();
      this.setState({
        ...this.state,
        videoLists: videoLists,
        channelInfo: channelInfo,
      });
    } catch (err) {
      console.log(err);
    } finally {
      this.loading.hide();
    }
  };

  onNextVideoClick = (event) => {
    const $video = event.target.closest('.next');
    const videoId = $video?.dataset?.targetId;
    videoId && routeChange(`/detail/${videoId}`);
  };
}
