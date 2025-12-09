"use client"
import { ChessBoard } from "@/components/Chessboard";
import { useSettingsContext } from "@/components/SettingsProvider";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";




export default function PlayChess() {
  const { time } = useSettingsContext();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#333" }}>
        <View style={styles.container}>
          <ChessBoard options={{ time: time }} />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1
  },
});
