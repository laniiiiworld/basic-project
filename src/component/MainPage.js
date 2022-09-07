import SimpleVideo from './SimpleVideo.js';
import { getDataAPIs } from '../api.js';
import { routeChange } from '../router.js';

export default class MainPage {
  constructor({ $target, initialState }) {
    this.state = initialState;
    this.$mainPage = $target;
    this.$mainPage.className = this.state.className;
    this.state = { simpleVideos: [], channelInfo: [] };
    this.simpleVideo = new SimpleVideo({
      $target: this.$mainPage,
      initalState: { className: 'videoItem', videos: this.state.simpleVideos },
      onClick: this.onNextVideoClick,
    });
    this.init();
  }

  setState(nextState) {
    this.state = nextState;
    this.simpleVideo.setState({ className: 'videoItem', videos: this.state.simpleVideos });
  }
  init = async () => {
    try {
      const channelInfo = [];
      const simpleVideos = await this.getVideoItemInfo();
      this.setState({
        ...this.state,
        simpleVideos: simpleVideos,
        channelInfo: channelInfo,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //API에서 추천동영상 정보를 가져오는 함수
  async getVideoItemInfo() {
    try {
      const obj = {
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 5,
        regionCode: 'KR',
      };
      const simpleVideos = await getDataAPIs('VIDEO', obj);
      return simpleVideos.items;
    } catch (err) {
      console.log(err);
    }
  }

  onNextVideoClick = async (videoId) => {
    if (videoId) {
      routeChange(`/detail/${videoId}`);
    }
  };
}
