import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import ToolScreen from "../components/ui/ToolScreen";

const STORAGE_KEY = "dev-pocket-expenses";

export default function ExpenseTrackerScreen() {
  const [items, setItems] = useState([]);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [type, setType] = useState("expense");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => {
        if (value) setItems(JSON.parse(value));
      })
      .catch(() => Alert.alert("Error", "Could not load saved transactions."))
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items)).catch(() =>
        Alert.alert("Error", "Could not save transactions."),
      );
    }
  }, [items, loaded]);

  const income = items
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const expenses = items
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  function addTransaction() {
    const value = Number(amount);

    if (!amount.trim() || !Number.isFinite(value) || value <= 0) {
      Alert.alert("Invalid amount", "Enter an amount greater than zero.");
      return;
    }

    setItems((previous) => [
      {
        id: `${Date.now()}-${Math.random()}`,
        amount: value,
        note: note.trim() || (type === "income" ? "Income" : "Expense"),
        type,
        date: new Date().toLocaleDateString(),
      },
      ...previous,
    ]);
    setAmount("");
    setNote("");
  }

  return (
    <ToolScreen
      title="Expense Tracker"
      description="Track personal income and expenses locally."
    >
      <View className="mb-5 rounded-2xl bg-teal-900 p-5">
        <Text className="text-sm text-teal-100">Available balance</Text>
        <Text className="mt-1 text-3xl font-bold text-white">
          {(income - expenses).toFixed(2)}
        </Text>
        <View className="mt-4 flex-row justify-between">
          <View>
            <Text className="text-teal-100">Income</Text>
            <Text className="mt-1 font-bold text-white">
              {income.toFixed(2)}
            </Text>
          </View>
          <View>
            <Text className="text-teal-100">Expenses</Text>
            <Text className="mt-1 font-bold text-white">
              {expenses.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <Text className="mb-2 font-semibold text-gray-800">Transaction type</Text>
      <View className="mb-4 flex-row gap-3">
        <Text
          onPress={() => setType("expense")}
          className={`flex-1 rounded-xl p-3 text-center font-semibold ${type === "expense" ? "bg-teal-700 text-white" : "bg-white text-gray-800"}`}
        >
          Expense
        </Text>
        <Text
          onPress={() => setType("income")}
          className={`flex-1 rounded-xl p-3 text-center font-semibold ${type === "income" ? "bg-teal-700 text-white" : "bg-white text-gray-800"}`}
        >
          Income
        </Text>
      </View>

      <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="decimal-pad"
        placeholder="Amount"
        className="mb-3 rounded-xl border border-gray-200 bg-white p-4 text-gray-900"
      />
      <TextInput
        value={note}
        onChangeText={setNote}
        placeholder="Description (e.g. Groceries)"
        className="rounded-xl border border-gray-200 bg-white p-4 text-gray-900"
      />
      <Text
        onPress={addTransaction}
        className="mt-3 rounded-xl bg-teal-700 p-4 text-center font-bold text-white"
      >
        Add transaction
      </Text>

      <Text className="mb-3 mt-7 text-lg font-bold text-gray-900">
        Transactions
      </Text>

      {items.map((item) => (
        <View
          key={item.id}
          className="mb-3 flex-row items-center rounded-xl bg-white p-4"
        >
          <View className="flex-1">
            <Text className="font-semibold text-gray-900">{item.note}</Text>
            <Text className="mt-1 text-xs text-gray-500">{item.date}</Text>
          </View>
          <Text
            className={
              item.type === "income"
                ? "font-bold text-green-700"
                : "font-bold text-red-600"
            }
          >
            {item.type === "income" ? "+" : "-"}
            {item.amount.toFixed(2)}
          </Text>
          <Text
            onPress={() =>
              setItems((previous) => previous.filter((x) => x.id !== item.id))
            }
            className="ml-3 text-xs text-gray-500"
          >
            ✕
          </Text>
        </View>
      ))}
    </ToolScreen>
  );
}
