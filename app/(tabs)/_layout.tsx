import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return <Tabs
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "#ffff",
      tabBarInactiveTintColor: "#ffffff54",
      tabBarStyle: {
        backgroundColor: "#383838ff",
        borderColor: "#42454944"
      }
    }}
  >
    <Tabs.Screen
      name="index"
      options={{
        headerShown: false,
        headerTitleAlign: "center",
        title: "Play",
        tabBarIcon: ({ focused, color }) => (
          <Ionicons name="play" size={25} color={focused ? "#ffffff" : color} />
        )
      }} />

    <Tabs.Screen
      name="settings"
      options={{
        headerShown: false,
        headerTitleAlign: "center",
        title: "Settings",
        tabBarIcon: ({ focused, color }) => (
          <Ionicons name="settings" size={25} color={focused ? "#ffffff" : color} />
        )
      }} />
  </Tabs>

}