import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const logo = require("../assets/images/chessExpressLogo.png");
const trophy = require("../assets/images/8348232.png");

export default function Leaderboard() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerCard}>
        
        
        <View style={styles.headerRow}>
          <Image source={trophy} style={styles.trophy} />
          <Image source={logo} style={styles.logo} />
          <Image source={trophy} style={styles.trophy} />
        </View>

        
        <View style={styles.leaderboardList}>

          <View style={styles.scoreBox}>
            <Text style={styles.playerName}>Esta7272</Text>
            <Text style={styles.winCount}>5 wins</Text>
          </View>

          <View style={styles.scoreBox}>
            <Text style={styles.playerName}>Jordy</Text>
            <Text style={styles.winCount}>2 wins</Text>
          </View>

        </View>

        
        <TouchableOpacity
          style={styles.returnButton}
          onPress={() => router.replace("/homeMenu")}
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
  },

  leaderboardList: {
    width: "100%",
    gap: 15,
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
    color: "#fff",
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
    borderRadius: 30,
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
