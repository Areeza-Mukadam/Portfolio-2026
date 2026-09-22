import cv2
import numpy as np

img = cv2.imread("public/frames/center.webp")
# Face is roughly centered horizontally. Let's find eye level.
# In center.webp:
# Image size is (720, 1280, 3)
h, w = img.shape[:2]
# Eyes are roughly at y = 260-280, x = 600-680 (center ~640)
# Let's crop around and save with a crosshair to visually confirm face center
vis = img.copy()
face_x = 640 # exactly center horizontally
face_y = 265 # eye level / bridge of nose

cv2.circle(vis, (face_x, face_y), 10, (0, 255, 0), -1)
cv2.circle(vis, (face_x, face_y), 150, (0, 255, 0), 2)
cv2.imwrite("scratch/face_center_test.jpg", vis)
print(f"Face center: ({face_x}, {face_y}) in {w}x{h} image -> normalized: ({face_x/w:.4f}, {face_y/h:.4f})")
