import VideoList from './VideoList.js';
import { routeChange } from '../router.js';
import Loading from './Loading.js';

export default class VideoSearchPage {
  constructor({ $target, initialState, youtube }) {
    this.youtube = youtube;
    this.state = initialState;
    this.$videoSearchPage = $target;
    this.$videoSearchPage.className = this.state.className;
    this.state = { videoLists: [], channelInfo: [] };
    this.loading = new Loading(this.$videoSearchPage);
    this.loading.show();
    this.videoList = new VideoList({
      $target: this.$videoSearchPage,
      initalState: { className: 'videoRow', videos: this.state.videoLists },
    });
    this.videoList.setClickEventListener(this.onNextVideoClick);
    this.init();
  }

  setState(nextState) {
    this.state = nextState;
    this.videoList.setState({ className: 'videoRow', videos: this.state.videoLists });
  }

  init = async () => {
    try {
      const keyword = document.querySelector('.keywordSearchInput').value;
      const channelInfo = [];
      const videoLists = await this.youtube.search(keyword);
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
