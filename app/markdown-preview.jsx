import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import Markdown from "react-native-markdown-display";
import ToolScreen from "../components/ui/ToolScreen";

const SAMPLE = `# Hello Dev Pocket

Write **bold** or *italic* text.

- First item
- Second item

\`const app = "Dev Pocket";\`

[Open Expo](https://expo.dev)`;

export default function MarkdownPreviewScreen() {
  const [markdown, setMarkdown] = useState(SAMPLE);

  return (
    <ToolScreen
      title="Markdown Preview"
      description="Write Markdown and see the rendered result."
    >
      <Text className="mb-2 font-semibold text-gray-800">Markdown input</Text>
      <TextInput
        value={markdown}
        onChangeText={setMarkdown}
        multiline
        autoCapitalize="none"
        textAlignVertical="top"
        className="min-h-52 rounded-xl border border-gray-200 bg-white p-4 font-mono text-sm text-gray-900"
      />

      <Text className="mb-3 mt-6 text-lg font-bold text-gray-900">Preview</Text>
      <View className="rounded-2xl border border-gray-200 bg-white p-4">
        <Markdown
          style={{
            body: { color: "#1F2937", fontSize: 15 },
            heading1: { color: "#111827", fontSize: 26, fontWeight: "700" },
            heading2: { color: "#111827", fontSize: 21, fontWeight: "700" },
            code_inline: { backgroundColor: "#F3F4F6", color: "#0F766E" },
            fence: { backgroundColor: "#F3F4F6", color: "#111827" },
            link: { color: "#0F766E" },
          }}
        >
          {markdown}
        </Markdown>
      </View>
    </ToolScreen>
  );
}
