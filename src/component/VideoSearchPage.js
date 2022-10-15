import VideoList from './videoList.js';
import { routeChange } from '../router.js';
import Loading from './loading.js';

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
      initialState: { className: 'videoList list', videos: this.state.videoLists },
    });
    this.init();
  }

  setState(nextState) {
    this.state = nextState;
    this.videoList.setState({ className: 'videoList list', videos: this.state.videoLists });
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
}
