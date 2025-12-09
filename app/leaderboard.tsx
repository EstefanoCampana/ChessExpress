"use client";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getFullLeaderboard, LeaderboardEntry } from "../components/leaderboardStorage";

const logo = require("../assets/images/chessExpressLogo.png");
const trophy = require("../assets/images/8348232.png");

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getFullLeaderboard();
      setEntries(data);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerCard}>
        <View style={styles.headerRow}>
          <Image source={trophy} style={styles.trophy} />
          <Image source={logo} style={styles.logo} />
          <Image source={trophy} style={styles.trophy} />
        </View>

        <View style={styles.leaderboardList}>
          {entries.length === 0 ? (
            <Text style={[styles.playerName, { textAlign: "center" }]}>
              No games recorded yet.
            </Text>
          ) : (
            <FlatList
              data={entries}
              keyExtractor={(item) => item.name}
              renderItem={({ item, index }) => (
                <View style={styles.scoreBox}>
                  <Text style={styles.playerName}>
                    {index + 1}. {item.name}
                  </Text>
                  <Text style={styles.winCount}>{item.wins} wins</Text>
                </View>
              )}
              ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            />
          )}
        </View>

        <TouchableOpacity
          style={styles.returnButton}
          onPress={() => router.replace("(tabs)")}
        >
          <Text style={styles.returnButtonText}>Return to Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#242323ff",
    flex: 1,
    padding: 20,
  },

  innerCard: {
    backgroundColor: "#383838ff",
    flex: 1,
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignItems: "center",
    marginBottom: 40,
  },

  trophy: {
    width: 60,
    height: 60,
  },

  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#3bd71cff",
    backgroundColor: "#fff",
  },

  leaderboardList: {
    width: "100%",
    marginBottom: 40,
  },

  scoreBox: {
    backgroundColor: "#2d2d2dff",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#dab11eff",
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  playerName: {
    color: "#bbb9b9ff",
    fontSize: 16,
  },

  winCount: {
    color: "#dab11eff",
    fontWeight: "bold",
    fontSize: 16,
  },

  returnButton: {
    marginTop: "auto",
    backgroundColor: "#2d2d2dff",
    borderColor: "#1ace3eff",
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },

  returnButtonText: {
    color: "#1ace3eff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
