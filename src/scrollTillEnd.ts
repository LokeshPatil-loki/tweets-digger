import type { Page } from "puppeteer";
import type { ExtractedTweet } from "./types";

export async function scrollTillEnd(
  page: Page,
  extractedTweets: ExtractedTweet[],
  totalNumberOfPosts: number
) {
  console.log("Called");
  let previousPostCount = extractedTweets.length;
  let sameCountIterations = 0;

  while (extractedTweets.length < totalNumberOfPosts) {
    await page.evaluate("window.scrollTo(0,document.body.scrollHeight)");
    await new Promise((resolve) => setTimeout(resolve, 4000));

    // Check if post count hasn't changed
    if (previousPostCount === extractedTweets.length) {
      sameCountIterations++;
      console.log(extractedTweets.length, "same count", sameCountIterations);
      if (sameCountIterations >= 20) {
        throw new Error(
          "Failed to load more posts: Post count remained same for 20 iterations"
        );
      }
    } else {
      console.log("reset counter");
      sameCountIterations = 0;
      previousPostCount = extractedTweets.length;
    }
  }
}
