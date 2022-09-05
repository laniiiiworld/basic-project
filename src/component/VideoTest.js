export default class VideoTest {
  constructor({ $target }) {
    $target.innerHTML = `      
    <article class="videoArea">
      <section class="videoPlayer">
        <iframe src="video/IMG_4637.mp4" frameborder="0"></iframe>
      </section>
      <!-- ++++++++++++++++++ video info ++++++++++++++++++ -->
      <section class="videoInfo">
        <!-- +++++++++ metadata +++++++++ -->
        <div class="metadata">
          <span class="title">똘이 코골이 영상🐶 대낮주의!!!</span>
          <i class="fa-solid fa-angle-down moreBtn"></i>
        </div>
        <span class="hitsAndDays">조회수 3209회 2달 전</span>
        <!-- +++++++++ icons +++++++++ -->
        <ul class="icons">
          <li>
            <button>
              <i class="fa-regular fa-thumbs-up active"></i>
              <span>532</span>
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
            <img src="imgs/user2.jpeg" alt="" class="user" />
            <div class="channel">
              <span class="name">똘이언니</span>
              <span class="subscribers">구독자 10만명</span>
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
