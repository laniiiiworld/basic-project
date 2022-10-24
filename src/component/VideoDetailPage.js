import VideoList from './videoList.js';
import Loading from './loading.js';
import VideoDetail from './videoDetail.js';

export default class VideoDetailPage {
  constructor({ $target, initialState, videoId, youtube }) {
    this.youtube = youtube;
    this.state = initialState;
    this.$videoDetailPage = $target;
    this.$videoDetailPage.className = this.state.className;
    this.state = { video: [], videoLists: [], channelInfo: [] };
    this.loading = new Loading(this.$videoDetailPage);
    this.loading.show();
    this.videoDetail = new VideoDetail({
      $target: this.$videoDetailPage,
      initialState: {
        video: this.state.video,
        channelInfo: this.state.channelInfo,
      },
    });
    this.videoList = new VideoList({
      $target: this.$videoDetailPage,
      initialState: { className: 'videoList list', videos: this.state.videoLists },
    });
    this.init(videoId);
  }

  setState(nextState) {
    this.state = nextState;
    this.videoDetail.setState({ video: this.state.video, channelInfo: this.state.channelInfo });
    this.videoList.setState({ className: 'videoList list', videos: this.state.videoLists });
  }

  init = async (videoId) => {
    try {
      const video = await this.youtube.videoDetail(videoId);
      const channelId = video.snippet.channelId;
      const channelInfo = await this.youtube.videoChannel(channelId);
      const videoLists = await this.youtube.videos();
      this.setState({
        ...this.state,
        video,
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
