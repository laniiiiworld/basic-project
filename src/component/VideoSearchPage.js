import VideoList from './VideoList.js';
import { getDataAPIs } from '../api.js';
import { routeChange } from '../router.js';
import Loading from './Loading.js';

export default class VideoSearchPage {
  constructor({ $target, initialState }) {
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
      const videoLists = await this.getVideoListInfo(keyword);
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
  async getVideoListInfo(keyword) {
    const obj = {
      videoSyndicated: true, //외부에서 재생할 수 있는 동영상만 포함
      safeSearch: 'strict',
      part: 'snippet',
      chart: 'mostPopular',
      maxResults: 5,
      regionCode: 'kr',
      type: 'video',
      q: keyword,
    };
    try {
      const videoLists = await getDataAPIs('SEARCH', obj);
      return videoLists.items;
    } catch (err) {
      this.$videoSearchPage.innerHTML = err;
    }
  }

  onNextVideoClick = (event) => {
    const $video = event.target.closest('.next');
    const videoId = $video?.dataset?.targetId;
    videoId && routeChange(`/detail/${videoId}`);
  };
}
