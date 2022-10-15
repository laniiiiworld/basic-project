import App from './component/app.js';
import Youtube from './service/youtube.js';

const youtube = new Youtube();
new App({ $app: document.querySelector('.App'), youtube });
