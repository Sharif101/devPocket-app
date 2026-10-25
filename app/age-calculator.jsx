import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import ToolScreen from "../components/ui/ToolScreen";

export default function AgeCalculatorScreen() {
  const [birthDate, setBirthDate] = useState("2000-01-01");
  const [result, setResult] = useState(null);

  function calculateAge() {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
      Alert.alert("Invalid date", "Use YYYY-MM-DD format.");
      return;
    }

    const birth = new Date(`${birthDate}T00:00:00`);
    const today = new Date();

    if (
      Number.isNaN(birth.getTime()) ||
      birth.getFullYear() !== Number(birthDate.slice(0, 4)) ||
      birth.getMonth() + 1 !== Number(birthDate.slice(5, 7)) ||
      birth.getDate() !== Number(birthDate.slice(8, 10)) ||
      birth > today
    ) {
      Alert.alert("Invalid date", "Enter a valid date in the past.");
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({ years, months, days });
  }

  return (
    <ToolScreen
      title="Age Calculator"
      description="Calculate age from your date of birth."
    >
      <Text className="mb-2 font-semibold text-gray-800">Date of birth</Text>
      <TextInput
        value={birthDate}
        onChangeText={setBirthDate}
        placeholder="YYYY-MM-DD"
        className="rounded-xl border border-gray-200 bg-white p-4 text-gray-900"
      />

      <Text
        onPress={calculateAge}
        className="mt-4 rounded-xl bg-teal-700 p-4 text-center font-bold text-white"
      >
        Calculate age
      </Text>

      {result && (
        <View className="mt-5 rounded-2xl bg-white p-5">
          <Text className="text-3xl font-bold text-teal-700">
            {result.years} years
          </Text>
          <Text className="mt-2 text-gray-600">
            {result.months} months and {result.days} days
          </Text>
        </View>
      )}
    </ToolScreen>
  );
}
