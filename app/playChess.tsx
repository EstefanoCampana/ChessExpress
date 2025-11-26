"use client"
import WinnerPopUpComp from "@/components/popUpWinner";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function PlayChess() {
  const [isWinner, setIsWinner] = useState(false);
  const board = require("../assets/images/pict.png")
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#333"}}>
      {isWinner && <WinnerPopUpComp/>}
      <Text style={{textAlign: "center", fontSize: 32, fontWeight: "bold", color: "#fff", marginTop: 20}}>Blitz</Text>
      <View style={styles.container}>
        <View style={styles.timerBar}>
          <Text style={styles.playerName2}>Player 2</Text>
          <Text style={styles.timerText2}>1:14</Text>
        </View>
          <Image source={board} style={styles.board}/>
        <View style={styles.timerBar}>
          <Text style={styles.playerName}>Player 1</Text>
          <Text style={styles.timerText}>2:40</Text>
        </View>
          <TouchableOpacity onPress={() => setIsWinner(true)} style={styles.button}>
            <Text style={{color: "#fff"}}>Winner</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
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

  board: {
    width: "90%",
    height: "50%",
    aspectRatio: 1,
    borderRadius: 10,
  },

  button: {
    marginTop: 10,
    backgroundColor: "#1ace3e",
    padding: 12,
    borderRadius: 10,
  },
});
