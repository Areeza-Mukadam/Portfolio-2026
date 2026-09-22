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

        # Character face center
        face_x = 1920 * 0.4867
        face_y = 1080 * 0.3750

        # 1. Test hover over primary CTA button (View My Work) to inspect expanded cursor
        cta = page.locator('text=View My Work')
        box = await cta.bounding_box()
        if box:
            await page.mouse.move(box["x"] + box["width"]/2, box["y"] + box["height"]/2)
            await page.wait_for_timeout(300)
            await page.screenshot(path="scratch/screenshots/test_cursor_hover_cta.png")
            print("Captured test_cursor_hover_cta.png")

        # 2. Test transition from deadzone exiting to bottom-right (45 deg)
        await page.mouse.move(face_x, face_y) # enter deadzone
        await page.wait_for_timeout(200)
        await page.mouse.move(face_x + 300, face_y + 250) # exit deadzone to bottom-right
        await page.wait_for_timeout(300)
        await page.screenshot(path="scratch/screenshots/test_exit_bottom_right.png")
        print("Captured test_exit_bottom_right.png")

        # 3. Test transition from deadzone exiting to top-left (225 deg)
        await page.mouse.move(face_x, face_y) # enter deadzone
        await page.wait_for_timeout(200)
        await page.mouse.move(face_x - 300, face_y - 250) # exit deadzone to top-left
        await page.wait_for_timeout(300)
        await page.screenshot(path="scratch/screenshots/test_exit_top_left.png")
        print("Captured test_exit_top_left.png")

        # 4. Hover over Nav pill
        nav = page.get_by_role("link", name="WORK", exact=True)
        nbox = await nav.bounding_box()
        if nbox:
            await page.mouse.move(nbox["x"] + nbox["width"]/2, nbox["y"] + nbox["height"]/2)
            await page.wait_for_timeout(300)
            await page.screenshot(path="scratch/screenshots/test_cursor_hover_nav.png")
            print("Captured test_cursor_hover_nav.png")

        await browser.close()
        print("All transition and cursor tests finished!")

if __name__ == "__main__":
    asyncio.run(run())
