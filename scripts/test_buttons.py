import asyncio
import os
from playwright.async_api import async_playwright

os.makedirs("scratch/screenshots", exist_ok=True)

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel="msedge", headless=True)
        context = await browser.new_context(viewport={"width": 1920, "height": 1080})
        page = await context.new_page()

        await page.goto("http://127.0.0.1:4173/")
        await page.wait_for_timeout(2000)

        # Scroll to Work section
        await page.locator("#work").scroll_into_view_if_needed()
        await page.wait_for_timeout(600)
        await page.screenshot(path="scratch/screenshots/button_test_work.png")
        print("Captured button_test_work.png")

        # Scroll to Contact section
        await page.locator("#contact").scroll_into_view_if_needed()
        await page.wait_for_timeout(600)
        await page.screenshot(path="scratch/screenshots/button_test_contact.png")
        print("Captured button_test_contact.png")

        await browser.close()
        print("Done!")

if __name__ == "__main__":
    asyncio.run(run())
