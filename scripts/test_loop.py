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

# Let's compare frame 26 (UP) with frames 184, 186, 188, 190, 192, 194
f26 = frames[26][50:380, 550:880]

thumbs = [cv2.resize(f26, (150, 150))]
cv2.putText(thumbs[0], "F26 UP", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)

for idx in [175, 180, 184, 186, 188, 190, 192, 194]:
    f = frames[idx][50:380, 550:880].copy()
    cv2.putText(f, f"F{idx}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)
    thumbs.append(cv2.resize(f, (150, 150)))

row = np.hstack(thumbs)
cv2.imwrite("scratch/candidates/LOOP_CHECK.jpg", row)
print("Saved LOOP_CHECK.jpg")
