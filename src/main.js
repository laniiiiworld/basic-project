'use strict';

const SERVERLESS_URL = 'https://hide-with-serverless-functions.netlify.app/';
const VIDEO_URL = `${SERVERLESS_URL}youtube/v3/videos?`;
const CHANNEL_URL = `${SERVERLESS_URL}youtube/v3/channels?`;
const EMBED_URL = 'https://www.youtube.com/embed/';

//초기화
function initForm() {
  const description = document.querySelector('.videoInfo .description .info');
  const moreBtn = document.querySelector('.videoInfo .description .moreBtn');
  const shortBtn = document.querySelector('.videoInfo .description .shortBtn');
  description.classList.remove('clamp');
  moreBtn.classList.remove('displayNone');
  shortBtn.classList.remove('displayNone');
  description.classList.add('clamp');
  shortBtn.classList.add('displayNone');
}
//API에서 데이터를 가져오는 함수
function getDataAPIs(url, obj) {
  const response = fetch(url + new URLSearchParams(obj));
  return response.then((res) => res.json());
}
//API에서 동영상 정보를 가져오는 함수
async function getVideoInfo(videoId) {
  try {
    const obj = {
      part: 'snippet',
      id: videoId,
    };
    const video = await getDataAPIs(VIDEO_URL, obj);
    initForm();
    getUpNextInfo();
    setVideoInfo(video.items[0]);
    getChannelInfo(video.items[0]);
  } catch (err) {
    console.log(err);
  }
}
//API에서 추천동영상 정보를 가져오는 함수
async function getUpNextInfo() {
  try {
    const obj = {
      part: 'snippet',
      chart: 'mostPopular',
      maxResults: 1,
      regionCode: 'KR',
    };
    const videos = await getDataAPIs(VIDEO_URL, obj);
    //추천 동영상 목록 만들기
    makeUpNexts(videos.items);
  } catch (err) {
    console.log(err);
  }
}

//API에서 채널 정보를 가져오는 함수
async function getChannelInfo(video) {
  try {
    const obj = {
      part: 'snippet,statistics',
      id: video.snippet.channelId,
    };
    const channel = await getDataAPIs(CHANNEL_URL, obj);
    setChannelInfo(channel.items[0]);
  } catch (err) {
    console.log(err);
  }
}
//추천 동영상 목록을 만드는 함수
const makeUpNexts = (videos) => {
  const upNextContainer = document.querySelector('.upNext ul');
  let upNextHtml = videos
    .map(
      (data) => `
    <li class="next" onclick="getVideoInfo('${data.id}');">
      <div class="img"><img src="${data.snippet.thumbnails.medium.url}" alt="" /></div>
      <div class="info">
        <span class="title">${data.snippet.title}</span>
        <span class="name">${data.snippet.channelTitle}</span>
      </div>
      <i class="fas fa-ellipsis-v"></i>
    </li>
    `
    )
    .join('');
  upNextContainer.innerHTML = upNextHtml;
};

//동영상 정보 세팅
const setVideoInfo = (video) => {
  //console.log('setVideoInfo ---> ', video);
  const videoPlayer = document.querySelector('.videoPlayer iframe');
  const videoTitle = document.querySelector('.videoInfo .metadata .title');
  const description = document.querySelector('.videoInfo .description .info');
  const hitsAndDays = document.querySelector('.videoInfo .hitsAndDays');
  videoPlayer.src = EMBED_URL + video.id;
  videoTitle.innerHTML = video.snippet.title;
  let str = video.snippet.description;
  //줄바꿈 변환
  str = str.replaceAll('\n', '<br/>');
  //url link로 변경
  str = str.replace(/(?:https?:\/\/)[a-zA-Z0-9\.\/\-]+/g, (link) => `<a href='${link}' target='_blank'>${link}</a>`);
  //태그들 link로 변경
  str = str.replace(/#[a-zA-Z0-9ㄱ-ㅎ가-힣]+/g, (tag) => `<a href='#'>${tag}</a>`);
  description.innerHTML = str;

  hitsAndDays.innerHTML = '';
};

//채널 정보 세팅
const setChannelInfo = (data) => {
  //console.log(`setChannelInfo --->`, data);
  const user = document.querySelector('.channelArea .info .user');
  const channelName = document.querySelector('.channelArea .channel .name');
  const subscribers = document.querySelector('.channelArea .info .channel .subscribers');
  const subscriberCount = data.statistics.subscriberCount;

  user.src = data.snippet.thumbnails.default.url;
  channelName.innerHTML = data.snippet.title;
  if (subscriberCount.length > 5) {
    subscribers.innerHTML = Math.floor((subscriberCount * 1) / 10000) + '만명';
  } else if (subscriberCount.length > 4) {
    subscribers.innerHTML = Math.floor((subscriberCount * 1) / 1000) / 10 + '만명';
  } else {
    subscribers.innerHTML = subscriberCount;
  }
};

/*+++++++++++++++ Buttons +++++++++++++++*/
{
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
//onLoad
const loadDetail = () => {
  getUpNextInfo();
};

loadDetail();
