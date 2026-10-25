import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import ToolScreen from "../components/ui/ToolScreen";

export default function PomodoroScreen() {
  const [mode, setMode] = useState("focus");
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setSeconds((previous) => {
        if (previous <= 1) {
          clearInterval(timer);
          setRunning(false);
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running]);

  function changeMode(nextMode) {
    setMode(nextMode);
    setSeconds(nextMode === "focus" ? 25 * 60 : 5 * 60);
    setRunning(false);
  }

  const display = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <ToolScreen
      title="Focus Timer"
      description="Work with focus, then take a break."
    >
      <View className="items-center rounded-3xl bg-white p-8">
        <Text className="text-base font-semibold text-gray-500">
          {mode === "focus" ? "FOCUS SESSION" : "SHORT BREAK"}
        </Text>
        <Text className="my-8 text-6xl font-bold text-teal-700">{display}</Text>

        <View className="mb-5 w-full flex-row gap-3">
          <Text
            onPress={() => changeMode("focus")}
            className={`flex-1 rounded-xl p-3 text-center font-semibold ${mode === "focus" ? "bg-teal-700 text-white" : "bg-gray-100 text-gray-800"}`}
          >
            Focus
          </Text>
          <Text
            onPress={() => changeMode("break")}
            className={`flex-1 rounded-xl p-3 text-center font-semibold ${mode === "break" ? "bg-teal-700 text-white" : "bg-gray-100 text-gray-800"}`}
          >
            Break
          </Text>
        </View>

        <Text
          onPress={() => setRunning((previous) => seconds > 0 && !previous)}
          className="w-full rounded-xl bg-teal-700 p-4 text-center font-bold text-white"
        >
          {running ? "Pause" : "Start"}
        </Text>
        <Text
          onPress={() => {
            setRunning(false);
            setSeconds(mode === "focus" ? 25 * 60 : 5 * 60);
          }}
          className="mt-4 p-2 font-semibold text-gray-600"
        >
          Reset timer
        </Text>
        {seconds === 0 && (
          <Text className="mt-3 text-center font-semibold text-teal-700">
            Session complete! Great work.
          </Text>
        )}
      </View>
      <Text className="mt-4 text-xs leading-5 text-gray-500">
        Note: the timer is intended to run while this screen is active. Mobile
        operating systems may pause timers when the app is in the background.
      </Text>
    </ToolScreen>
  );
}
