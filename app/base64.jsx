import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

import ActionButton from "../components/ui/ActionButton";
import ToolScreen from "../components/ui/ToolScreen";
import { copyText } from "../utils/clipboard";

function encodeBase64(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
}

function decodeBase64(value) {
  const binary = atob(value.trim());
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

export default function Base64Screen() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  function process(mode) {
    try {
      setOutput(mode === "encode" ? encodeBase64(input) : decodeBase64(input));
    } catch {
      Alert.alert("Invalid input", "Please check the input text.");
    }
  }

  return (
    <ToolScreen
      title="Base64 Encoder / Decoder"
      description="Encode text into Base64 or decode Base64 back to text."
    >
      <Text className="mb-2 font-semibold text-gray-800">Input</Text>

      <TextInput
        value={input}
        onChangeText={setInput}
        multiline
        autoCapitalize="none"
        textAlignVertical="top"
        placeholder="Enter text here..."
        className="min-h-36 rounded-2xl border border-gray-200 bg-white p-4 text-base text-gray-900"
      />

      <View className="mt-4 flex-row gap-3">
        <View className="flex-1">
          <ActionButton title="Encode" onPress={() => process("encode")} />
        </View>
        <View className="flex-1">
          <ActionButton
            title="Decode"
            variant="secondary"
            onPress={() => process("decode")}
          />
        </View>
      </View>

      {output ? (
        <View className="mt-6">
          <Text className="mb-2 font-semibold text-gray-800">Result</Text>
          <Text
            selectable
            className="rounded-2xl border border-gray-200 bg-white p-4 text-gray-800"
          >
            {output}
          </Text>
          <View className="mt-3">
            <ActionButton
              title="Copy Result"
              onPress={async () => {
                await copyText(output);
                Alert.alert("Copied", "Result copied.");
              }}
            />
          </View>
        </View>
      ) : null}
    </ToolScreen>
  );
}
