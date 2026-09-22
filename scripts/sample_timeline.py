import cv2
import numpy as np
import os

# Let's create a contact sheet of frames sampled every 4 frames (60 frames total)
# and also inspect face movement or save frames with frame numbers written on them
os.makedirs("scratch/frame_grid", exist_ok=True)

cap = cv2.VideoCapture("public/character.mp4")
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

frames = []
for i in range(total_frames):
    ret, frame = cap.read()
    if not ret:
        break
    # Put frame index in top-left
    f_annotated = frame.copy()
    cv2.putText(f_annotated, f"F: {i}", (30, 60), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (255, 255, 255), 3)
    frames.append(f_annotated)

cap.release()

# Let's save every 3rd or 4th frame, or make a montage
# 240 frames: let's save thumbnails every 5 frames: 0, 5, 10, ...
for i in range(0, total_frames, 3):
    cv2.imwrite(f"scratch/frame_grid/frame_{i:03d}.jpg", frames[i])

print("Saved frames sampled every 3 frames")
