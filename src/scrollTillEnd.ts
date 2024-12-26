import type { Page } from "puppeteer";

export async function scrollTillEnd(
  page: Page,
  currentPostCount: number,
  totalNumberOfPosts: number
) {
  while (currentPostCount < totalNumberOfPosts) {
    // const previousHeight = await page.evaluate("document.body.scrollHeight");
    await page.evaluate("window.scrollTo(0,document.body.scrollHeight)");
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}
