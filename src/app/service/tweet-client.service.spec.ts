import { TestBed } from '@angular/core/testing';

import { TweetClientService } from './tweet-client.service';

describe('TweetClientService', () => {
  let service: TweetClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TweetClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
