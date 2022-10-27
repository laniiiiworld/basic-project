export default class SelectedKeyword {
  constructor({ $target, initialState }) {
    this.$element = document.createElement('div');
    this.$element.className = 'selectedKeyword';
    this.state = {
      items: initialState.items,
    };
    $target.appendChild(this.$element);
    this.render();

    //최근검색어 목록 mouseover 이벤트
    this.$element.addEventListener('mouseover', (event) => {
      this.onMouseover && this.onMouseover(event);
    });
    //최근검색어 목록 click 이벤트
    this.$element.addEventListener('click', (event) => {
      this.onClick && this.onClick(event);
    });
  }

  setMouseoverEventListener(onMouseover) {
    this.onMouseover = onMouseover;
  }

  setClickEventListener(onClick) {
    this.onClick = onClick;
  }

  setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  render = () => {
    const { items = [] } = this.state;

    if (items.length === 0) {
      this.$element.style.display = 'none';
      this.$element.innerHTML = '';
      return;
    }

    this.$element.style.display = 'block';
    this.$element.innerHTML = `
        <ul>
        ${items.map((item, index) => `<li data-index="${index}"><span class='keyword'>${item}</span><span class='deleteButton' data-delete-index="${index}">삭제</span></li>`).join('')}
        </ul>
      `;
  };
}
