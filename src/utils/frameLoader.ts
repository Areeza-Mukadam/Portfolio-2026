import { CHARACTER_CONFIG } from '../constants/character';

export interface LoadedFrames {
  frames: HTMLImageElement[];
  centerFrame: HTMLImageElement;
}

export function preloadCharacterFrames(
  onProgress?: (loadedRatio: number) => void
): Promise<LoadedFrames> {
  return new Promise((resolve, reject) => {
    const totalCount = CHARACTER_CONFIG.TOTAL_FRAMES + 1; // 64 directional + 1 center
    let loadedCount = 0;
    const directionalImages: HTMLImageElement[] = new Array(CHARACTER_CONFIG.TOTAL_FRAMES);
    let centerImage: HTMLImageElement | null = null;

    const checkComplete = () => {
      loadedCount++;
      if (onProgress) {
        onProgress(Math.min(1, loadedCount / totalCount));
      }
      if (loadedCount === totalCount) {
        if (centerImage) {
          resolve({
            frames: directionalImages,
            centerFrame: centerImage,
          });
        } else {
          reject(new Error('Center frame failed to initialize.'));
        }
      }
    };

    // Preload center frame
    const center = new Image();
    center.src = CHARACTER_CONFIG.CENTER_FRAME_PATH;
    center.onload = () => {
      centerImage = center;
      checkComplete();
    };
    center.onerror = () => {
      console.error(`Failed to load center frame: ${CHARACTER_CONFIG.CENTER_FRAME_PATH}`);
      checkComplete();
    };

    // Preload all 64 directional frames
    for (let i = 0; i < CHARACTER_CONFIG.TOTAL_FRAMES; i++) {
      const img = new Image();
      const path = CHARACTER_CONFIG.GET_FRAME_PATH(i);
      img.src = path;
      img.onload = () => {
        directionalImages[i] = img;
        checkComplete();
      };
      img.onerror = () => {
        console.error(`Failed to load frame ${i}: ${path}`);
        checkComplete();
      };
    }
  });
}
