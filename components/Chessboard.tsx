import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Board } from './Board';
import { ChessboardOptions, ChessboardProvider } from './ChessBoardProvider';

type ChessboardProps = {
  options?: ChessboardOptions;
};

export function ChessBoard({ options }: ChessboardProps) {
  return (
    <ChessboardProvider options={options}>
      <View style={styles.container}>
        <Board />
      </View>
    </ChessboardProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "45%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})