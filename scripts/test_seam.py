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

test_seq = [163, 167, 171, 174, 176, 177, 18, 20, 22, 24, 26, 32, 40, 49, 60, 73]
thumbs = []
for idx in test_seq:
    f = frames[idx][50:380, 550:880].copy()
    cv2.putText(f, f"F{idx}", (5, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)
    thumbs.append(cv2.resize(f, (120, 120)))

cv2.imwrite("scratch/candidates/TEST_ROTATION_SEAM.jpg", np.hstack(thumbs))
print("Saved TEST_ROTATION_SEAM.jpg")
