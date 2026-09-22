import cv2
import numpy as np

cap = cv2.VideoCapture("public/character.mp4")
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

frames = []
for i in range(total_frames):
    ret, frame = cap.read()
    if not ret:
        break
    # Crop head region: Y: 50 to 380, X: 550 to 880
    head = frame[50:380, 550:880].copy()
    cv2.putText(head, f"{i}", (10, 35), cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 255, 255), 2)
    frames.append(head)

cap.release()

# Let's create two montage images:
# Montage 1: frames 0 to 119 (sampled every 2 frames: 60 frames -> 6 rows x 10 cols)
# Montage 2: frames 120 to 239 (sampled every 2 frames: 60 frames -> 6 rows x 10 cols)

def make_montage(frame_list, rows=6, cols=10, thumb_w=165, thumb_h=165):
    grid = np.zeros((rows * thumb_h, cols * thumb_w, 3), dtype=np.uint8)
    for idx, f in enumerate(frame_list[:rows*cols]):
        r = idx // cols
        c = idx % cols
        resized = cv2.resize(f, (thumb_w, thumb_h))
        grid[r*thumb_h:(r+1)*thumb_h, c*thumb_w:(c+1)*thumb_w] = resized
    return grid

m1_frames = [frames[i] for i in range(0, 120, 2)]
m2_frames = [frames[i] for i in range(120, 240, 2)]

montage1 = make_montage(m1_frames)
montage2 = make_montage(m2_frames)

cv2.imwrite("scratch/montage_0_119.jpg", montage1)
cv2.imwrite("scratch/montage_120_239.jpg", montage2)
print("Saved scratch/montage_0_119.jpg and scratch/montage_120_239.jpg")
