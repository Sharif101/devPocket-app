import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import ToolScreen from "../components/ui/ToolScreen";

export default function QRGeneratorScreen() {
  const [input, setInput] = useState("");
  const [value, setValue] = useState("");

  function generate() {
    if (!input.trim()) {
      Alert.alert("Empty input", "Enter text or a URL first.");
      return;
    }
    setValue(input.trim());
  }

  return (
    <ToolScreen
      title="QR Generator"
      description="Generate a QR code from text or a link."
    >
      <TextInput
        value={input}
        onChangeText={setInput}
        multiline
        placeholder="Enter a URL or text..."
        className="min-h-28 rounded-xl border border-gray-200 bg-white p-4 text-gray-900"
      />
      <Text
        onPress={generate}
        className="mt-4 rounded-xl bg-teal-700 p-4 text-center font-bold text-white"
      >
        Generate QR Code
      </Text>

      {value ? (
        <View className="mt-6 items-center rounded-2xl bg-white p-6">
          <QRCode value={value} size={220} />
          <Text selectable className="mt-5 text-center text-sm text-gray-600">
            {value}
          </Text>
          <Text className="mt-3 text-center text-xs text-gray-500">
            Screenshot the QR code to save it.
          </Text>
        </View>
      ) : null}
    </ToolScreen>
  );
}
