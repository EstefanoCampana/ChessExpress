import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function popUp() {
  return (
    <View style={styles.container}>
      <Text>Player Won!</Text>
      <TouchableOpacity>
        <Text style={styles.playAgain} onPress={() => router.replace("/playChess")}>Play Again</Text>
        <Text style={styles.mainMenu} onPress={() => router.replace("/homeMenu")}>Main Menu</Text>
      </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#1a1616ff",
    opacity: 50,
    color: "#ffffff",
    height: 50,
    width: 50,
  },  


  playAgain: {
    backgroundColor: "#2bd01cff"
  },

  mainMenu: {
    backgroundColor: "#d99622ff"
  },

});