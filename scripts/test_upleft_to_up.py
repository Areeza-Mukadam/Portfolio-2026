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

indices = [174, 175, 176, 177, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26]
thumbs = []
for idx in indices:
    f = frames[idx][50:380, 550:880].copy()
    cv2.putText(f, f"F{idx}", (5, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)
    thumbs.append(cv2.resize(f, (120, 120)))

row = np.hstack(thumbs)
cv2.imwrite("scratch/candidates/UP_LEFT_TO_UP.jpg", row)
print("Saved UP_LEFT_TO_UP.jpg")
