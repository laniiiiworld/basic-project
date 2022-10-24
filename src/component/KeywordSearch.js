import { routeChange } from '../router.js';
import { setSelectedKeyword } from '../service/storage.js';

export default class KeywordSearch {
  constructor({ $target, initialState }) {
    this.$element = document.createElement('from');
    this.$element.className = 'keywordSearch';
    this.state = initialState;
    $target.appendChild(this.$element);

    this.render();

    const keywordSearchInput = document.querySelector('.keywordSearch .input');
    const keywordSearchBtn = document.querySelector('.keywordSearch .button');
    //검색어 입력란 focus
    keywordSearchInput.addEventListener('focus', (event) => {
      this.onFocus && this.onFocus(event);
    });
    //검색
    keywordSearchBtn.addEventListener('click', (event) => {
      setSelectedKeyword('selectedKeywords', keywordSearchInput.value);
      routeChange(`/search`);
    });
  }

  setFocusEventListener(onFocus) {
    this.onFocus = onFocus;
  }

  render() {
    this.$element.innerHTML = `
            <input class="input" type="text" placeholder="검색" /><button class="button"><i class="fa fa-magnifying-glass"></i></button>
          `;
  }
}
