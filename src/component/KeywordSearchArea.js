import KeywordSearch from './keywordSearch.js';
import SelectedKeyword from './selectedKeyword.js';
import { routeChange } from '../router.js';
import { getSelectedKeywords, setSelectedKeywords, setSelectedKeyword, removeSelectedKeyword } from '../storage.js';

export default class KeywordSearchArea {
  constructor({ $target }) {
    this.state = {
      selectedKeywords: [],
    };
    this.$element = document.createElement('div');
    $target.appendChild(this.$element);

    this.keywordSearch = new KeywordSearch({
      $target: this.$element,
      initialState: '',
    });
    this.keywordSearch.setFocusEventListener(this.onSearchInputFocus);
    this.selectedKeyword = new SelectedKeyword({
      $target: this.$element,
      initialState: {
        items: [],
      },
    });

    //최근검색어 클릭시 이벤트 처리
    this.$element.addEventListener('click', (event) => {
      const selectIndex = Number(event.target.dataset?.index);
      const deleteIndex = Number(event.target.dataset?.deleteIndex);
      if (selectIndex >= 0) {
        const selectedKeywords = getSelectedKeywords('selectedKeywords', []);
        const keywordSearchInput = document.querySelector('.keywordSearchInput');
        const index = selectIndex;
        keywordSearchInput.value = selectedKeywords[index];
        setSelectedKeyword('selectedKeywords', keywordSearchInput.value);
        routeChange(`/search`);
      } else if (deleteIndex >= 0) {
        const nextSelectedKeywords = removeSelectedKeyword('selectedKeywords', deleteIndex);
        setSelectedKeywords('selectedKeywords', nextSelectedKeywords);
        this.setState({ selectedKeywords: nextSelectedKeywords });
      }
    });

    //Enter로 검색, 최근검색어 위아래 키보드로 이동
    this.$element.addEventListener('keyup', (event) => {
      const navigationKeys = ['Enter', 'ArrowUp', 'ArrowDown'];
      if (!navigationKeys.includes(event.key)) {
        return;
      }

      const keywordSearchInput = document.querySelector('.keywordSearchInput');
      const selectedKeywords = getSelectedKeywords('selectedKeywords', []);

      let $nowLi = document.querySelector('.keywordItemSelected');
      const lastIndex = selectedKeywords.length - 1;
      let selectedIndex;
      let nextIndex;

      if ($nowLi) {
        selectedIndex = Number($nowLi.dataset.index);
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        selectedIndex = event.key === 'ArrowUp' ? lastIndex + 1 : -1;
      }

      if (event.key === 'Enter') {
        //Enter로 검색
        setSelectedKeyword('selectedKeywords', keywordSearchInput.value);
        routeChange(`/search`);
      } else {
        if (!selectedKeywords.length) {
          return;
        }

        //최근검색어 위아래 키보드로 이동
        if (event.key === 'ArrowUp') {
          nextIndex = selectedIndex === 0 ? lastIndex : selectedIndex - 1;
        } else if (event.key === 'ArrowDown') {
          nextIndex = selectedIndex === lastIndex ? 0 : selectedIndex + 1;
        }
        keywordSearchInput.value = selectedKeywords[nextIndex];
      }

      const $nextLi = document.querySelector(`.selectedKeyword ul li[data-index='${nextIndex}']`);
      $nowLi && $nowLi.classList.remove('keywordItemSelected');
      $nextLi && $nextLi.classList.add('keywordItemSelected');
    });
  }

  setState(nextState) {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.selectedKeyword.setState({
      items: this.state.selectedKeywords,
    });
  }

  onSearchInputFocus = () => {
    this.setState({ selectedKeywords: getSelectedKeywords('selectedKeywords', []) });
  };
}
