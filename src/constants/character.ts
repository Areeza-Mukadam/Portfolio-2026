export const CHARACTER_CONFIG = {
  TOTAL_FRAMES: 64,
  FRAME_WIDTH: 1280,
  FRAME_HEIGHT: 720,
  FRAME_ASPECT_RATIO: 1280 / 720,
  
  // Normalized face center within the 1280x720 video frame (midpoint between eyes)
  FACE_CENTER_X_RATIO: 0.4867, // 623 / 1280
  FACE_CENTER_Y_RATIO: 0.3750, // 270 / 720
  
  // Eye contact deadzone: ~12% of min(viewportWidth, viewportHeight)
  DEADZONE_RADIUS_RATIO: 0.12,
  
  // Angle lerp factor: 0.26 gives instant responsive tracking (~a few tens of ms)
  LERP_FACTOR: 0.26,
  
  // Exact detected solid background color
  BACKGROUND_COLOR: '#100C22',
  BACKGROUND_RGB: [16, 12, 34] as const,
  
  // Frame paths
  FRAME_BASE_PATH: '/frames',
  CENTER_FRAME_PATH: '/frames/center.webp',
  GET_FRAME_PATH: (index: number) => `/frames/frame-${index.toString().padStart(3, '0')}.webp`,
} as const;
