import { TweetResult } from "./TweetResult";

export type EntryContent = {
  entryType: string;
  itemContent: {
    itemType: string;
    tweet_results: {
      result: TweetResult;
    };
  };
};

export type Entry = {
  content: EntryContent;
};
