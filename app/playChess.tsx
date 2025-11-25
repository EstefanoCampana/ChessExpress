import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";


export default function PlayChess() {

  const board = require("../assets/images/pict.png")
  return (
    <View>

        <Image source={board}/>
        <Link href='/popUpWinner' asChild>
        <TouchableOpacity>
          <Text>Winner</Text>
          
        </TouchableOpacity>
        </Link>
      
    </View>
  );
}
