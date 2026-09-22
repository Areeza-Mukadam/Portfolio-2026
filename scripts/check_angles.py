import math

def angle_to_frame_index(angle, total_frames=64):
    TWO_PI = math.pi * 2
    norm = angle % TWO_PI
    if norm < 0:
        norm += TWO_PI
    index = math.floor((norm / TWO_PI) * total_frames + 0.5) % total_frames
    return (index + total_frames) % total_frames

directions = {
    "RIGHT (dx>0, dy=0)": (1, 0),
    "DOWN-RIGHT (dx>0, dy>0)": (1, 1),
    "DOWN (dx=0, dy>0)": (0, 1),
    "DOWN-LEFT (dx<0, dy>0)": (-1, 1),
    "LEFT (dx<0, dy=0)": (-1, 0),
    "UP-LEFT (dx<0, dy<0)": (-1, -1),
    "UP (dx=0, dy<0)": (0, -1),
    "UP-RIGHT (dx>0, dy<0)": (1, -1),
}

for name, (dx, dy) in directions.items():
    angle = math.atan2(dy, dx)
    idx = angle_to_frame_index(angle)
    deg = math.degrees(angle if angle >= 0 else angle + 2*math.pi)
    print(f"{name:25s} -> angle: {deg:5.1f} deg -> frame-{idx:03d}.webp")
