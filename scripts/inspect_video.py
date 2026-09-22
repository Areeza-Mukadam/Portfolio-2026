import cv2
import numpy as np
import os
import json

video_path = "public/character.mp4"
cap = cv2.VideoCapture(video_path)

if not cap.isOpened():
    print(f"Error opening video {video_path}")
    exit(1)

fps = cap.get(cv2.CAP_PROP_FPS)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
duration = total_frames / fps if fps > 0 else 0

print(f"FPS: {fps}")
print(f"Total Frames: {total_frames}")
print(f"Dimensions: {width}x{height}")
print(f"Duration: {duration:.2f}s")

# Sample background color from corners of the first frame and several frames
corners = []
frames = []

for i in range(total_frames):
    ret, frame = cap.read()
    if not ret:
        break
    frames.append(frame)
    # top-left corner 20x20, top-right 20x20
    tl = frame[0:20, 0:20]
    tr = frame[0:20, -20:]
    bl = frame[-20:, 0:20]
    br = frame[-20:, -20:]
    corners.extend([tl, tr, bl, br])

cap.release()

corners_np = np.concatenate([c.reshape(-1, 3) for c in corners], axis=0)
median_bgr = np.median(corners_np, axis=0).astype(int)
mean_bgr = np.mean(corners_np, axis=0).astype(int)
# OpenCV is BGR, convert to RGB
median_rgb = [int(median_bgr[2]), int(median_bgr[1]), int(median_bgr[0])]
hex_color = f"#{median_rgb[0]:02x}{median_rgb[1]:02x}{median_rgb[2]:02x}".upper()

print(f"Background BGR: {median_bgr.tolist()}")
print(f"Background RGB: {median_rgb}")
print(f"Background HEX: {hex_color}")

# Save a contact sheet or individual sample frames to inspect
os.makedirs("scratch/inspect_frames", exist_ok=True)
step = max(1, total_frames // 40)
for idx in range(0, total_frames, step):
    cv2.imwrite(f"scratch/inspect_frames/frame_{idx:04d}.jpg", frames[idx])

# Save also the last 15 frames to check the center / neutral pose at the end
for idx in range(max(0, total_frames - 20), total_frames):
    cv2.imwrite(f"scratch/inspect_frames/frame_{idx:04d}.jpg", frames[idx])

print(f"Extracted preview frames to scratch/inspect_frames")
