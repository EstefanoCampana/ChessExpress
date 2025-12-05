import React, { memo } from 'react';
import { View } from 'react-native';

import { useChessboardContext } from './ChessBoardProvider';
import type { PieceDataType } from './types';

type PieceProps = {
  pieceType: PieceDataType['pieceType'];
};

export const Piece = memo(function Piece({ pieceType }: PieceProps) {
  const { pieces } = useChessboardContext();

  const PieceSvg = pieces[pieceType];

  if (!PieceSvg) return null;

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <PieceSvg />
    </View>
  );
});