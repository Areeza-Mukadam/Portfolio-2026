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

# Let's save specific frames of interest around each direction candidate:
candidates = {
    "UP": list(range(20, 36, 2)),
    "UP_RIGHT": list(range(44, 58, 2)),
    "RIGHT": list(range(68, 80, 2)),
    "DOWN_RIGHT": list(range(86, 98, 2)),
    "DOWN": list(range(108, 120, 2)),
    "DOWN_LEFT": list(range(130, 144, 2)),
    "LEFT": list(range(156, 172, 2)),
    "UP_LEFT": list(range(172, 186, 2)),
    "CENTER": list(range(215, 239, 3))
}

import os
os.makedirs("scratch/candidates", exist_ok=True)

for direction, f_indices in candidates.items():
    thumbs = []
    for idx in f_indices:
        f = frames[idx][50:380, 550:880].copy()
        cv2.putText(f, f"{idx}", (10, 35), cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 255, 255), 2)
        thumbs.append(cv2.resize(f, (150, 150)))
    row = np.hstack(thumbs)
    cv2.imwrite(f"scratch/candidates/{direction}.jpg", row)

print("Saved candidate strips to scratch/candidates/")
