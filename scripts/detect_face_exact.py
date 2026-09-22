import cv2
import numpy as np

img = cv2.imread("public/frames/center.webp")
# Let's crop x: 550 to 730, y: 150 to 400
# and print coordinates
# We can find the nose tip and eye centers
# Let's use cv2 CascadeClassifier for eyes or face
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
faces = face_cascade.detectMultiScale(gray, 1.1, 4)
for (x, y, w, h) in faces:
    print(f"Detected face: x={x}, y={y}, w={w}, h={h} -> Center: ({x + w/2}, {y + h/2})")
    face_roi = gray[y:y+h, x:x+w]
    eyes = eye_cascade.detectMultiScale(face_roi)
    for (ex, ey, ew, eh) in eyes:
        eye_center_x = x + ex + ew/2
        eye_center_y = y + ey + eh/2
        print(f"  Detected eye: ({eye_center_x}, {eye_center_y})")

# Let's also mark coordinates from 580 to 660
vis = img.copy()
for (x, y, w, h) in faces:
    cv2.rectangle(vis, (x, y), (x+w, y+h), (255, 0, 0), 2)
    center_x = int(x + w/2)
    center_y = int(y + h/2)
    cv2.circle(vis, (center_x, center_y), 5, (0, 0, 255), -1)

cv2.imwrite("scratch/detected_face.jpg", vis)
