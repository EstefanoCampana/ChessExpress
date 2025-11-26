"use client"

import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings(){
    const [blitzSelect, setBlitzSelect] = useState(true);
    const [normalSelect, setNormalSelect] = useState(false);
    const [infinitySelect, setInfinitySelect] = useState(false);
    return(
        <SafeAreaView style={styles.container} edges={['top','left','right']}>
            <View style={styles.backgroundColorMain}>
                <Text style={{fontSize: 26, fontWeight: "bold", color: "#fff", marginBottom: 50}}>Settings</Text>
                <View style={{flex: 0, justifyContent: "center", gap: 30}}>
                    <View style={{flex: 0, justifyContent: "center", gap: 10}}>
                        <Text style={{fontSize: 22, fontWeight: "bold", color: "#fff"}}>Mode</Text>
                        <View style={{flex:0, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", paddingVertical:20, backgroundColor:"#181717ff", borderRadius: 10, borderWidth: 3, borderColor:"#2423237a"}}>
                            <TouchableOpacity onPress={() => {setBlitzSelect(true);setNormalSelect(false);setInfinitySelect(false)}} style={[styles.selectedMode, blitzSelect ? styles.selectedMode : styles.mode]}>
                                <Text style={{textAlign: "center", color: "#ffffffc5"}}>Blitz</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setBlitzSelect(false);setNormalSelect(true);setInfinitySelect(false)}} style={[styles.mode, normalSelect ? styles.selectedMode : styles.mode]}>
                                <Text style={{textAlign: "center", color: "#ffffffc5"}}>Normal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setBlitzSelect(false);setNormalSelect(false);setInfinitySelect(true)}} style={[styles.mode, infinitySelect ? styles.selectedMode : styles.mode]} >
                                <Text style={{textAlign: "center", color: "#ffffffc5"}}>Infinity</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flex: 0, justifyContent: "center", gap:10 }}>
                        <Text style={{fontSize: 22, fontWeight: "bold", color: "#fff"}}>Music/SFX</Text>
                        <View style={{flex:0, gap:10, paddingVertical:20, paddingHorizontal: 10, backgroundColor:"#181717ff", borderRadius: 10, borderWidth: 3, borderColor:"#2423237a"}}>
                            <View style={{flex:0, flexDirection: "row", alignItems: "center"}}>
                                    <Text style={{fontSize: 18, fontWeight: "500", color: "#ffffffc5", marginRight: "auto"}}>Music</Text>
                                    <TouchableOpacity style={styles.selectedMode}>
                                        <Text style={{textAlign: "center", color: "#ffffffc5"}}>On</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.mode}>
                                        <Text style={{textAlign: "center", color: "#ffffffc5"}}>Off</Text>
                                    </TouchableOpacity>
                            </View>
                            <View style={{flex:0, flexDirection: "row", alignItems: "center"}}>
                                    <Text style={{fontSize: 18, fontWeight: "500", color: "#ffffffc5", marginRight: "auto"}}>SFX</Text>
                                    <TouchableOpacity style={styles.selectedMode}>
                                        <Text style={{textAlign: "center", color: "#ffffffc5"}}>On</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.mode}>
                                        <Text style={{textAlign: "center", color: "#ffffffc5"}}>Off</Text>
                                    </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 0, justifyContent: "center", gap:10}}>
                        <Text style={{fontSize: 22, fontWeight: "bold", color: "#fff"}}>Appearance</Text>
                        <View style={{flex:0, gap:10, paddingVertical:20, paddingHorizontal: 10, backgroundColor:"#181717ff", borderRadius: 10, borderWidth: 3, borderColor:"#2423237a"}}>
                            <View style={{flex:0, flexDirection: "row", alignItems: "center"}}>
                                    <Text style={{fontSize: 18, fontWeight: "500", color: "#ffffffc5", marginRight: "auto"}}>Dark Mode</Text>
                                    <TouchableOpacity style={styles.selectedMode}>
                                        <Text style={{textAlign: "center", color: "#ffffffc5"}}>On</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.mode}>
                                        <Text style={{textAlign: "center", color: "#ffffffc5"}}>Off</Text>
                                    </TouchableOpacity>
                            </View>
                            <View style={{flex:0, flexDirection: "row", alignItems: "center"}}>
                                    <Text style={{fontSize: 18, fontWeight: "500", color: "#ffffffc5", marginRight: "auto"}}>Timer</Text>
                                    <TouchableOpacity style={[styles.selectedMode, infinitySelect ? styles.mode : styles.selectedMode]}>
                                        <Text style={{textAlign: "center", color: "#ffffffc5"}}>On</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.mode, infinitySelect ? styles.selectedMode : styles.mode]}>
                                        <Text style={{textAlign: "center", color: "#ffffffc5"}}>Off</Text>
                                    </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#242323ff",
        padding: 10
    },
    backgroundColorMain: {
      flex: 1,
      backgroundColor: "#383838ff",
      padding: 20,
      justifyContent: "center",
      borderRadius: 20,
      gap: 20
    },
    selectedMode: {
        backgroundColor: "#2bd01cc1",
        width: 85,
        paddingVertical: 10,
        borderRadius: 10
    },
    mode: {
        backgroundColor: "#5f5c5cff",
        width: 85,
        paddingVertical: 10,
        borderRadius: 10
    },
}
)