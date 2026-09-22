import cv2
import numpy as np

cap = cv2.VideoCapture("public/character.mp4")
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

bg_color = np.array([34, 12, 16], dtype=np.uint8) # BGR

motion_info = []

ret, prev_frame = cap.read()
prev_gray = cv2.cvtColor(prev_frame, cv2.COLOR_BGR2GRAY)

diffs = []
for i in range(1, total_frames):
    ret, frame = cap.read()
    if not ret:
        break
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    diff = cv2.absdiff(gray, prev_gray)
    diff_val = np.mean(diff)
    diffs.append((i, diff_val))
    prev_gray = gray

cap.release()

print("Diffs summary:")
diff_arr = np.array([d[1] for d in diffs])
print(f"Mean diff: {diff_arr.mean():.2f}, Max diff: {diff_arr.max():.2f}, Min diff: {diff_arr.min():.2f}")

# Let's find character bounding box
diff_from_bg = np.linalg.norm(prev_frame.astype(float) - bg_color.astype(float), axis=2)
char_mask = diff_from_bg > 20
y_indices, x_indices = np.where(char_mask)
print(f"Character bounding box: X: [{x_indices.min()}, {x_indices.max()}], Y: [{y_indices.min()}, {y_indices.max()}]")
print(f"Image dimensions: 1280 wide, 720 high")
print(f"Character center X: {(x_indices.min() + x_indices.max()) / 2:.1f}, Top Y: {y_indices.min()}, Bottom Y: {y_indices.max()}")
