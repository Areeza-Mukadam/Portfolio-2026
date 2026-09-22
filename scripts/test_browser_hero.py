import asyncio
import os
from playwright.async_api import async_playwright

os.makedirs("scratch/screenshots", exist_ok=True)

async def run():
    async with async_playwright() as p:
        # Launch using installed Microsoft Edge
        browser = await p.chromium.launch(channel="msedge", headless=True)
        context = await browser.new_context(viewport={"width": 1920, "height": 1080})
        page = await context.new_page()

        print("Navigating to http://127.0.0.1:4173/ ...")
        await page.goto("http://127.0.0.1:4173/")

        # Wait for loading screen to complete and canvas to be visible
        await page.wait_for_timeout(2000)

        # 1. Initial / Center pose
        await page.screenshot(path="scratch/screenshots/01_initial_center.png")
        print("Captured 01_initial_center.png")

        # Get character face center in viewport coordinates
        face_x = 1920 * 0.50
        face_y = 1080 * 0.368

        # 2. Move cursor UP (dx = 0, dy = -300)
        await page.mouse.move(face_x, face_y - 300)
        await page.wait_for_timeout(400)
        await page.screenshot(path="scratch/screenshots/02_look_up.png")
        print("Captured 02_look_up.png")

        # 3. Move cursor RIGHT (dx = +400, dy = 0)
        await page.mouse.move(face_x + 400, face_y)
        await page.wait_for_timeout(400)
        await page.screenshot(path="scratch/screenshots/03_look_right.png")
        print("Captured 03_look_right.png")

        # 4. Move cursor DOWN (dx = 0, dy = +350)
        await page.mouse.move(face_x, face_y + 350)
        await page.wait_for_timeout(400)
        await page.screenshot(path="scratch/screenshots/04_look_down.png")
        print("Captured 04_look_down.png")

        # 5. Move cursor LEFT (dx = -500, dy = 0)
        await page.mouse.move(face_x - 500, face_y)
        await page.wait_for_timeout(400)
        await page.screenshot(path="scratch/screenshots/05_look_left.png")
        print("Captured 05_look_left.png")

        # 6. Move cursor directly over face (Deadzone -> direct eye contact)
        await page.mouse.move(face_x, face_y)
        await page.wait_for_timeout(400)
        await page.screenshot(path="scratch/screenshots/06_deadzone_center.png")
        print("Captured 06_deadzone_center.png")

        # 7. Mobile Viewport (iPhone 14 style: 390 x 844)
        mobile_page = await context.new_page()
        await mobile_page.set_viewport_size({"width": 390, "height": 844})
        await mobile_page.goto("http://127.0.0.1:4173/")
        await mobile_page.wait_for_timeout(2000)
        await mobile_page.screenshot(path="scratch/screenshots/07_mobile_view.png")
        print("Captured 07_mobile_view.png")

        await browser.close()
        print("Browser test completed successfully!")

if __name__ == "__main__":
    asyncio.run(run())
