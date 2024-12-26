import puppeteer from "puppeteer";
import { extractTweetsAndReplies } from "./extract";
import { ExtractedTweet, RootObject } from "./types";
import { scrollTillEnd } from "./scrollTillEnd";
import { Cookies } from "./cookies";
import { writeDataToFile } from "./writeDataToFile";

export const scrapeTweetsOfUser = async (
  username: string,
  auth_token: string,
  executablePath = "/usr/bin/chromium"
) => {
  let totalNumberOfPosts = 0;
  const extractedTweets: ExtractedTweet[] = [];

  const browser = await puppeteer.launch({
    executablePath,
    headless: false, // Keeps the browser visible
  });

  const page = await browser.newPage();
  const cookies = Cookies(auth_token);
  await page.setCookie(...cookies);

  const scrapeComplete = new Promise<void>((resolve, reject) => {
    let scrapingFinished = false;
    page.on("response", async (response) => {
      try {
        const url = response.url();
        if (url.includes("SearchTimeline")) {
          if (response.status() !== 200) {
            resolve();
          }
          const data: RootObject = await response.json();
          const extractedData = extractTweetsAndReplies(data);
          extractedData.forEach((tweet) => {
            extractedTweets.push(tweet);
            // console.clear();
          });
          console.log(`${extractedTweets.length}/${totalNumberOfPosts}`);
          await writeDataToFile("./data.json", extractedTweets);

          if (extractedTweets.length >= totalNumberOfPosts) {
            scrapingFinished = true;
            resolve();
          }
        }

        if (url.includes("UserByScreenName")) {
          const resJson = await response.json();
          totalNumberOfPosts = resJson.data.user.result.legacy.statuses_count;
          console.log(`Number of Posts: ${totalNumberOfPosts}`);
          await page.goto(
            `https://x.com/search?q=(from%3A${username})&src=typed_query&f=live`,
            { waitUntil: "networkidle2" }
          );
          await scrollTillEnd(page, extractedTweets, totalNumberOfPosts);
          resolve();
        }
      } catch (error) {
        console.log(response.status());
        resolve();
      }
    });
  });

  await page.goto(`https://x.com/${username}`, { waitUntil: "networkidle2" });

  // Wait for the scraping to finish
  await scrapeComplete;

  // Close the browser
  await browser.close();

  // Return the extracted tweets
  return extractedTweets;
};
