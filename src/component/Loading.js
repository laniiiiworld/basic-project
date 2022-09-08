export default class Loading {
  constructor($target) {
    this.$target = document.createElement('div');
    this.$target.className = 'Loading';
    $target.appendChild(this.$target);
    this.render();
  }

  show() {
    this.$target.style.display = 'block';
  }
  hide() {
    this.$target.style.display = 'none';
  }

  render() {
    this.$target.innerHTML = `<div class="content"></div>`;
    this.show();
  }
}
