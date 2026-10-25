import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import ToolScreen from "../components/ui/ToolScreen";
import { copyText } from "../utils/clipboard";

export default function TextToolkitScreen() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const words = input.trim() ? input.trim().split(/\s+/).length : 0;

  function transform(type) {
    const actions = {
      upper: () => input.toUpperCase(),
      lower: () => input.toLowerCase(),
      title: () => input.replace(/\b\w/g, (c) => c.toUpperCase()),
      trim: () =>
        input
          .split("\n")
          .map((line) => line.trim())
          .join("\n"),
      reverse: () => input.split("").reverse().join(""),
      sort: () => input.split("\n").sort().join("\n"),
    };

    setOutput(actions[type]());
  }

  const buttons = [
    ["UPPERCASE", "upper"],
    ["lowercase", "lower"],
    ["Title Case", "title"],
    ["Trim spaces", "trim"],
    ["Reverse text", "reverse"],
    ["Sort lines", "sort"],
  ];

  return (
    <ToolScreen
      title="Text Toolkit"
      description="Count and transform text on your device."
    >
      <TextInput
        value={input}
        onChangeText={setInput}
        multiline
        placeholder="Type or paste your text..."
        textAlignVertical="top"
        className="min-h-40 rounded-2xl border border-gray-200 bg-white p-4 text-gray-900"
      />

      <View className="my-4 flex-row flex-wrap gap-2">
        <Text className="rounded-lg bg-teal-50 p-3 text-teal-800">
          Words: {words}
        </Text>
        <Text className="rounded-lg bg-teal-50 p-3 text-teal-800">
          Characters: {input.length}
        </Text>
        <Text className="rounded-lg bg-teal-50 p-3 text-teal-800">
          Lines: {input ? input.split("\n").length : 0}
        </Text>
      </View>

      <View className="flex-row flex-wrap gap-2">
        {buttons.map(([label, type]) => (
          <Text
            key={type}
            onPress={() => transform(type)}
            className="overflow-hidden rounded-xl bg-teal-700 px-3 py-3 font-semibold text-white"
          >
            {label}
          </Text>
        ))}
      </View>

      {output !== "" && (
        <View className="mt-5 rounded-2xl border border-gray-200 bg-white p-4">
          <Text className="mb-2 font-bold text-gray-800">Result</Text>
          <Text selectable className="text-gray-800">
            {output}
          </Text>
          <Text
            onPress={() => copyText(output)}
            className="mt-4 font-semibold text-teal-700"
          >
            Copy result
          </Text>
        </View>
      )}
    </ToolScreen>
  );
}
