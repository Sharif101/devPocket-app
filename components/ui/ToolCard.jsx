import { Pressable, Text, View } from "react-native";

export default function ToolCard({ icon, title, description, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 rounded-2xl border border-gray-200 bg-white p-4 active:opacity-70"
    >
      <View className="mb-4 h-11 w-11 items-center justify-center rounded-xl bg-teal-50">
        <Text className="text-2xl">{icon}</Text>
      </View>

      <Text className="text-base font-bold text-gray-900">{title}</Text>

      <Text className="mt-1 text-sm leading-5 text-gray-500">
        {description}
      </Text>
    </Pressable>
  );
}
