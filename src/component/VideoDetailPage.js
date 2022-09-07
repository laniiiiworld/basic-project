import Channel from './Channel.js';
import SimpleVideo from './SimpleVideo.js';
import { getDataAPIs } from '../api.js';
import VideoTest from './VideoTest.js';
import Video from './Video.js';

export default class VideoDetailPage {
  constructor({ $target, initialState, videoId }) {
    this.state = initialState;
    this.$videoDetailPage = $target;
    this.$videoDetailPage.className = this.state.className;
    this.state = { video: [], simpleVideos: [], channelInfo: [] };
    this.videoTest = new VideoTest({ $target: this.$videoDetailPage });
    this.video = new Video({ $target: this.$videoDetailPage, video: this.state.video });
    this.channel = new Channel({ $target: this.$videoDetailPage, initialState: { channelInfo: this.state.channelInfo } });
    this.simpleVideo = new SimpleVideo({
      $target: this.$videoDetailPage,
      initalState: { className: 'videoList', videos: this.state.simpleVideos },
      onClick: this.onNextVideoClick(videoId),
    });
    this.init(videoId);
  }

  setState(nextState) {
    this.state = nextState;
    this.video.setState(this.state.video);
    this.channel.setState({ channelInfo: this.state.channelInfo });
    this.simpleVideo.setState({ className: 'videoList', videos: this.state.simpleVideos });
  }

  onNextVideoClick = async (videoId) => {
    try {
      initForm();
      const video = await this.getVideoInfo(videoId);
      const channelId = video.snippet.channelId;
      const channelInfo = await this.getChannelInfo(channelId);
      const simpleVideos = await this.getVideoListInfo();
      this.setState({
        ...this.state,
        video,
        simpleVideos: simpleVideos,
        channelInfo: channelInfo,
      });
    } catch (err) {
      console.log(err);
    }
  };

  init = async (videoId) => {
    try {
      initForm();
      const video = await this.getVideoInfo(videoId);
      const channelId = video.snippet.channelId;
      const channelInfo = await this.getChannelInfo(channelId);
      const simpleVideos = await this.getVideoListInfo();
      this.setState({
        ...this.state,
        simpleVideos: simpleVideos,
        channelInfo: channelInfo,
      });
    } catch (err) {
      console.log(err);
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
      const simpleVideos = await getDataAPIs('VIDEO', obj);
      return simpleVideos.items;
    } catch (err) {
      console.log(err);
    }
  }
}

//초기화
function initForm() {
  const description = document.querySelector('.videoInfo .description .info');
  const moreBtn = document.querySelector('.videoInfo .description .moreBtn');
  const shortBtn = document.querySelector('.videoInfo .description .shortBtn');
  description.classList.remove('clamp');
  moreBtn.classList.remove('displayNone');
  shortBtn.classList.remove('displayNone');
  description.classList.add('clamp');
  shortBtn.classList.add('displayNone');
}

/*+++++++++++++++ Buttons +++++++++++++++*/
{
  // const description = document.querySelector('.videoInfo .description .info');
  // const moreBtn = document.querySelector('.videoInfo .description .moreBtn');
  // const shortBtn = document.querySelector('.videoInfo .description .shortBtn');
  // //더보기
  // moreBtn.addEventListener('click', () => {
  //   description.classList.toggle('clamp');
  //   moreBtn.classList.toggle('displayNone');
  //   shortBtn.classList.toggle('displayNone');
  // });
  // //간략히
  // shortBtn.addEventListener('click', () => {
  //   description.classList.toggle('clamp');
  //   moreBtn.classList.toggle('displayNone');
  //   shortBtn.classList.toggle('displayNone');
  // });
}
