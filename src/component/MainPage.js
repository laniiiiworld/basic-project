import VideoList from './VideoList.js';
import { getDataAPIs } from '../api.js';
import { routeChange } from '../router.js';
import Loading from './Loading.js';

export default class MainPage {
  constructor({ $target, initialState }) {
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
      const videoLists = await this.getVideoListInfo();
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

  //API에서 추천동영상 정보를 가져오는 함수
  async getVideoListInfo() {
    try {
      const obj = {
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 5,
        regionCode: 'KR',
      };
      const videoLists = await getDataAPIs('VIDEO', obj);
      return videoLists.items;
    } catch (err) {
      console.log(err);
    }
  }

  onNextVideoClick = (event) => {
    const $video = event.target.closest('.next');
    const videoId = $video.dataset?.targetId;
    videoId && routeChange(`/detail/${videoId}`);
  };
}
