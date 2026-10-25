import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import ToolScreen from "../components/ui/ToolScreen";
import { copyText } from "../utils/clipboard";

function createUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const random = Math.floor(Math.random() * 16);
    return (char === "x" ? random : (random & 0x3) | 0x8).toString(16);
  });
}

export default function UUIDGeneratorScreen() {
  const [count, setCount] = useState("5");
  const [ids, setIds] = useState([]);

  function generate() {
    const amount = Number(count);

    if (!Number.isInteger(amount) || amount < 1 || amount > 100) {
      Alert.alert("Invalid count", "Choose between 1 and 100 UUIDs.");
      return;
    }

    setIds(Array.from({ length: amount }, createUUID));
  }

  return (
    <ToolScreen
      title="UUID Generator"
      description="Generate UUID v4-style identifiers."
    >
      <Text className="mb-2 font-semibold text-gray-800">
        Number of UUIDs (1–100)
      </Text>
      <TextInput
        value={count}
        onChangeText={setCount}
        keyboardType="number-pad"
        className="rounded-xl border border-gray-200 bg-white p-4 text-gray-900"
      />

      <Text
        onPress={generate}
        className="mt-4 rounded-xl bg-teal-700 p-4 text-center font-bold text-white"
      >
        Generate UUIDs
      </Text>

      {ids.map((id) => (
        <View
          key={id}
          className="mt-3 rounded-xl border border-gray-200 bg-white p-4"
        >
          <Text selectable className="text-sm text-gray-800">
            {id}
          </Text>
          <Text
            onPress={async () => {
              await copyText(id);
              Alert.alert("Copied", "UUID copied.");
            }}
            className="mt-3 font-semibold text-teal-700"
          >
            Copy UUID
          </Text>
        </View>
      ))}
    </ToolScreen>
  );
}
