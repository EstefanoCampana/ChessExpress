"use client"
import { router } from "expo-router";
import { Formik } from "formik";
import { BackHandler, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

const playerNames = Yup.object().shape({
  player1: Yup.string().required("Required"),
  player2: Yup.string().required("Required"),
});

const logo = require("../../assets/images/chessExpressLogo.png");
const trophy = require("../../assets/images/8348232.png");

const HomeScreen = () => (
    <SafeAreaView style={styles.container}>
        <View style={styles.backgroundColorMain}>
        
        <Image source={logo} style={styles.chessExpressLogo} />

          <Formik
          initialValues={{
            player1: "Player 1",
            player2: "Player 2",
          }}
          validationSchema={playerNames}
          onSubmit={(values) => {console.log(values);}}
        >
            {({
            handleChange,
            handleBlur,
            submitForm,
            values,
            errors,
            touched,
          }) => (
            <>

              <TextInput
                style={[styles.playerFormMain, {borderColor: "#dab11eff", borderWidth: 2}]}
                placeholder="Player 1 Display Name:"
                onChangeText={handleChange("player1")}
                onBlur={handleBlur("player1")}
                value={values.player1}
              />
              {touched.player1 && errors.player1 && <Text style={styles.error}>{errors.player1}</Text>}

              <TextInput
                style={[styles.playerFormMain, {borderColor: "#dab11eff", borderWidth: 2}]}
                placeholder="Player 2 Display Name:"
                onChangeText={handleChange("player2")}
                onBlur={handleBlur("player2")}
                value={values.player2}
              />
              {touched.player2 && errors.player2 && <Text style={styles.error}>{errors.player2}</Text>}

              <TouchableOpacity style={[styles.playerFormMain, {borderColor: "#dab11eff", borderWidth: 2}]} onPress={() => router.replace("/leaderboard")}>
                <Text style={{textAlign:"center", color:"#dab11eff", top: 12}}>LEADERBOARDS</Text>
                <View style={styles.row}>
                  <Image source={trophy} style={[styles.trophy, { left: 130, bottom: 16 }]} />
                  <Image source={trophy} style={[styles.trophy, { right: 130, bottom: 16 }]} />
                </View>

              </TouchableOpacity>

              <View style={styles.row}>
              <TouchableOpacity style={styles.buttonPlayNow} onPress={async () => {

                  router.push({
                    pathname: "/playChess",
                    params: {
                      player1: values.player1,
                      player2: values.player2,
                    },
                  });
                }}
              >
                <Text style={{color: "#1ace3eff", textAlign: "center"}}>PLAY</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => BackHandler.exitApp()} style={styles.buttonExitGame}>
                <Text style={{color: "#ff0000ff", textAlign: "center"}} >EXIT</Text>
              </TouchableOpacity>
              </View>

            </>
          )}
          </Formik>
        </View>
    </SafeAreaView>
  );

export default HomeScreen;

const styles = StyleSheet.create({

    container: {
      backgroundColor: "#242323ff",
      flex: 0,
      padding: 10
    },

    backgroundColorMain: {
      flex: 0,
      backgroundColor: "#383838ff",
      padding: 50,
      borderRadius: 20,
    },

    chessExpressLogo: {
        height: 180,
        width: 180, 
        borderColor: "#3bd71cff",
        borderRadius: 90,
        margin: 40,
        alignSelf: "center",
        borderWidth: 3,
        backgroundColor: "#fff"
    },

    playerFormMain: {
      height: 50,
      borderRadius: 10,
      paddingHorizontal: 14,
      marginBottom: 10,
      color: "#bbb9b9ff",
      backgroundColor: "#2d2d2dff"
    },
    buttonExitGame: {
      backgroundColor: "#2d2d2dff",
      margin: 50,
      borderColor: "#ff0000ff",
      padding: 10,
      width: 100,
      borderWidth: 2,
      borderRadius: 10,
  },
  buttonPlayNow: {
      backgroundColor: "#2d2d2dff",
      margin: 50,
      borderColor: "#1ace3eff",
      width: 100,
      borderWidth: 2,
      padding: 10,
      borderRadius: 10,
  },
  row: {
      flexDirection: "row",
      justifyContent: "center",
  },
  trophy: {
      width: 40,
      height: 40,
  },

  error: {
    color: "#ff0000ff",
    marginBottom: 10,
  },

})