import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor="#F9FAFB" />

      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#F9FAFB" },
          headerTintColor: "#111827",
          headerTitleStyle: { fontWeight: "700" },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: "#F9FAFB" },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="json-formatter"
          options={{ title: "JSON Formatter" }}
        />
        <Stack.Screen name="base64" options={{ title: "Base64 Encoder" }} />
        <Stack.Screen name="url-encoder" options={{ title: "URL Encoder" }} />
        <Stack.Screen
          name="color-converter"
          options={{ title: "Color Converter" }}
        />
        <Stack.Screen
          name="timestamp"
          options={{ title: "Timestamp Converter" }}
        />
        <Stack.Screen
          name="password-generator"
          options={{ title: "Password Generator" }}
        />
        <Stack.Screen name="calculator" options={{ title: "Calculator" }} />
        <Stack.Screen name="text-toolkit" options={{ title: "Text Toolkit" }} />
        <Stack.Screen
          name="age-calculator"
          options={{ title: "Age Calculator" }}
        />
        <Stack.Screen name="todo" options={{ title: "To-Do List" }} />
        <Stack.Screen
          name="expense-tracker"
          options={{ title: "Expense Tracker" }}
        />
        <Stack.Screen name="pomodoro" options={{ title: "Focus Timer" }} />
        <Stack.Screen name="qr-generator" options={{ title: "QR Generator" }} />
        <Stack.Screen
          name="uuid-generator"
          options={{ title: "UUID Generator" }}
        />
        <Stack.Screen
          name="markdown-preview"
          options={{ title: "Markdown Preview" }}
        />
        <Stack.Screen
          name="html-entities"
          options={{ title: "HTML Entities" }}
        />
        <Stack.Screen name="jwt-decoder" options={{ title: "JWT Decoder" }} />
        <Stack.Screen name="diff-checker" options={{ title: "Diff Checker" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
