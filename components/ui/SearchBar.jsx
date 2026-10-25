import { Text, TextInput, View } from "react-native";

export default function SearchBar({ value, onChangeText }) {
  return (
    <View className="flex-row items-center rounded-2xl border border-gray-200 bg-white px-4">
      <Text className="mr-3 text-lg">⌕</Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search developer tools..."
        placeholderTextColor="#9CA3AF"
        autoCapitalize="none"
        className="min-h-14 flex-1 text-base text-gray-900"
      />

      {value.length > 0 && (
        <Text
          onPress={() => onChangeText("")}
          className="px-2 py-3 text-gray-500"
        >
          ✕
        </Text>
      )}
    </View>
  );
}
