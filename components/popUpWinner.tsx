import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WinnerPopUpComp({winner}: {winner: string}) {
  return (
    <SafeAreaView style={{flex:1, justifyContent: "center", alignItems: "center", position: "absolute", backgroundColor: "#1a161699", zIndex: 2, top: 0, left:0, right:0, bottom:0}}>
      <View style={styles.container}>
        <Text style={{color:"#ffff", fontSize: 20, fontWeight: "black", textAlign: "center"}}>{winner} Won!</Text>
        <TouchableOpacity style={styles.playAgain} onPress={() => router.replace("/playChess")}>
          <Text style={{textAlign: "center"}}>Play Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainMenu} onPress={() => router.replace("(tabs)")}>
          <Text style={{textAlign: "center"}}>Main Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    height: 200,
    width: 300,
    flex:0,
    justifyContent: "center",
    backgroundColor: "#1a1616ff",
    position:"absolute", 
    padding: 30,
    borderRadius: 20
  },  

  playAgain: {
    backgroundColor: "#2bd01cff",
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: 10
    
  },

  mainMenu: {
    backgroundColor: "#d99622ff",
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: 10
  },

});