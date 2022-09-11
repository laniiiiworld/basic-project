import { routeChange } from '../router.js';
import KeywordSearchArea from './KeywordSearchArea.js';

export default class Header {
  constructor({ $target, initialState }) {
    this.$header = document.createElement('header');
    this.state = initialState;
    $target.appendChild(this.$header);
    this.render();
    this.$keywordSearchArea = new KeywordSearchArea({
      $target: document.querySelector('.keywordSearchArea'),
    });
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', (event) => {
      routeChange(`/`);
    });
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  render() {
    this.$header.innerHTML = `
          <div class="logo">
            <i class="fa-brands fa-youtube"></i>
            <span class="name">YouTube</span>
          </div>
          <div class="keywordSearchArea">
          </div>
          <ul class="icons">
          </ul>
        `;
  }
}
