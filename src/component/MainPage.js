import VideoList from './videoList.js';
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
      initialState: { className: 'videoList grid', videos: this.state.videoLists },
    });
    this.init();
  }

  setState(nextState) {
    this.state = nextState;
    this.videoList.setState({ className: 'videoList grid', videos: this.state.videoLists });
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
}
