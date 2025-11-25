import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function leaderboardChess() {

  
  return (
    <View>
      <Text>Leaderboard</Text>
      <TouchableOpacity onPress={() => router.replace("/homeMenu")}>
        <Text>Back to Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {

  },

  trophyIcon1: {

  },

  trophyIcon2: {

  }
});