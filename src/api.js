const SERVERLESS_URL = 'https://hide-with-serverless-functions.netlify.app/';
const VIDEO_URL = `${SERVERLESS_URL}youtube/v3/videos?`;
const CHANNEL_URL = `${SERVERLESS_URL}youtube/v3/channels?`;

//API에서 데이터를 가져오는 함수
export async function getDataAPIs(arg, obj) {
  const url = arg === 'VIDEO' ? VIDEO_URL : CHANNEL_URL;
  try {
    const res = await fetch(url + new URLSearchParams(obj));
    if (!res.ok) {
      throw new Error('동영상 정보를 가져오는 데 실패했습니다.');
    }
    const myJson = res.json();
    return myJson;
  } catch (e) {
    throw new Error(`동영상 정보를 가져오는 데 실패했습니다. ${e.message}`);
  }
}
