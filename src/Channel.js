export default class Channel {
  constructor({ $app, initialState }) {
    this.state = initialState;
    this.user = document.querySelector('.channelArea .info .user');
    this.channelName = document.querySelector('.channelArea .channel .name');
    this.subscribers = document.querySelector('.channelArea .info .channel .subscribers');
  }
  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  render() {
    //채널 정보 세팅 setChannelInfo
    const channelInfo = this.state.channelInfo;
    if (channelInfo.length === 0) return;
    const subscriberCount = channelInfo.statistics.subscriberCount;
    this.user.src = channelInfo.snippet.thumbnails.default.url;
    this.channelName.innerHTML = channelInfo.snippet.title;

    if (subscriberCount.length > 5) {
      this.subscribers.innerHTML = Math.floor((subscriberCount * 1) / 10000) + '만명';
    } else if (subscriberCount.length > 4) {
      this.subscribers.innerHTML = Math.floor((subscriberCount * 1) / 1000) / 10 + '만명';
    } else {
      this.subscribers.innerHTML = subscriberCount;
    }
  }
}
