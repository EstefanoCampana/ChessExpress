import { SettingsProvider } from "@/components/SettingsProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <SettingsProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade"
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false
          }} />

      </Stack>
    </SettingsProvider>
  )
}
