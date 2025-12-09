"use client"
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useChessboardContext } from './ChessBoardProvider';
import { defaultBoardStyle } from './defaults';
import { Piece } from './Piece';
import playerNames from "./playerNames";
import { Square } from './Square';


export function Board() {
  const {
    board,
    boardStyle,
    chessboardColumns,
    currentPosition,
    time,
    timer,
    timer2,
    turn,
  } = useChessboardContext();

  const isWhiteTurn = turn === 'b';

  const formatTime = (t: number): string => {
    const mins = Math.floor(t / 60);
    const secs = t % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <View>
      <Text style={{ textAlign: "center", fontSize: 32, fontWeight: "bold", color: "#fff" }}>Blitz</Text>

      <View style={isWhiteTurn ? styles.timerBarActive : styles.timerBar}>
        <Text style={[styles.playerName2, styles.timerText2]}>{playerNames.player2}</Text>
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

      <View style={isWhiteTurn ? styles.timerBar : styles.timerBarActive}>
        <Text style={[styles.playerName, styles.timerText]}>{playerNames.player1}</Text>
        <Text style={styles.timerText}>{formatTime(timer)}</Text>

      </View>
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
  timerNull: {
    visibility: "hidden"
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
  timerBarActive: {
    width: "100%",
    backgroundColor: "#09f509a7",
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