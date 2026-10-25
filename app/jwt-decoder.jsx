import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, TextInput } from "react-native";

function decodeBase64Url(value) {
  const base64 = value
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(value.length / 4) * 4, "=");

  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

function prettyJson(value) {
  return JSON.stringify(JSON.parse(value), null, 2);
}

export default function JwtDecoder() {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [error, setError] = useState("");

  const decodeToken = () => {
    setHeader("");
    setPayload("");
    setError("");

    const parts = token.trim().split(".");

    if (parts.length !== 3 || parts.some((part) => !part)) {
      setError(
        "Invalid JWT format. A JWT should contain three parts separated by dots.",
      );
      return;
    }

    try {
      const decodedHeader = prettyJson(decodeBase64Url(parts[0]));
      const decodedPayload = prettyJson(decodeBase64Url(parts[1]));

      setHeader(decodedHeader);
      setPayload(decodedPayload);
    } catch {
      setError(
        "Could not decode this token. Check that the JWT contains valid Base64URL-encoded JSON.",
      );
    }
  };

  const copyText = async (value) => {
    await Clipboard.setStringAsync(value);
    Alert.alert("Copied", "Text copied to clipboard.");
  };

  const clearAll = () => {
    setToken("");
    setHeader("");
    setPayload("");
    setError("");
  };

  return (
    <ScrollView className="flex-1 bg-slate-950 px-5 py-6">
      <Text className="mb-2 text-2xl font-bold text-white">JWT Decoder</Text>

      <Text className="mb-5 text-sm leading-6 text-slate-400">
        Decode a JSON Web Token to inspect its header and payload. Decoding does
        not verify the signature.
      </Text>

      <Text className="mb-2 font-semibold text-slate-200">JWT Token</Text>

      <TextInput
        value={token}
        onChangeText={setToken}
        multiline
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Paste your JWT token here..."
        placeholderTextColor="#64748b"
        textAlignVertical="top"
        className="min-h-36 rounded-xl border border-slate-700 bg-slate-900 p-4 text-white"
      />

      <Pressable
        onPress={decodeToken}
        className="mt-4 rounded-xl bg-cyan-500 p-4"
      >
        <Text className="text-center font-bold text-slate-950">
          Decode Token
        </Text>
      </Pressable>

      {error ? (
        <Text className="mt-4 rounded-xl border border-red-800 bg-red-950 p-4 text-red-300">
          {error}
        </Text>
      ) : null}

      {header ? (
        <>
          <Text className="mb-2 mt-6 text-lg font-bold text-white">Header</Text>

          <TextInput
            value={header}
            editable={false}
            multiline
            textAlignVertical="top"
            className="min-h-28 rounded-xl border border-slate-700 bg-slate-900 p-4 font-mono text-emerald-300"
          />

          <Pressable
            onPress={() => copyText(header)}
            className="mt-2 rounded-lg bg-slate-800 p-3"
          >
            <Text className="text-center font-semibold text-white">
              Copy Header
            </Text>
          </Pressable>

          <Text className="mb-2 mt-6 text-lg font-bold text-white">
            Payload
          </Text>

          <TextInput
            value={payload}
            editable={false}
            multiline
            textAlignVertical="top"
            className="min-h-40 rounded-xl border border-slate-700 bg-slate-900 p-4 font-mono text-emerald-300"
          />

          <Pressable
            onPress={() => copyText(payload)}
            className="mt-2 rounded-lg bg-slate-800 p-3"
          >
            <Text className="text-center font-semibold text-white">
              Copy Payload
            </Text>
          </Pressable>
        </>
      ) : null}

      <Pressable onPress={clearAll} className="mb-8 mt-4 rounded-xl p-3">
        <Text className="text-center font-semibold text-slate-400">
          Clear All
        </Text>
      </Pressable>

      <Text className="mb-8 text-xs leading-5 text-amber-300">
        Security tip: Avoid pasting real production tokens into tools you do not
        trust. A decoded payload may contain sensitive information.
      </Text>
    </ScrollView>
  );
}
