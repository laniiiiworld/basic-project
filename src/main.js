'use strict';

const SERVERLESS_URL = 'https://hide-with-serverless-functions.netlify.app/';
const VIDEO_URL = `${SERVERLESS_URL}youtube/v3/videos?`;
const CHANNEL_URL = `${SERVERLESS_URL}youtube/v3/channels?`;
const EMBED_URL = 'https://www.youtube.com/embed/';

//API에서 동영상 정보를 가져오는 함수
const getVideoInfo = (videoId) => {
  let obj = {};
  if (videoId) {
    obj = {
      part: 'snippet',
      id: videoId,
    };
  } else {
    obj = {
      part: 'snippet',
      chart: 'mostPopular',
      maxResult: 1,
      regionCode: 'KR',
    };
  }

  fetch(VIDEO_URL + new URLSearchParams(obj))
    .then((res) => res.json())
    .then((data) => {
      if (videoId) {
        console.log('getVideoInfo ---> ', data);
        //비디오가 선택되었을 때, 하나만 조회하는 경우
        setVideoInfo(data.items[0]);
        getChannelInfo(data.items[0], true);
      } else {
        //추천 동영상 목록에 보여줄 videos
        data.items.forEach((item) => {
          getChannelInfo(item);
        });
      }
    })
    .catch((err) => console.log(err));
};

//동영상 정보 세팅
const setVideoInfo = (video) => {
  console.log('setVideoInfo ---> ', video);
  const videoPlayer = document.querySelector('.videoPlayer iframe');
  const videoTitle = document.querySelector('.videoInfo .title');
  const description = document.querySelector('.videoInfo .description');
  const hitsAndDays = document.querySelector('.videoInfo .hitsAndDays');
  const tags = document.querySelector('.videoInfo .info__tags');
  videoPlayer.src = EMBED_URL + video.id;
  videoTitle.innerHTML = video.snippet.title;
  description.innerHTML = video.snippet.description;
  hitsAndDays.innerHTML = '';
  tags.innerHTML = ''; //video.snippet.tags
  const channelName = document.querySelector('.channel .name');
  channelName.innerHTML = video.snippet.channelTitle;
};

//API에서 채널 정보를 가져오는 함수
const getChannelInfo = (video, isSetChannel) => {
  fetch(
    CHANNEL_URL +
      new URLSearchParams({
        part: 'snippet,statistics',
        id: video.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      if (isSetChannel) {
        setChannelInfo(data.items[0]);
      } else {
        video.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeUpNexts(video);
      }
    });
};

//채널 정보 세팅
const setChannelInfo = (data) => {
  console.log(`setChannelInfo --->`, data);
  const user = document.querySelector('.channel .user');
  const subscribers = document.querySelector('.channel .subscribers');
  const subscriberCount = data.statistics.subscriberCount;
  user.src = data.snippet.thumbnails.default.url;
  if (subscriberCount.length > 5) {
    subscribers.innerHTML = Math.floor((subscriberCount * 1) / 10000) + '만명';
  } else if (subscriberCount.length > 4) {
    subscribers.innerHTML =
      Math.floor((subscriberCount * 1) / 1000) / 10 + '만명';
  } else {
    subscribers.innerHTML = subscriberCount;
  }
};

//추천 동영상 목록을 만드는 함수
const makeUpNexts = (data) => {
  const upNextContainer = document.querySelector('.upNext ul');
  upNextContainer.innerHTML += `
  <li class="next" onclick="getVideoInfo('${data.id}');">
    <div class="img"><img src="${data.snippet.thumbnails.high.url}" alt="" /></div>
    <div class="info">
      <span class="title">${data.snippet.title}</span>
      <span class="name">${data.snippet.channelTitle}</span>
    </div>
    <i class="fas fa-ellipsis-v"></i>
  </li>
  `;
};

//onLoad
const loadDetail = () => {
  getVideoInfo();
};

loadDetail();
