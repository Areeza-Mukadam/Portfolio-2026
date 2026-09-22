import cv2
import numpy as np

img = cv2.imread("public/frames/center.webp")
vis = img[200:360, 560:700].copy()

# Add a grid with coordinate labels
# x in crop: 0 corresponds to 560, 40 to 600, 80 to 640
for x_orig in range(570, 700, 10):
    xc = x_orig - 560
    color = (0, 255, 0) if x_orig % 20 == 0 else (100, 100, 100)
    cv2.line(vis, (xc, 0), (xc, 160), color, 1)
    if x_orig % 20 == 0:
        cv2.putText(vis, str(x_orig), (xc - 12, 15), cv2.FONT_HERSHEY_SIMPLEX, 0.35, (0, 255, 0), 1)

for y_orig in range(210, 360, 10):
    yc = y_orig - 200
    color = (0, 255, 0) if y_orig % 20 == 0 else (100, 100, 100)
    cv2.line(vis, (0, yc), (140, yc), color, 1)
    if y_orig % 20 == 0:
        cv2.putText(vis, str(y_orig), (5, yc - 2), cv2.FONT_HERSHEY_SIMPLEX, 0.35, (0, 255, 0), 1)

cv2.imwrite("scratch/face_grid.jpg", vis)
print("Saved face_grid.jpg")
