import KeywordSearch from './KeywordSearch.js';
import SelectedKeyword from './SelectedKeyword.js';
import { routeChange } from '../router.js';

export default class KeywordSearchArea {
  constructor({ $target }) {
    this.state = {
      selectedKeywords: [],
    };

    this.keywordSearch = new KeywordSearch({
      $target,
      initialState: '',
    });
    this.keywordSearch.setFocusEventListener(this.onSearchInputFocus);
    this.selectedKeyword = new SelectedKeyword({
      $target,
      initialState: {
        items: [],
      },
    });

    //최근검색어 클릭시 이벤트 처리
    $target.addEventListener('click', (event) => {
      if (event.target.tagName === 'LI') {
        const keywordSearchInput = document.querySelector('.keywordSearchInput');
        const index = Number(event.target.dataset.index);
        const items = ['테스트', '클론코딩', '유튜브', 'JavaScript', 'TypeScript'];
        keywordSearchInput.value = items[index];
        routeChange(`/search`);
      }
    });

    //Enter로 검색, 최근검색어 위아래 키보드로 이동
    $target.addEventListener('keyup', (event) => {
      const navigationKeys = ['Enter', 'ArrowUp', 'ArrowDown'];
      if (!navigationKeys.includes(event.key)) {
        return;
      }
      //최근검색어들 storage로 변경 필요
      const items = ['테스트', '클론코딩', '유튜브', 'JavaScript', 'TypeScript'];
      if (!items.length) {
        return;
      }

      let $nowLi = document.querySelector('.keywordItemSelected');
      const lastIndex = items.length - 1;
      let selectedIndex;
      let nextIndex;
      if ($nowLi) {
        selectedIndex = Number($nowLi.dataset.index);
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        selectedIndex = event.key === 'ArrowUp' ? lastIndex : 0;
      }

      const keywordSearchInput = document.querySelector('.keywordSearchInput');
      if (event.key === 'Enter') {
        //Enter로 검색
        routeChange(`/search`);
      } else {
        //최근검색어 위아래 키보드로 이동
        if (event.key === 'ArrowUp') {
          nextIndex = selectedIndex === 0 ? lastIndex : selectedIndex - 1;
        } else if (event.key === 'ArrowDown') {
          nextIndex = selectedIndex === lastIndex ? 0 : selectedIndex + 1;
        }
        keywordSearchInput.value = items[nextIndex];
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
    this.setState({ selectedKeywords: ['테스트', '클론코딩', '유튜브', 'JavaScript', 'TypeScript'] });
  };
}
