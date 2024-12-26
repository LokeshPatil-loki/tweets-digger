import type { ExtractedTweet, RootObject, TweetResult } from "./types";
// Function to extract tweets and replies
export function extractTweetsAndReplies(data: RootObject): ExtractedTweet[] {
  const tweets: ExtractedTweet[] = [];

  // Navigate through the JSON structure to find the entries
  const entries =
    data.data.search_by_raw_query.search_timeline.timeline.instructions.find(
      (instruction) => instruction.type === "TimelineAddEntries"
    )?.entries;

  if (!entries) return tweets;

  // Helper function to extract a tweet from a TweetResult
  function extractTweetFromResult(tweetResult: TweetResult): ExtractedTweet {
    const tweet: ExtractedTweet = {
      id: tweetResult?.rest_id,
      text: tweetResult?.legacy?.full_text,
      user: tweetResult?.core?.user_results?.result?.legacy?.screen_name,
      created_at: tweetResult?.legacy?.created_at,
      reply_count: tweetResult?.legacy?.reply_count,
      retweet_count: tweetResult?.legacy?.retweet_count,
      favorite_count: tweetResult?.legacy?.favorite_count,
      in_reply_to_status_id: tweetResult?.legacy?.in_reply_to_status_id_str,
      in_reply_to_user: tweetResult?.legacy?.in_reply_to_screen_name,
    };

    // Check for quoted tweet
    if (tweetResult?.quoted_status_result) {
      tweet.quoted_tweet = extractTweetFromResult(
        tweetResult.quoted_status_result?.result
      );
    }

    return tweet;
  }

  // Iterate over each entry to extract tweet details
  entries.forEach((entry) => {
    if (
      entry.content.entryType === "TimelineTimelineItem" &&
      entry.content.itemContent.itemType === "TimelineTweet"
    ) {
      const tweetResult = entry.content.itemContent.tweet_results.result;
      const tweet = extractTweetFromResult(tweetResult);
      tweets.push(tweet);
    }
  });

  return tweets;
}
