import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

import ActionButton from "../components/ui/ActionButton";
import ToolScreen from "../components/ui/ToolScreen";
import { copyText } from "../utils/clipboard";

export default function JsonFormatterScreen() {
  const [input, setInput] = useState('{"name":"Dev Pocket","active":true}');
  const [output, setOutput] = useState("");

  function formatJson() {
    try {
      setOutput(JSON.stringify(JSON.parse(input), null, 2));
    } catch {
      setOutput("");
      Alert.alert("Invalid JSON", "Please check your JSON syntax.");
    }
  }

  function minifyJson() {
    try {
      setOutput(JSON.stringify(JSON.parse(input)));
    } catch {
      setOutput("");
      Alert.alert("Invalid JSON", "Please check your JSON syntax.");
    }
  }

  return (
    <ToolScreen
      title="JSON Formatter"
      description="Format, validate and minify JSON locally."
    >
      <Text className="mb-2 font-semibold text-gray-800">Input JSON</Text>

      <TextInput
        value={input}
        onChangeText={setInput}
        multiline
        textAlignVertical="top"
        autoCapitalize="none"
        className="min-h-48 rounded-2xl border border-gray-200 bg-white p-4 font-mono text-sm text-gray-900"
      />

      <View className="mt-4 flex-row gap-3">
        <View className="flex-1">
          <ActionButton title="Format JSON" onPress={formatJson} />
        </View>
        <View className="flex-1">
          <ActionButton
            title="Minify"
            variant="secondary"
            onPress={minifyJson}
          />
        </View>
      </View>

      {output ? (
        <View className="mt-6">
          <Text className="mb-2 font-semibold text-gray-800">Result</Text>
          <Text
            selectable
            className="rounded-2xl border border-gray-200 bg-white p-4 font-mono text-sm leading-6 text-gray-800"
          >
            {output}
          </Text>

          <View className="mt-3">
            <ActionButton
              title="Copy Result"
              onPress={async () => {
                await copyText(output);
                Alert.alert("Copied", "JSON copied to clipboard.");
              }}
            />
          </View>
        </View>
      ) : null}
    </ToolScreen>
  );
}
