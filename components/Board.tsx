import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useChessboardContext } from './ChessBoardProvider';
import { defaultBoardStyle } from './defaults';
import { Piece } from './Piece';
import { Square } from './Square';

export function Board() {
  const {
    board,
    boardStyle,
    chessboardColumns,
    currentPosition,
  } = useChessboardContext();

  return (
    <View style={[defaultBoardStyle(chessboardColumns), boardStyle]}>
      {board.map((row) =>
        row.map((square) => {
          const piece = currentPosition[square.squareId];
          return (
            <Square key={square.squareId} {...square} isOver={false}>
              {piece ? (
                <Piece
                  pieceType={piece.pieceType}
                />
              ) : null}
            </Square>
          );
        }),
      )}
    </View>
  );
}

const styles = StyleSheet.create({});