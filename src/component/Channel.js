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
    const formatter = Intl.NumberFormat(navigator.language, {
      notation: 'compact',
      compactDisplay: 'short',
    });
    const subscriberCount = channelInfo.statistics.subscriberCount;
    this.subscribers.innerHTML = formatter.format(Number(subscriberCount));
    this.user.src = channelInfo.snippet.thumbnails.default.url;
    this.channelName.innerHTML = channelInfo.snippet.title;
  }
}
