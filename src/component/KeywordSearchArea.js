import KeywordSearch from './keywordSearch.js';
import SelectedKeyword from './selectedKeyword.js';
import { routeChange } from '../router.js';
import { getSelectedKeywords, setSelectedKeywords, setSelectedKeyword, removeSelectedKeyword } from '../service/storage.js';

export default class KeywordSearchArea {
  constructor({ $target }) {
    this.state = {
      selectedKeywords: [],
    };
    this.$target = $target;
    this.keywordSearch = new KeywordSearch({
      $target,
      initialState: '',
    });
    this.selectedKeyword = new SelectedKeyword({
      $target,
      initialState: {
        items: [],
      },
    });

    //검색어 입력란 focus -> 최근 검색어 목록 display
    this.keywordSearch.setFocusEventListener(() => {
      this.setState({ selectedKeywords: getSelectedKeywords('selectedKeywords', []) });
    });
    //검색버튼 click -> 검색
    this.keywordSearch.setBtnClickEventListener((keyword) => {
      this.moveVideoSearchPage(keyword);
    });
    //검색 영역 밖이 클릭된 경우, 최근 검색어 목록 display none
    window.addEventListener('click', (event) => {
      if (event.target.closest('.keywordSearchArea')) return;
      this.state.selectedKeywords.length && this.setState({ selectedKeywords: [] });
    });

    //최근검색어 목록에 마우스를 올린 경우
    this.selectedKeyword.setMouseoverEventListener((event) => {
      const nextIndex = Number(event.target.closest('li').dataset.index);
      const $nowLi = document.querySelector('.keywordItemSelected');
      const $nextLi = document.querySelector(`.selectedKeyword ul li[data-index='${nextIndex}']`);
      $nowLi && $nowLi.classList.remove('keywordItemSelected');
      $nextLi && $nextLi.classList.add('keywordItemSelected');
    });

    //최근검색어 목록 클릭시 이벤트 처리
    this.selectedKeyword.setClickEventListener((event) => {
      //삭제
      const deleteIndex = Number(event.target.dataset?.deleteIndex);
      if (deleteIndex >= 0) {
        const nextSelectedKeywords = removeSelectedKeyword('selectedKeywords', deleteIndex);
        setSelectedKeywords('selectedKeywords', nextSelectedKeywords);
        this.setState({ selectedKeywords: nextSelectedKeywords });
        return;
      }
      //검색
      const selectIndex = Number(event.target.closest('li').dataset.index);
      const selectedKeywords = getSelectedKeywords('selectedKeywords', []);
      const keywordSearchInput = document.querySelector('.keywordSearch .input');
      keywordSearchInput.value = selectedKeywords[selectIndex];
      this.moveVideoSearchPage(selectedKeywords[selectIndex]);
    });

    //검색 영역(검색어 입력란, 최근 검색어 목록) - 키보드 제어
    this.$target.addEventListener('keyup', (event) => {
      const navigationKeys = ['Enter', 'ArrowUp', 'ArrowDown'];
      if (!navigationKeys.includes(event.key)) {
        return;
      }

      const keywordSearchInput = document.querySelector('.keywordSearch .input');
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
        //검색
        this.moveVideoSearchPage(keywordSearchInput.value);
      } else {
        //최근검색어 목록 위아래 키보드로 이동
        if (!selectedKeywords.length) {
          return;
        }

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

  /** 비디오 검색 결과 페이지로 이동 */
  moveVideoSearchPage = (keyword) => {
    if (!keyword) return;
    setSelectedKeyword('selectedKeywords', keyword);
    routeChange(`/search`);
  };
}
