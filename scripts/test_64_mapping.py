import cv2
import numpy as np

# Define the anchor points for the 64 frames (indices 0 to 64 where 64 wraps to 0)
# Index 0: RIGHT (0 deg) -> 73
# Index 8: DOWN-RIGHT (45 deg) -> 92
# Index 16: DOWN (90 deg) -> 116
# Index 24: DOWN-LEFT (135 deg) -> 136
# Index 32: LEFT (180 deg) -> 163
# Index 40: UP-LEFT (225 deg) -> 175
# Index 48: UP (270 deg) -> 26
# Index 56: UP-RIGHT (315 deg) -> 49
# Index 64: RIGHT (360 deg) -> 73

def get_64_frame_indices():
    indices = [None] * 64
    
    # 0 to 8: 73 -> 92
    for i in range(8):
        t = i / 8.0
        indices[i] = int(round(73 + t * (92 - 73)))
        
    # 8 to 16: 92 -> 116
    for i in range(8):
        t = i / 8.0
        indices[8 + i] = int(round(92 + t * (116 - 92)))
        
    # 16 to 24: 116 -> 136
    for i in range(8):
        t = i / 8.0
        indices[16 + i] = int(round(116 + t * (136 - 116)))
        
    # 24 to 32: 136 -> 163
    for i in range(8):
        t = i / 8.0
        indices[24 + i] = int(round(136 + t * (163 - 136)))
        
    # 32 to 40: 163 -> 175
    for i in range(8):
        t = i / 8.0
        indices[32 + i] = int(round(163 + t * (175 - 163)))
        
    # 40 to 48: 175 -> 177, then 18 -> 26
    # 40: 175, 41: 176, 42: 177, 43: 18, 44: 20, 45: 22, 46: 24, 47: 25
    special_40_48 = [175, 176, 177, 18, 20, 22, 24, 25]
    for i in range(8):
        indices[40 + i] = special_40_48[i]
        
    # 48 to 56: 26 -> 49
    for i in range(8):
        t = i / 8.0
        indices[48 + i] = int(round(26 + t * (49 - 26)))
        
    # 56 to 64: 49 -> 73
    for i in range(8):
        t = i / 8.0
        indices[56 + i] = int(round(49 + t * (73 - 49)))
        
    return indices

indices = get_64_frame_indices()
print(f"Generated {len(indices)} frame indices:")
for i, idx in enumerate(indices):
    print(f"Frame {i:02d}: source {idx}")

# Let's verify by creating an animated video or contact sheet
cap = cv2.VideoCapture("public/character.mp4")
all_frames = []
while True:
    ret, frame = cap.read()
    if not ret:
        break
    all_frames.append(frame)
cap.release()

# Let's make an 8x8 contact sheet of all 64 frames!
h, w = all_frames[0].shape[:2]
thumb_w = 160
thumb_h = 90
grid = np.zeros((8 * thumb_h, 8 * thumb_w, 3), dtype=np.uint8)

for i in range(64):
    r = i // 8
    c = i % 8
    src_idx = indices[i]
    f = all_frames[src_idx].copy()
    cv2.putText(f, f"#{i:02d} (s{src_idx})", (30, 80), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0, 255, 0), 3)
    resized = cv2.resize(f, (thumb_w, thumb_h))
    grid[r*thumb_h:(r+1)*thumb_h, c*thumb_w:(c+1)*thumb_w] = resized

cv2.imwrite("scratch/all_64_frames_grid.jpg", grid)
print("Saved scratch/all_64_frames_grid.jpg")
