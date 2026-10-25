import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import ToolScreen from "../components/ui/ToolScreen";

export default function CalculatorScreen() {
  const [price, setPrice] = useState("1000");
  const [discount, setDiscount] = useState("10");
  const [result, setResult] = useState(null);

  function calculate() {
    const p = Number(price);
    const d = Number(discount);

    if (
      !price.trim() ||
      !discount.trim() ||
      !Number.isFinite(p) ||
      !Number.isFinite(d) ||
      p < 0 ||
      d < 0 ||
      d > 100
    ) {
      Alert.alert(
        "Invalid input",
        "Enter a valid price and discount (0–100%).",
      );
      return;
    }

    const saved = (p * d) / 100;
    setResult({
      saved,
      finalPrice: p - saved,
    });
  }

  return (
    <ToolScreen
      title="Calculator"
      description="Calculate price discounts instantly."
    >
      <Text className="mb-2 font-semibold text-gray-800">Original price</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        keyboardType="decimal-pad"
        className="rounded-xl border border-gray-200 bg-white p-4 text-gray-900"
      />

      <Text className="mb-2 mt-5 font-semibold text-gray-800">
        Discount (%)
      </Text>
      <TextInput
        value={discount}
        onChangeText={setDiscount}
        keyboardType="decimal-pad"
        className="rounded-xl border border-gray-200 bg-white p-4 text-gray-900"
      />

      <Text
        onPress={calculate}
        className="mt-5 rounded-xl bg-teal-700 p-4 text-center font-bold text-white"
      >
        Calculate
      </Text>

      {result && (
        <View className="mt-5 rounded-2xl bg-white p-5">
          <Text className="text-sm text-gray-500">Final price</Text>
          <Text className="my-1 text-3xl font-bold text-teal-700">
            {result.finalPrice.toFixed(2)}
          </Text>
          <Text className="mt-2 text-gray-600">
            You save: {result.saved.toFixed(2)}
          </Text>
        </View>
      )}
    </ToolScreen>
  );
}
