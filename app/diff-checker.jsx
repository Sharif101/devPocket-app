import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput } from "react-native";

function compareLines(original, updated) {
  const oldLines = original.split("\n");
  const newLines = updated.split("\n");
  const maxLength = Math.max(oldLines.length, newLines.length);
  const results = [];

  for (let i = 0; i < maxLength; i++) {
    const oldLine = oldLines[i];
    const newLine = newLines[i];

    if (oldLine === undefined) {
      results.push({ type: "added", line: newLine, number: i + 1 });
    } else if (newLine === undefined) {
      results.push({ type: "removed", line: oldLine, number: i + 1 });
    } else if (oldLine === newLine) {
      results.push({ type: "same", line: oldLine, number: i + 1 });
    } else {
      results.push({ type: "removed", line: oldLine, number: i + 1 });
      results.push({ type: "added", line: newLine, number: i + 1 });
    }
  }

  return results;
}

export default function DiffChecker() {
  const [original, setOriginal] = useState("");
  const [updated, setUpdated] = useState("");
  const [results, setResults] = useState(null);

  const handleCompare = () => {
    setResults(compareLines(original, updated));
  };

  const clearAll = () => {
    setOriginal("");
    setUpdated("");
    setResults(null);
  };

  const addedCount = results
    ? results.filter((item) => item.type === "added").length
    : 0;

  const removedCount = results
    ? results.filter((item) => item.type === "removed").length
    : 0;

  return (
    <ScrollView className="flex-1 bg-slate-950 px-5 py-6">
      <Text className="mb-2 text-2xl font-bold text-white">Diff Checker</Text>

      <Text className="mb-6 text-sm leading-6 text-slate-400">
        Compare two text blocks line by line to find additions and removals.
      </Text>

      <Text className="mb-2 font-semibold text-slate-200">Original Text</Text>

      <TextInput
        value={original}
        onChangeText={setOriginal}
        multiline
        placeholder="Paste original text..."
        placeholderTextColor="#64748b"
        textAlignVertical="top"
        className="min-h-36 rounded-xl border border-slate-700 bg-slate-900 p-4 text-white"
      />

      <Text className="mb-2 mt-5 font-semibold text-slate-200">
        Updated Text
      </Text>

      <TextInput
        value={updated}
        onChangeText={setUpdated}
        multiline
        placeholder="Paste updated text..."
        placeholderTextColor="#64748b"
        textAlignVertical="top"
        className="min-h-36 rounded-xl border border-slate-700 bg-slate-900 p-4 text-white"
      />

      <Pressable
        onPress={handleCompare}
        className="mt-4 rounded-xl bg-cyan-500 p-4"
      >
        <Text className="text-center font-bold text-slate-950">
          Compare Text
        </Text>
      </Pressable>

      {results !== null ? (
        <>
          <Text className="mb-4 mt-6 text-lg font-bold text-white">
            Comparison Result
          </Text>

          <Text className="mb-3 text-sm text-slate-300">
            Added:{" "}
            <Text className="font-bold text-emerald-400">{addedCount}</Text>
            {"  "}Removed:{" "}
            <Text className="font-bold text-red-400">{removedCount}</Text>
          </Text>

          {results.length === 0 ? (
            <Text className="rounded-xl bg-slate-900 p-4 text-slate-300">
              No differences found.
            </Text>
          ) : (
            results.map((item, index) => {
              const style =
                item.type === "added"
                  ? "border-emerald-800 bg-emerald-950"
                  : item.type === "removed"
                    ? "border-red-800 bg-red-950"
                    : "border-slate-800 bg-slate-900";

              const prefix =
                item.type === "added"
                  ? "+"
                  : item.type === "removed"
                    ? "-"
                    : " ";

              const textColor =
                item.type === "added"
                  ? "text-emerald-300"
                  : item.type === "removed"
                    ? "text-red-300"
                    : "text-slate-300";

              return (
                <Text
                  key={`${index}-${item.type}`}
                  className={`mb-1 rounded-lg border px-3 py-2 font-mono text-sm ${style} ${textColor}`}
                >
                  {prefix} {item.number}: {item.line || " "}
                </Text>
              );
            })
          )}
        </>
      ) : null}

      <Pressable onPress={clearAll} className="mb-8 mt-4 rounded-xl p-3">
        <Text className="text-center font-semibold text-slate-400">
          Clear All
        </Text>
      </Pressable>
    </ScrollView>
  );
}
