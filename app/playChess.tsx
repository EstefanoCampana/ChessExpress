import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

export default function PlayChess() {
  const board = require("../assets/images/pict.png");

  
  const [time, setTime] = useState(300); 

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  
  const formatTime = (t: number): string => {
  const mins = Math.floor(t / 60);
  const secs = t % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};


  return (
    <View style={styles.container}>
      
      <View style={styles.timerBar}>
        <Text style={styles.playerName}>Player 1</Text>
        <Text style={styles.timerText}>{formatTime(time)}</Text>
      </View>

      
      <Image source={board} style={styles.board} />

      <Link href="/popUpWinner" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: "white" }}>Winner</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#333",
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
  },

  timerBar: {
    width: "90%",
    backgroundColor: "#2d2d2d",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },

  playerName: {
    color: "white",
    fontSize: 18,
  },

  timerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  board: {
    width: "90%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
  },

  button: {
    marginTop: 30,
    backgroundColor: "#1ace3e",
    padding: 12,
    borderRadius: 10,
  },
});
