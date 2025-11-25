import { Text, View, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, BackHandler } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { router } from "expo-router";

const playerNames = Yup.object().shape({
  player1: Yup.string().required("Required"),
  player2: Yup.string().required("Required"),
});

const HomeScreen = () => (
    <ScrollView style={styles.container}>
        <View style={styles.backgroundColorMain}>
            
            
          <Formik
          initialValues={{
            player1: "Player 1",
            player2: "Player 2",
          }}
          validationSchema={playerNames}
          onSubmit={(values) => {
            
          }}
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
                style={styles.playerFormMain}
                placeholder="Player 1"
                onChangeText={handleChange("player1")}
                onBlur={handleBlur("player1")}
                value={values.player1}
              />
              {touched.player1 && errors.player1 && <Text style={styles.error}>{errors.player1}</Text>}

              <TextInput
                style={styles.playerFormMain}
                placeholder="Player 2"
                onChangeText={handleChange("player2")}
                onBlur={handleBlur("player2")}
                value={values.player2}
              />
              {touched.player2 && errors.player2 && <Text style={styles.error}>{errors.player2}</Text>}

              <TouchableOpacity style={styles.playerFormMain} onPress={() => router.replace("/leaderboard")}>
                <Text>LEADERBOARDS</Text>
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
                <Text>PLAY NOW</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => BackHandler.exitApp()}>
                <Text style={styles.buttonExitGame}>EXIT GAME</Text>
              </TouchableOpacity>
              </View>

            </>
          )}
          
          </Formik>

        </View>
    </ScrollView>
  );

export default HomeScreen;

const styles = StyleSheet.create({

    container: {
        backgroundColor: "#000000ff",
        
    },

    backgroundColorMain: {
      backgroundColor: "#383838ff"
    },

    chessExpressLogo: {
        resizeMode: "cover",
        borderRadius: 10,
        height: 20,
        width: 20, 
        tintColor: "#ffff"
    },

    playerFormMain: {
      height: 50,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 14,
      marginBottom: 10,
      backgroundColor: "#f8fafc",
    },

    error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },

  buttonExitGame: {
    backgroundColor: "#ff0000ff"
  },

  buttonPlayNow: {
    backgroundColor: "#1ace3eff"
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  }

})




