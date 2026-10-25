import { useState } from "react";
import { Alert, Switch, Text, TextInput, View } from "react-native";

import ActionButton from "../components/ui/ActionButton";
import ToolScreen from "../components/ui/ToolScreen";
import { copyText } from "../utils/clipboard";

export default function PasswordGeneratorScreen() {
  const [length, setLength] = useState("16");
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("");

  function generatePassword() {
    const size = Number(length);

    if (!Number.isInteger(size) || size < 4 || size > 128) {
      Alert.alert("Invalid length", "Choose a length between 4 and 128.");
      return;
    }

    let chars = "";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()-_=+[]{}?";

    if (!chars) {
      Alert.alert("Choose a character type", "Enable at least one option.");
      return;
    }

    const randomValues = new Uint32Array(size);

    if (globalThis.crypto?.getRandomValues) {
      globalThis.crypto.getRandomValues(randomValues);
    } else {
      for (let i = 0; i < size; i++) {
        randomValues[i] = Math.floor(Math.random() * 0xffffffff);
      }
    }

    setPassword(
      Array.from(randomValues, (value) => chars[value % chars.length]).join(""),
    );
  }

  function Option({ label, value, onValueChange }) {
    return (
      <View className="mb-3 flex-row items-center justify-between rounded-xl bg-white px-4 py-3">
        <Text className="text-base text-gray-800">{label}</Text>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: "#D1D5DB", true: "#0F766E" }}
        />
      </View>
    );
  }

  return (
    <ToolScreen
      title="Password Generator"
      description="Create a random password with your preferred character types."
    >
      <Text className="mb-2 font-semibold text-gray-800">
        Password Length (4–128)
      </Text>

      <TextInput
        value={length}
        onChangeText={setLength}
        keyboardType="number-pad"
        className="mb-5 rounded-xl border border-gray-200 bg-white p-4 text-base text-gray-900"
      />

      <Option
        label="Uppercase letters"
        value={uppercase}
        onValueChange={setUppercase}
      />
      <Option
        label="Lowercase letters"
        value={lowercase}
        onValueChange={setLowercase}
      />
      <Option label="Numbers" value={numbers} onValueChange={setNumbers} />
      <Option label="Symbols" value={symbols} onValueChange={setSymbols} />

      <View className="mt-3">
        <ActionButton title="Generate Password" onPress={generatePassword} />
      </View>

      {password ? (
        <View className="mt-6 rounded-2xl border border-gray-200 bg-white p-4">
          <Text className="mb-2 text-sm font-medium text-gray-500">
            Generated Password
          </Text>

          <Text selectable className="text-lg font-semibold text-gray-900">
            {password}
          </Text>

          <View className="mt-4">
            <ActionButton
              title="Copy Password"
              onPress={async () => {
                await copyText(password);
                Alert.alert("Copied", "Password copied to clipboard.");
              }}
            />
          </View>
        </View>
      ) : null}
    </ToolScreen>
  );
}
