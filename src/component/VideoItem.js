import Video from './Video.js';
import Channel from './Channel.js';

export default class VideoItem {
  constructor({ $target, initialState }) {
    this.$target = $target;
    this.state = initialState;
    this.render();

    this.video = new Video({ $target, video: this.state.video });
    this.channel = new Channel({ $target, initialState: { channelInfo: this.state.channelInfo } });

    /*+++++++++++++++ Buttons +++++++++++++++*/
    const description = document.querySelector('.videoInfo .description .info');
    const moreBtn = document.querySelector('.videoInfo .description .moreBtn');
    const shortBtn = document.querySelector('.videoInfo .description .shortBtn');
    //더보기
    moreBtn.addEventListener('click', () => {
      description.classList.toggle('clamp');
      moreBtn.classList.toggle('displayNone');
      shortBtn.classList.toggle('displayNone');
    });
    //간략히
    shortBtn.addEventListener('click', () => {
      description.classList.toggle('clamp');
      moreBtn.classList.toggle('displayNone');
      shortBtn.classList.toggle('displayNone');
    });
  }

  setState(nextState) {
    this.state = nextState;
    this.video.setState(this.state.video);
    this.channel.setState({ channelInfo: this.state.channelInfo });
  }

  render() {
    this.$target.innerHTML = `      
    <article class="videoArea">
      <section class="videoPlayer">
        <iframe src="" frameborder="0"></iframe>
      </section>
      <!-- ++++++++++++++++++ video info ++++++++++++++++++ -->
      <section class="videoInfo">
        <!-- +++++++++ metadata +++++++++ -->
        <div class="metadata">
          <span class="title"></span>
          <i class="fa-solid fa-angle-down moreBtn"></i>
        </div>
        <span class="hitsAndDays"></span>
        <!-- +++++++++ icons +++++++++ -->
        <ul class="icons">
          <li>
            <button>
              <i class="fa-regular fa-thumbs-up active"></i>
              <span>0</span>
            </button>
          </li>
          <li>
            <button>
              <i class="fa-regular fa-thumbs-down"></i>
              <span>0</span>
            </button>
          </li>
          <li>
            <button>
              <i class="fas fa-share active"></i>
              <span>공유</span>
            </button>
          </li>
          <li>
            <button>
              <i class="fa-solid fa-download active"></i>
              <span>오프라인 저장</span>
            </button>
          </li>
          <li>
            <button>
              <i class="fas fa-plus active"></i>
              <span>저장</span>
            </button>
          </li>
        </ul>
        <hr />
        <!-- +++++++++ channel info +++++++++ -->
        <div class="channelArea">
          <div class="info">
            <img src="i" alt="" class="user" />
            <div class="channel">
              <span class="name"></span>
              <span class="subscribers"></span>
            </div>
          </div>
          <div class="buttons">
            <button class="btn__subscription">구독</button>
            <i class="fa-solid fa-bell"></i>
          </div>
        </div>
        <div class="description">
          <div class="info clamp"></div>
          <button class="moreBtn">더보기</button>
          <button class="shortBtn displayNone">간략히</button>
        </div>
      </section>
      <hr />
    </article>
  `;
  }
}
