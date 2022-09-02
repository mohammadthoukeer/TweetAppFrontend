import { UserTweetFilterPipe } from './user-tweet-filter.pipe';

describe('UserTweetFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new UserTweetFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
