// src/theme/theme.js
import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// 412 baseline matches your exact Figma Mobile frame dimensions
const FIGMA_WIDTH_BASELINE = 412;
const scaleFactor = SCREEN_WIDTH / FIGMA_WIDTH_BASELINE;

export const Tokens = {
  layout: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    maxWidth: 412,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  
  // MICRO-SCALING RULE: Use exclusively for vector assets and graphical icons
  scaleAsset: (size) => Math.round(PixelRatio.roundToNearestPixel(size * scaleFactor)),

  // Figma Spatial Geometry Engine Config
  gaps: {
    small: 8,
    medium: 12,
    large: 16,
    xlarge: 24,
    separator: 32,
    section: 40,
    mlarge:14
  },

  // Interactive Target Elements (Enforcing touch accessibility)
  components: {
    inputHeight: 52,
    buttonHeight: 52,
    barMetricHeight: 12,
    infoMinHeight: 64,
    radiusInput: 12,
    radiusButton: 12,
    radiusSmall: 6,
    radiusBar: 4,
  },

  // Typography Engine Specs
  typography: {
    families: {
      light: 'Lexend-Light',
      regular: 'Lexend-Regular',
      medium: 'Lexend-Medium',
      semiBold: 'Lexend-SemiBold',
    },
    sizes: {
      title: 22,
      button: 18,
      body: 14,
      small: 12,
      subBody:13,
      subButton:16
    },
    lineHeights: {
      title: 28,
      body: 24,
      small: 20,
    },
  },
};