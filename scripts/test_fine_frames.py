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

# Let's inspect frames 172 to 184 every frame
strip1 = []
for idx in range(172, 185):
    f = frames[idx][50:380, 550:880].copy()
    cv2.putText(f, f"{idx}", (5, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 255), 2)
    strip1.append(cv2.resize(f, (120, 120)))
cv2.imwrite("scratch/candidates/frames_172_184.jpg", np.hstack(strip1))

# Let's inspect frames 0 to 26 every frame
strip2 = []
for idx in range(0, 27, 2):
    f = frames[idx][50:380, 550:880].copy()
    cv2.putText(f, f"{idx}", (5, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 255), 2)
    strip2.append(cv2.resize(f, (120, 120)))
cv2.imwrite("scratch/candidates/frames_0_26.jpg", np.hstack(strip2))

print("Saved detailed frames")
