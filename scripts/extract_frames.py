import cv2
import os
from PIL import Image

video_path = "public/character.mp4"
output_dir = "public/frames"
os.makedirs(output_dir, exist_ok=True)

cap = cv2.VideoCapture(video_path)
if not cap.isOpened():
    print(f"Error opening video {video_path}")
    exit(1)

all_frames = []
while True:
    ret, frame = cap.read()
    if not ret:
        break
    all_frames.append(frame)
cap.release()

print(f"Loaded {len(all_frames)} frames from {video_path}")

# Anchor mapping for 64 frames (clockwise starting from 0 deg = RIGHT)
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

# Save 64 directional frames
for i, src_idx in enumerate(indices):
    frame_bgr = all_frames[src_idx]
    frame_rgb = cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2RGB)
    pil_img = Image.fromarray(frame_rgb)
    out_path = os.path.join(output_dir, f"frame-{i:03d}.webp")
    pil_img.save(out_path, "WEBP", quality=92, method=6)

print("Exported 64 frames (frame-000.webp to frame-063.webp)")

# Save center frame (neutral front smiling pose at frame 227)
center_bgr = all_frames[227]
center_rgb = cv2.cvtColor(center_bgr, cv2.COLOR_BGR2RGB)
center_img = Image.fromarray(center_rgb)
center_path = os.path.join(output_dir, "center.webp")
center_img.save(center_path, "WEBP", quality=92, method=6)
print("Exported center.webp (source frame 227)")

# Verify all files
expected_files = [f"frame-{i:03d}.webp" for i in range(64)] + ["center.webp"]
missing = [f for f in expected_files if not os.path.exists(os.path.join(output_dir, f))]
if missing:
    print(f"Error: Missing files: {missing}")
else:
    print(f"Successfully generated all {len(expected_files)} WebP frames in {output_dir}/")
    # Print sample file size
    sample_size = os.path.getsize(os.path.join(output_dir, "frame-000.webp"))
    total_size = sum(os.path.getsize(os.path.join(output_dir, f)) for f in expected_files)
    print(f"Sample frame size: {sample_size / 1024:.1f} KB")
    print(f"Total size for all 65 frames: {total_size / (1024 * 1024):.2f} MB")
