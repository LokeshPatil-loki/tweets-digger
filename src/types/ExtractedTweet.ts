export type ExtractedTweet = {
  id: string;
  text: string;
  user: string;
  created_at: string;
  reply_count: number;
  retweet_count: number;
  favorite_count: number;
  in_reply_to_status_id: string | null;
  in_reply_to_user: string | null;
  quoted_tweet?: ExtractedTweet;
};
