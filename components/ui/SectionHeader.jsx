import { Text, View } from "react-native";

export default function SectionHeader({ title, subtitle }) {
  return (
    <View className="mb-4">
      <Text className="text-xl font-bold text-gray-900">{title}</Text>

      {subtitle ? (
        <Text className="mt-1 text-sm text-gray-500">{subtitle}</Text>
      ) : null}
    </View>
  );
}
