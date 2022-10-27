export default class KeywordSearch {
  constructor({ $target, initialState }) {
    this.$element = document.createElement('from');
    this.$element.className = 'keywordSearch';
    this.state = initialState;
    $target.appendChild(this.$element);

    this.render();

    const keywordSearchInput = document.querySelector('.keywordSearch .input');
    const keywordSearchBtn = document.querySelector('.keywordSearch .button');
    //검색어 입력란 focus 이벤트
    keywordSearchInput.addEventListener('focus', (event) => {
      this.onFocus && this.onFocus(event);
    });
    //검색 버튼 click 이벤트
    keywordSearchBtn.addEventListener('click', () => {
      this.onClick && this.onClick(keywordSearchInput.value);
    });
  }

  setFocusEventListener(onFocus) {
    this.onFocus = onFocus;
  }

  setBtnClickEventListener(onClick) {
    this.onClick = onClick;
  }

  render() {
    this.$element.innerHTML = `
            <input class="input" type="text" placeholder="검색" /><button class="button"><i class="fa fa-magnifying-glass"></i></button>
          `;
  }
}
