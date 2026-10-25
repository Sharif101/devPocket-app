import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, TextInput } from "react-native";

export default function HtmlEntities() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");

  const encodeHtml = (value) =>
    value.replace(/[&<>"']/g, (char) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };

      return entities[char];
    });

  const decodeHtml = (value) => {
    const entities = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'",
      "&apos;": "'",
      "&nbsp;": "\u00A0",
    };

    return value.replace(
      /&(?:amp|lt|gt|quot|apos|nbsp|#39|#x[0-9a-f]+|#\d+);/gi,
      (entity) => {
        if (entities[entity]) return entities[entity];

        const numericMatch = entity.match(/^&#(x[0-9a-f]+|\d+);$/i);

        if (numericMatch) {
          const code = numericMatch[1].toLowerCase().startsWith("x")
            ? parseInt(numericMatch[1].slice(1), 16)
            : parseInt(numericMatch[1], 10);

          try {
            return String.fromCodePoint(code);
          } catch {
            return entity;
          }
        }

        return entity;
      },
    );
  };

  const handleConvert = () => {
    setOutput(mode === "encode" ? encodeHtml(input) : decodeHtml(input));
  };

  const copyOutput = async () => {
    await Clipboard.setStringAsync(output);
    Alert.alert("Copied", "Output copied to clipboard.");
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ScrollView className="flex-1 bg-slate-950 px-5 py-6">
      <Text className="mb-2 text-2xl font-bold text-white">HTML Entities</Text>

      <Text className="mb-6 text-sm text-slate-400">
        Encode special characters or decode HTML entities.
      </Text>

      <Text className="mb-2 font-semibold text-slate-200">Conversion mode</Text>

      <Pressable
        onPress={() => {
          setMode(mode === "encode" ? "decode" : "encode");
          setOutput("");
        }}
        className="mb-5 rounded-xl border border-slate-700 bg-slate-900 p-4"
      >
        <Text className="text-center font-semibold text-cyan-400">
          {mode === "encode"
            ? "Encode HTML  →  Switch to Decode"
            : "Decode HTML  →  Switch to Encode"}
        </Text>
      </Pressable>

      <Text className="mb-2 font-semibold text-slate-200">Input</Text>

      <TextInput
        value={input}
        onChangeText={setInput}
        multiline
        placeholder="Enter text or HTML entities..."
        placeholderTextColor="#64748b"
        textAlignVertical="top"
        className="min-h-36 rounded-xl border border-slate-700 bg-slate-900 p-4 text-white"
      />

      <Pressable
        onPress={handleConvert}
        className="mt-4 rounded-xl bg-cyan-500 p-4"
      >
        <Text className="text-center font-bold text-slate-950">
          {mode === "encode" ? "Encode" : "Decode"}
        </Text>
      </Pressable>

      <Text className="mb-2 mt-6 font-semibold text-slate-200">Output</Text>

      <TextInput
        value={output}
        editable={false}
        multiline
        placeholder="Your result will appear here..."
        placeholderTextColor="#64748b"
        textAlignVertical="top"
        className="min-h-36 rounded-xl border border-slate-700 bg-slate-900 p-4 text-emerald-300"
      />

      <Pressable
        onPress={copyOutput}
        disabled={!output}
        className={`mt-4 rounded-xl p-4 ${output ? "bg-emerald-600" : "bg-slate-800"}`}
      >
        <Text className="text-center font-bold text-white">Copy Output</Text>
      </Pressable>

      <Pressable onPress={clearAll} className="mb-8 mt-3 rounded-xl p-3">
        <Text className="text-center font-semibold text-slate-400">
          Clear All
        </Text>
      </Pressable>
    </ScrollView>
  );
}
