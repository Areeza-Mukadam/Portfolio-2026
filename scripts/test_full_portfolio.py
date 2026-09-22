import asyncio
import os
from playwright.async_api import async_playwright

os.makedirs("scratch/screenshots", exist_ok=True)

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel="msedge", headless=True)
        context = await browser.new_context(viewport={"width": 1920, "height": 1080})
        page = await context.new_page()

        print("Navigating to http://127.0.0.1:4173/ ...")
        await page.goto("http://127.0.0.1:4173/")
        await page.wait_for_timeout(2000)

        # 1. Hero Screenshot
        await page.screenshot(path="scratch/screenshots/portfolio_01_hero.png")
        print("Captured portfolio_01_hero.png")

        # 2. Scroll to Work section
        work_sec = page.locator("#work")
        await work_sec.scroll_into_view_if_needed()
        await page.wait_for_timeout(600)
        await page.screenshot(path="scratch/screenshots/portfolio_02_work.png")
        print("Captured portfolio_02_work.png")

        # 3. Scroll to About section
        about_sec = page.locator("#about")
        await about_sec.scroll_into_view_if_needed()
        await page.wait_for_timeout(600)
        await page.screenshot(path="scratch/screenshots/portfolio_03_about.png")
        print("Captured portfolio_03_about.png")

        # 4. Scroll to Contact section
        contact_sec = page.locator("#contact")
        await contact_sec.scroll_into_view_if_needed()
        await page.wait_for_timeout(600)
        await page.screenshot(path="scratch/screenshots/portfolio_04_contact.png")
        print("Captured portfolio_04_contact.png")

        # 5. Mobile Full Page
        mobile_page = await context.new_page()
        await mobile_page.set_viewport_size({"width": 390, "height": 844})
        await mobile_page.goto("http://127.0.0.1:4173/")
        await mobile_page.wait_for_timeout(2000)
        
        # Scroll to work on mobile
        await mobile_page.locator("#work").scroll_into_view_if_needed()
        await mobile_page.wait_for_timeout(500)
        await mobile_page.screenshot(path="scratch/screenshots/portfolio_05_mobile_work.png")
        print("Captured portfolio_05_mobile_work.png")

        await browser.close()
        print("Full portfolio screenshots captured!")

if __name__ == "__main__":
    asyncio.run(run())
