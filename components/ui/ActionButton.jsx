import { ActivityIndicator, Pressable, Text } from "react-native";

export default function ActionButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
}) {
  const primary = variant === "primary";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`min-h-12 flex-row items-center justify-center rounded-xl px-4 py-3 ${
        primary ? "bg-teal-700" : "border border-gray-200 bg-white"
      } ${disabled ? "opacity-50" : ""}`}
    >
      {loading ? (
        <ActivityIndicator color={primary ? "#FFFFFF" : "#0F766E"} />
      ) : (
        <Text
          className={`font-semibold ${
            primary ? "text-white" : "text-gray-800"
          }`}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
