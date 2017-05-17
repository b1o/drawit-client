import { WebRtcChatPage } from './app.po';

describe('web-rtc-chat App', () => {
  let page: WebRtcChatPage;

  beforeEach(() => {
    page = new WebRtcChatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
