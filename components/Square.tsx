import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useChessboardContext } from './ChessBoardProvider';
import {
  defaultAlphaNotationStyle,
  defaultDarkSquareNotationStyle,
  defaultDarkSquareStyle,
  defaultLightSquareNotationStyle,
  defaultLightSquareStyle,
  defaultNumericNotationStyle,
  defaultSquareStyle
} from './defaults';
import { SquareDataType } from './types';

type SquareProps = SquareDataType & {
  children?: React.ReactNode;
  isOver: boolean; // kept from old API, unused now
};

export const Square = memo(function Square({
  children,
  squareId,
  isLightSquare,
}: SquareProps) {
  const {
    chessboardColumns,
    squareStyle,
    squareStyles,
    darkSquareStyle,
    lightSquareStyle,
    darkSquareNotationStyle,
    lightSquareNotationStyle,
    showNotation,
    currentPosition,
    selectedSquare,
    legalMoves,
    handleSquarePress,
  } = useChessboardContext();

  const [file, rank] = squareId.split('');
  const isDark = !isLightSquare;

  const baseSquareStyle = isDark
    ? [defaultDarkSquareStyle, darkSquareStyle]
    : [defaultLightSquareStyle, lightSquareStyle];

  const notationSquareStyle = isDark
    ? [defaultDarkSquareNotationStyle, darkSquareNotationStyle]
    : [defaultLightSquareNotationStyle, lightSquareNotationStyle];

  const isSelected = selectedSquare === squareId;
  const isLegalDestination = legalMoves.includes(squareId);

  const handlePress = () => {
    const piece = currentPosition[squareId] ?? null;
    handleSquarePress({ piece, square: squareId });
  };

  return (
    <Pressable
      style={[
        styles.squareContainer,
        defaultSquareStyle,
        squareStyle,
        ...baseSquareStyle,
        { width: `${100 / chessboardColumns}%` },
      ]}
      onPress={handlePress}
    >
      {/* file notation (a-h) */}
      {showNotation && rank === '1' && (
        <Text style={[defaultAlphaNotationStyle, notationSquareStyle]}>
          {file}
        </Text>
      )}

      {/* rank notation (1-8) */}
      {showNotation && file === 'a' && (
        <Text style={[defaultNumericNotationStyle, notationSquareStyle]}>
          {rank}
        </Text>
      )}

      {/* inner content + highlights */}
      <View
        style={[
          styles.squareInner,
          squareStyles[squareId],
          isSelected && styles.selectedSquare,
          isLegalDestination && styles.legalMoveSquare,
        ]}
      >
        {children}
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  squareContainer: {
    // aspectRatio set in defaultSquareStyle
  },
  squareInner: {
    width: '100%',
    height: '100%',
  },
  selectedSquare: {
    backgroundColor: 'rgba(255, 255, 0, 0.3)',
  },
  legalMoveSquare: {
    backgroundColor: 'rgba(0, 255, 0, 0.25)',
  },
});