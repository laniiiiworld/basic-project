import { init } from '../router.js';
import MainPage from './MainPage.js';
import VideoDetailPage from './VideoDetailPage.js';

export default class App {
  constructor($app) {
    this.$app = $app;
    init(this.route);
    this.route();
    //브라우저에서 뒤로가기, 앞으로가기 등으로 URL이 변경된 경우 감지
    window.addEventListener('popstate', this.route);
  }

  route = () => {
    const { pathname } = location;
    this.$app.innerHTML = '';
    if (pathname === '/') {
      new MainPage({ $target: this.$app });
    } else if (pathname.indexOf('/detail') === 0) {
      const videoId = pathname.split('/')[2];
      new VideoDetailPage({ $target: this.$app, videoId });
    }
  };
}
