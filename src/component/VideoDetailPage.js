import VideoList from './VideoList.js';
import Loading from './Loading.js';
import VideoItem from './VideoItem.js';
import { routeChange } from '../router.js';

export default class VideoDetailPage {
  constructor({ $target, initialState, videoId, youtube }) {
    this.youtube = youtube;
    this.state = initialState;
    this.$videoDetailPage = $target;
    this.$videoDetailPage.className = this.state.className;
    this.state = { video: [], videoLists: [], channelInfo: [] };
    this.loading = new Loading(this.$videoDetailPage);
    this.loading.show();
    this.videoItem = new VideoItem({
      $target: this.$videoDetailPage,
      initialState: {
        video: this.state.video,
        channelInfo: this.state.channelInfo,
      },
    });
    this.videoList = new VideoList({
      $target: this.$videoDetailPage,
      initalState: { className: 'videoRow', videos: this.state.videoLists },
    });
    this.videoList.setClickEventListener(this.onNextVideoClick);
    this.init(videoId);
  }

  setState(nextState) {
    this.state = nextState;
    this.videoItem.setState({ video: this.state.video, channelInfo: this.state.channelInfo });
    this.videoList.setState({ className: 'videoRow', videos: this.state.videoLists });
  }

  onNextVideoClick = async (event) => {
    const $video = event.target.closest('.next');
    const videoId = $video.dataset?.targetId;
    videoId && routeChange(`/detail/${videoId}`);
  };

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
