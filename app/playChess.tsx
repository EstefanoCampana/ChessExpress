import { Link, router } from "expo-router";
import { Chessboard } from 'react-chessboard';
import { Text, TouchableOpacity, View } from "react-native";


export default function playChess() {


  return (
    <View>
      <TouchableOpacity onPress={() => router.replace("/homeMenu")}
      >Return to Main Menu</TouchableOpacity>
      <Chessboard />

        <Link href='/popUpWinner' asChild>
        <TouchableOpacity>
          <Text>Winner</Text>
          
        </TouchableOpacity>
        </Link>
      
    </View>
  );
}
