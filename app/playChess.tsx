import { router } from "expo-router";
import { Chessboard } from 'react-chessboard';
import { TouchableOpacity, View } from "react-native";

export default function playChess() {


  return (
    <View>
      <TouchableOpacity onPress={() => router.replace("/homeMenu")}
      >Return to Main Menu</TouchableOpacity>
      <Chessboard />
      
    </View>
  );
}
