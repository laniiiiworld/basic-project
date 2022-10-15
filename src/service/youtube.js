const SERVERLESS_URL = 'https://hide-with-serverless-functions.netlify.app/';
const VIDEO_URL = `${SERVERLESS_URL}youtube/v3/videos?`;
const CHANNEL_URL = `${SERVERLESS_URL}youtube/v3/channels?`;
const SEARCH_URL = `${SERVERLESS_URL}youtube/v3/search?`;

export default class Youtube {
  /** 메인 페이지 - 비디오들 */
  videos = async () => {
    const obj = {
      part: 'snippet',
      videoSyndicated: true,
      chart: 'mostPopular',
      maxResults: 25,
      regionCode: 'KR',
    };
    try {
      const videoLists = await getAPIData(VIDEO_URL, obj);
      return videoLists.items;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  /** 검색 페이지 - 조회결과 */
  search = async (keyword) => {
    const obj = {
      type: 'video',
      videoSyndicated: true, //외부에서 재생할 수 있는 동영상만 포함
      part: 'snippet',
      maxResults: 25,
      regionCode: 'kr',
      q: keyword,
      safeSearch: 'strict',
    };
    try {
      const videoLists = await getAPIData(SEARCH_URL, obj);
      return videoLists.items;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  /** 상세 페이지 - 비디오 */
  videoDetail = async (videoId) => {
    const obj = {
      id: videoId,
      part: 'snippet',
    };
    try {
      const video = await getAPIData(VIDEO_URL, obj);
      return video.items[0];
    } catch (err) {
      throw new Error(err.message);
    }
  };

  /** 상세 페이지 - 채널 */
  videoChannel = async (channelId) => {
    const obj = {
      id: channelId,
      part: 'snippet,statistics',
    };
    try {
      const channel = await getAPIData(CHANNEL_URL, obj);
      return channel.items[0];
    } catch (err) {
      throw new Error(err.message);
    }
  };
}

/** API에서 데이터 가져오기 */
const getAPIData = async (url, obj) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  try {
    let response = await fetch(url + new URLSearchParams(obj), requestOptions);
    if (!response.ok) {
      throw new Error(`${response.status}|API를 가져올 수 없습니다.`);
    }
    const myJson = response.json();
    return myJson;
  } catch (error) {
    throw new Error(error.message);
  }
};
