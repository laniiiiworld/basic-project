import { routeChange } from '../router.js';

export default class SelectedKeyword {
  constructor({ $target, initialState }) {
    this.$element = document.createElement('div');
    this.$element.className = 'selectedKeyword';
    this.state = {
      items: initialState.items,
    };

    $target.appendChild(this.$element);
    this.render();

    //최근검색어에 마우스를 올린 경우 제어
    this.$element.addEventListener('mouseover', (event) => {
      const nextIndex = Number(event.target.dataset.index);
      const $nowLi = document.querySelector('.keywordItemSelected');
      const $nextLi = document.querySelector(`.selectedKeyword ul li[data-index='${nextIndex}']`);
      $nowLi && $nowLi.classList.remove('keywordItemSelected');
      $nextLi && $nextLi.classList.add('keywordItemSelected');
    });
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
        ${items.map((item, index) => `<li class="" data-index="${index}">${item}</li>`).join('')}
        </ul>
      `;
  };
}
