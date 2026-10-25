import { ScrollView, Text, View } from "react-native";

export default function ToolScreen({ title, description, children }) {
  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 40,
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-6 mt-2">
        <Text className="text-2xl font-bold text-gray-900">{title}</Text>

        <Text className="mt-2 text-sm leading-5 text-gray-500">
          {description}
        </Text>
      </View>

      {children}
    </ScrollView>
  );
}
