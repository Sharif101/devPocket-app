import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

import ActionButton from "../components/ui/ActionButton";
import ToolScreen from "../components/ui/ToolScreen";
import { copyText } from "../utils/clipboard";

export default function ColorConverterScreen() {
  const [hex, setHex] = useState("#008489");
  const [rgb, setRgb] = useState("0, 132, 137");

  function convertToRgb() {
    const clean = hex.trim().replace(/^#/, "");

    if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
      Alert.alert("Invalid HEX", "Enter a 6-digit HEX color, e.g. #008489.");
      return;
    }

    const value = clean.match(/.{2}/g).map((part) => parseInt(part, 16));
    setRgb(value.join(", "));
  }

  function convertToHex() {
    const values = rgb.split(",").map((part) => Number(part.trim()));

    if (
      values.length !== 3 ||
      values.some(
        (value) => !Number.isInteger(value) || value < 0 || value > 255,
      )
    ) {
      Alert.alert("Invalid RGB", "Enter RGB values between 0 and 255.");
      return;
    }

    setHex(
      "#" + values.map((value) => value.toString(16).padStart(2, "0")).join(""),
    );
  }

  return (
    <ToolScreen
      title="Color Converter"
      description="Convert HEX colors to RGB and RGB values to HEX."
    >
      <View
        className="mb-6 h-36 rounded-2xl border border-gray-200"
        style={{
          backgroundColor: /^#[0-9a-fA-F]{6}$/.test(hex) ? hex : "#FFFFFF",
        }}
      />

      <Text className="mb-2 font-semibold text-gray-800">HEX</Text>
      <TextInput
        value={hex}
        onChangeText={setHex}
        autoCapitalize="none"
        placeholder="#008489"
        className="rounded-xl border border-gray-200 bg-white p-4 text-base text-gray-900"
      />

      <View className="mt-3">
        <ActionButton title="Convert to RGB" onPress={convertToRgb} />
      </View>

      <Text className="mb-2 mt-6 font-semibold text-gray-800">RGB</Text>
      <TextInput
        value={rgb}
        onChangeText={setRgb}
        keyboardType="numbers-and-punctuation"
        placeholder="0, 132, 137"
        className="rounded-xl border border-gray-200 bg-white p-4 text-base text-gray-900"
      />

      <View className="mt-3">
        <ActionButton
          title="Convert to HEX"
          variant="secondary"
          onPress={convertToHex}
        />
      </View>

      <View className="mt-6">
        <ActionButton
          title="Copy HEX"
          onPress={async () => {
            await copyText(hex);
            Alert.alert("Copied", "HEX color copied.");
          }}
        />
      </View>
    </ToolScreen>
  );
}
