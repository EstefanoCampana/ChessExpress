"use client"
import { ChessBoard } from "@/components/Chessboard";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";



export default function PlayChess() {
  const [isWinner, setIsWinner] = useState(false);  
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
    <GestureHandlerRootView style={{flex:1}}>
    <SafeAreaView style={{flex: 1, backgroundColor: "#333"}}>
      <Text style={{textAlign: "center", fontSize: 32, fontWeight: "bold", color: "#fff", marginTop: 20}}>Blitz</Text>
      <View style={styles.container}>
        <View style={styles.timerBar}>
          <Text style={styles.playerName2}>Player 2</Text>
          <Text style={styles.timerText2}>{formatTime(time)}</Text>
        </View>
      <ChessBoard/>
        <View style={styles.timerBar}>
          <Text style={styles.playerName}>Player 1</Text>
          <Text style={styles.timerText}>{formatTime(time)}</Text>
        </View>
          <TouchableOpacity onPress={() => setIsWinner(true)} style={styles.button}>
            <Text style={{color: "#fff"}}>Pause</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    position: "relative", 
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1
  },

  timerBar: {
    width: "90%",
    backgroundColor: "#2d2d2d",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 15,
    marginVertical: 20,
  },
board: {
        width: "90%",
        height: "50%",
        aspectRatio: 1,
        borderRadius: 10,
  },
  playerName: {
    color: "white",
    fontSize: 18,
  },
  playerName2: {
    color: "white",
    fontSize: 18,
    transform: [{rotate: "180deg"}]
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
    transform: [{rotate: "180deg"}]
  },


  button: {
    marginTop: 10,
    backgroundColor: "#181717a7",
    padding: 12,
    borderRadius: 10,
  },
});
