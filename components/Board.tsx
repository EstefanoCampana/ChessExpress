"use client"
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    timer,
    timer2
  } = useChessboardContext();

  const [isPaused, setIsPaused] = useState(false);


  const formatTime = (t: number): string => {
    const mins = Math.floor(t / 60);
    const secs = t % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <View>
      <Text style={{ textAlign: "center", fontSize: 32, fontWeight: "bold", color: "#fff" }}>Blitz</Text>
      <View style={styles.timerBar}>
        <Text style={styles.playerName2}>Player 2</Text>
        <Text style={styles.timerText2}>{formatTime(timer2)}</Text>
      </View>
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
      <View style={styles.timerBar}>
        <Text style={styles.playerName}>Player 1</Text>
        <Text style={styles.timerText}>{formatTime(timer)}</Text>
      </View>
      <TouchableOpacity onPress={() => setIsPaused(true)} style={styles.button}>
        <Text style={{ color: "#fff" }}>Pause</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  playerName: {
    color: "white",
    fontSize: 18,
  },
  playerName2: {
    color: "white",
    fontSize: 18,
    transform: [{ rotate: "180deg" }]
  },
  timerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  timerText2: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    transform: [{ rotate: "180deg" }]
  },
  timerBar: {
    width: "100%",
    backgroundColor: "#2d2d2d",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 15,
    marginVertical: 20,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#181717a7",
    padding: 12,
    borderRadius: 10,
    textAlign: "center",
    width: "50%",
    alignSelf: "center"
  },
});