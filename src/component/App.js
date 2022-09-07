import { init } from '../router.js';
import Header from './Header.js';
import MainPage from './MainPage.js';
import VideoDetailPage from './VideoDetailPage.js';

export default class App {
  constructor($app) {
    this.$header = new Header({ $target: $app, initialState: {} });
    this.$page = document.createElement('main');
    $app.appendChild(this.$page);
    init(this.route);
    this.route();
    //브라우저에서 뒤로가기, 앞으로가기 등으로 URL이 변경된 경우 감지
    window.addEventListener('popstate', this.route);
  }

  route = () => {
    const { pathname } = location;
    this.$page.innerHTML = '';
    if (pathname === '/') {
      new MainPage({ $target: this.$page, initialState: { className: 'mainPage' } });
    } else if (pathname.indexOf('/detail') === 0) {
      const videoId = pathname.split('/')[2];
      new VideoDetailPage({ $target: this.$page, initialState: { className: 'videoDetailPage' }, videoId });
    }
  };
}
