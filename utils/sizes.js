// Sizes.js

import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 274;

export function textS(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

const guidelinesBaseWidth = 360;
const guidelinesBaseHeight = 740;

export const widthRatio = (size) => (SCREEN_WIDTH / guidelinesBaseWidth) * size;
export const heightRatio = (size) => (SCREEN_HEIGHT / guidelinesBaseHeight) * size;
export const moderateScale = (size, factor = 0.5) => size + (widthRatio(size) - size) * factor;
