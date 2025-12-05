import type { TextStyle, ViewStyle } from 'react-native';

export function defaultBoardStyle(
  chessboardColumns: number,
): ViewStyle {
  return {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    aspectRatio: 1,      // keep the board square
    position: 'relative',
  };
}

export const defaultSquareStyle: ViewStyle = {
  aspectRatio: 1,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
};

export const defaultDarkSquareStyle: ViewStyle = {
  backgroundColor: '#B58863',
};

export const defaultLightSquareStyle: ViewStyle = {
  backgroundColor: '#F0D9B5',
};

export const defaultDropSquareStyle: ViewStyle = {
  // no boxShadow in RN – approximate with border
  borderWidth: 1,
  borderColor: 'black',
};

export const defaultDarkSquareNotationStyle: TextStyle = {
  color: '#F0D9B5',
};

export const defaultLightSquareNotationStyle: TextStyle = {
  color: '#B58863',
};

export const defaultAlphaNotationStyle: TextStyle = {
  fontSize: 13,
  position: 'absolute',
  bottom: 1,
  right: 4,
  // userSelect not supported in RN
};

export const defaultNumericNotationStyle: TextStyle = {
  fontSize: 13,
  position: 'absolute',
  top: 2,
  left: 2,
};

export const defaultDraggingPieceStyle: ViewStyle = {
  // RN transform is an array
  transform: [{ scale: 1.2 }],
};

export const defaultDraggingPieceGhostStyle: ViewStyle = {
  opacity: 0.5,
};

export const defaultArrowOptions = {
  color: '#ffaa00',
  secondaryColor: '#4caf50',
  tertiaryColor: '#f44336',
  arrowLengthReducerDenominator: 8,
  sameTargetArrowLengthReducerDenominator: 4,
  arrowWidthDenominator: 5,
  activeArrowWidthMultiplier: 0.9,
  opacity: 0.65,
  activeOpacity: 0.5,
};