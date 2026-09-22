import cv2
import numpy as np

indices = [0, 8, 16, 24, 32, 40, 48, 56]
labels = ["00: RIGHT", "08: DWN-RGT", "16: DOWN", "24: DWN-LFT", "32: LEFT", "40: UP-LFT", "48: UP", "56: UP-RGT"]

thumbs = []
for idx, label in zip(indices, labels):
    img = cv2.imread(f"public/frames/frame-{idx:03d}.webp")
    head = img[50:380, 550:880].copy()
    cv2.putText(head, label, (5, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 255), 2)
    thumbs.append(cv2.resize(head, (140, 140)))

# Also add center
c_img = cv2.imread("public/frames/center.webp")
c_head = c_img[50:380, 550:880].copy()
cv2.putText(c_head, "CENTER", (5, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
thumbs.append(cv2.resize(c_head, (140, 140)))

row = np.hstack(thumbs)
cv2.imwrite("scratch/verify_8_directions.jpg", row)
print("Saved scratch/verify_8_directions.jpg")
