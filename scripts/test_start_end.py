import cv2
import numpy as np

cap = cv2.VideoCapture("public/character.mp4")
frames = []
while True:
    ret, frame = cap.read()
    if not ret:
        break
    frames.append(frame)
cap.release()

thumbs = []
for idx in range(0, 26, 2):
    f = frames[idx][50:380, 550:880].copy()
    cv2.putText(f, f"{idx}", (10, 35), cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 255, 255), 2)
    thumbs.append(cv2.resize(f, (150, 150)))
row = np.hstack(thumbs)
cv2.imwrite("scratch/candidates/START_0_24.jpg", row)

# Also let's inspect frames 170 to 200
thumbs2 = []
for idx in range(170, 200, 2):
    f = frames[idx][50:380, 550:880].copy()
    cv2.putText(f, f"{idx}", (10, 35), cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 255, 255), 2)
    thumbs2.append(cv2.resize(f, (150, 150)))
row2 = np.hstack(thumbs2)
cv2.imwrite("scratch/candidates/RETURN_170_198.jpg", row2)
