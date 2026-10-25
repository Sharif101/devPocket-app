import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

import ActionButton from "../components/ui/ActionButton";
import ToolScreen from "../components/ui/ToolScreen";
import { copyText } from "../utils/clipboard";

export default function TimestampScreen() {
  const [timestamp, setTimestamp] = useState(
    String(Math.floor(Date.now() / 1000)),
  );
  const [dateInput, setDateInput] = useState(
    new Date().toISOString().slice(0, 16),
  );
  const [timestampResult, setTimestampResult] = useState("");
  const [dateResult, setDateResult] = useState("");

  function convertToDate() {
    const value = Number(timestamp);

    if (!timestamp.trim() || !Number.isFinite(value)) {
      Alert.alert("Invalid timestamp", "Enter a valid Unix timestamp.");
      return;
    }

    const date = new Date(Math.abs(value) < 1e12 ? value * 1000 : value);

    if (Number.isNaN(date.getTime())) {
      Alert.alert("Invalid timestamp", "This timestamp is out of range.");
      return;
    }

    setTimestampResult(date.toISOString());
  }

  function convertToTimestamp() {
    const date = new Date(dateInput);

    if (Number.isNaN(date.getTime())) {
      Alert.alert("Invalid date", "Enter a valid date and time.");
      return;
    }

    setDateResult(
      `Seconds: ${Math.floor(date.getTime() / 1000)}\nMilliseconds: ${date.getTime()}`,
    );
  }

  return (
    <ToolScreen
      title="Timestamp Converter"
      description="Convert Unix seconds or milliseconds to dates and back."
    >
      <Text className="mb-2 font-semibold text-gray-800">Unix Timestamp</Text>

      <TextInput
        value={timestamp}
        onChangeText={setTimestamp}
        keyboardType="numeric"
        className="rounded-xl border border-gray-200 bg-white p-4 text-base text-gray-900"
      />

      <View className="mt-3">
        <ActionButton title="Convert to Date" onPress={convertToDate} />
      </View>

      {timestampResult ? (
        <View className="mt-3 rounded-xl bg-white p-4">
          <Text selectable className="text-gray-800">
            {timestampResult}
          </Text>
          <View className="mt-3">
            <ActionButton
              title="Copy Date"
              variant="secondary"
              onPress={async () => {
                await copyText(timestampResult);
                Alert.alert("Copied", "Date copied.");
              }}
            />
          </View>
        </View>
      ) : null}

      <Text className="mb-2 mt-8 font-semibold text-gray-800">
        Date and Time
      </Text>

      <TextInput
        value={dateInput}
        onChangeText={setDateInput}
        placeholder="2026-10-25T12:00"
        className="rounded-xl border border-gray-200 bg-white p-4 text-base text-gray-900"
      />

      <Text className="mt-2 text-xs text-gray-500">
        Use a date such as 2026-10-25T12:00.
      </Text>

      <View className="mt-3">
        <ActionButton
          title="Convert to Timestamp"
          onPress={convertToTimestamp}
        />
      </View>

      {dateResult ? (
        <View className="mt-3 rounded-xl bg-white p-4">
          <Text selectable className="leading-6 text-gray-800">
            {dateResult}
          </Text>
          <View className="mt-3">
            <ActionButton
              title="Copy Timestamps"
              variant="secondary"
              onPress={async () => {
                await copyText(dateResult);
                Alert.alert("Copied", "Timestamps copied.");
              }}
            />
          </View>
        </View>
      ) : null}
    </ToolScreen>
  );
}
