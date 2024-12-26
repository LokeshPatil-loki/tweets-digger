import type { Page } from "puppeteer";
import type { ExtractedTweet } from "./types";

export async function scrollTillEnd(
  page: Page,
  extractedTweets: ExtractedTweet[],
  totalNumberOfPosts: number
) {
  console.log("Called");
  let previousPostCount = extractedTweets.length;
  let retryCount = 0;

  while (extractedTweets.length < totalNumberOfPosts) {
    await page.evaluate("window.scrollTo(0,document.body.scrollHeight)");
    await new Promise((resolve) => setTimeout(resolve, 4000));

    // Check if post count hasn't changed
    if (previousPostCount === extractedTweets.length) {
      retryCount++;
      if (retryCount >= 6) {
        throw new Error(
          "Failed to load more posts: Post count remained same for 20 iterations"
        );
      }
    } else {
      retryCount = 0;
      previousPostCount = extractedTweets.length;
    }
  }
}
