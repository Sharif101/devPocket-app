import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import ToolScreen from "../components/ui/ToolScreen";

const STORAGE_KEY = "dev-pocket-tasks";

export default function TodoScreen() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => {
        if (value) setTasks(JSON.parse(value));
      })
      .catch(() => Alert.alert("Error", "Could not load saved tasks."))
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)).catch(() =>
        Alert.alert("Error", "Could not save tasks."),
      );
    }
  }, [tasks, loaded]);

  function addTask() {
    if (!task.trim()) return;

    setTasks((previous) => [
      { id: `${Date.now()}-${Math.random()}`, title: task.trim(), done: false },
      ...previous,
    ]);
    setTask("");
  }

  function toggleTask(id) {
    setTasks((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  }

  function deleteTask(id) {
    setTasks((previous) => previous.filter((item) => item.id !== id));
  }

  return (
    <ToolScreen
      title="To-Do List"
      description="Your tasks are saved on this device."
    >
      <View className="flex-row gap-2">
        <TextInput
          value={task}
          onChangeText={setTask}
          placeholder="What do you need to do?"
          onSubmitEditing={addTask}
          returnKeyType="done"
          className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white p-4 text-gray-900"
        />
        <Text
          onPress={addTask}
          className="self-center rounded-xl bg-teal-700 px-4 py-4 font-bold text-white"
        >
          Add
        </Text>
      </View>

      <Text className="mb-3 mt-6 font-bold text-gray-900">
        Tasks ({tasks.filter((item) => !item.done).length} remaining)
      </Text>

      {tasks.map((item) => (
        <View
          key={item.id}
          className="mb-3 flex-row items-center rounded-xl border border-gray-200 bg-white p-4"
        >
          <Text
            onPress={() => toggleTask(item.id)}
            className="mr-3 text-xl text-teal-700"
          >
            {item.done ? "☑" : "□"}
          </Text>
          <Text
            onPress={() => toggleTask(item.id)}
            className={`flex-1 text-base ${item.done ? "text-gray-400 line-through" : "text-gray-800"}`}
          >
            {item.title}
          </Text>
          <Text
            onPress={() => deleteTask(item.id)}
            className="ml-3 p-2 text-red-600"
          >
            Delete
          </Text>
        </View>
      ))}
    </ToolScreen>
  );
}
