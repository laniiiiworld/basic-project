import VideoList from './VideoList.js';
import { getDataAPIs } from '../api.js';
import Loading from './Loading.js';
import VideoItem from './VideoItem.js';

export default class VideoDetailPage {
  constructor({ $target, initialState, videoId }) {
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
    try {
      const video = await this.getVideoInfo(videoId);
      const channelId = video.snippet.channelId;
      const channelInfo = await this.getChannelInfo(channelId);
      const videoLists = await this.getVideoListInfo();
      this.setState({
        ...this.state,
        video,
        videoLists: videoLists,
        channelInfo: channelInfo,
      });
    } catch (err) {
      console.log(err);
    }
  };

  init = async (videoId) => {
    try {
      const video = await this.getVideoInfo(videoId);
      const channelId = video.snippet.channelId;
      const channelInfo = await this.getChannelInfo(channelId);
      const videoLists = await this.getVideoListInfo();
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

  //API에서 동영상 정보를 가져오는 함수
  async getVideoInfo(videoId) {
    try {
      const obj = {
        part: 'snippet',
        id: videoId,
      };
      const video = await getDataAPIs('VIDEO', obj);
      return video.items[0];
    } catch (err) {
      console.log(err);
    }
  }

  //API에서 채널 정보를 가져오는 함수
  async getChannelInfo(channelId) {
    try {
      const obj = {
        part: 'snippet,statistics',
        id: channelId,
      };
      const channel = await getDataAPIs('CHANNEL', obj);
      return channel.items[0];
    } catch (err) {
      console.log(err);
    }
  }

  //API에서 추천동영상 정보를 가져오는 함수
  async getVideoListInfo() {
    try {
      const obj = {
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 3,
        regionCode: 'KR',
      };
      const videoLists = await getDataAPIs('VIDEO', obj);
      return videoLists.items;
    } catch (err) {
      console.log(err);
    }
  }
}
