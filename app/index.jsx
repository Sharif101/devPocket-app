import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import SearchBar from "../components/ui/SearchBar";
import SectionHeader from "../components/ui/SectionHeader";
import ToolCard from "../components/ui/ToolCard";
import { TOOL_LIST } from "../utils/tools";

const CATEGORIES = [
  { label: "All Tools", value: "All", icon: "apps-outline" },
  { label: "Developer", value: "Developer", icon: "code-slash-outline" },
  { label: "Productivity", value: "Productivity", icon: "flash-outline" },
  { label: "Utilities", value: "Utilities", icon: "construct-outline" },
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase();

    return TOOL_LIST.filter((tool) => {
      const matchesSearch = `${tool.title} ${tool.description} ${tool.category}`
        .toLowerCase()
        .includes(query);

      const matchesCategory =
        selectedCategory === "All" ||
        tool.category?.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const featuredTool =
    TOOL_LIST.find((tool) => tool.id === "json-formatter") || TOOL_LIST[0];

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: Math.max(insets.top, 12) + 8,
          paddingBottom: 36,
        }}
      >
        {/* Header */}
        <View className="mb-7 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="mr-3 h-12 w-12 items-center justify-center rounded-2xl bg-teal-700">
              <Ionicons name="code-slash" size={26} color="#FFFFFF" />
            </View>

            <View>
              <Text className="text-xl font-extrabold tracking-tight text-slate-900">
                DevPocket
              </Text>
              <Text className="mt-0.5 text-xs text-slate-500">
                Your everyday toolkit
              </Text>
            </View>
          </View>

          <View className="h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white">
            <Ionicons name="sparkles-outline" size={21} color="#0F766E" />
          </View>
        </View>

        {/* Hero */}
        <View className="mb-6 overflow-hidden rounded-[28px] bg-[#123D3A] p-6">
          <View className="mb-4 self-start rounded-full border border-teal-200/30 bg-white/10 px-3 py-1.5">
            <Text className="text-xs font-semibold text-teal-100">
              YOUR DIGITAL SWISS ARMY KNIFE
            </Text>
          </View>

          <Text className="text-3xl font-extrabold leading-10 text-white">
            Small tools.{"\n"}Big productivity.
          </Text>

          <Text className="mt-3 text-sm leading-6 text-teal-100">
            Everything you need for coding and everyday tasks, all in one place.
          </Text>

          <View className="mt-5 flex-row items-center">
            <View className="mr-2 flex-row items-center rounded-xl bg-[#B7F08A] px-4 py-3">
              <Ionicons name="grid-outline" size={17} color="#173B2B" />
              <Text className="ml-2 font-bold text-[#173B2B]">
                {TOOL_LIST.length} tools
              </Text>
            </View>

            <View className="flex-row items-center rounded-xl border border-white/20 px-4 py-3">
              <Ionicons
                name="phone-portrait-outline"
                size={17}
                color="#FFFFFF"
              />
              <Text className="ml-2 font-semibold text-white">
                Pocket ready
              </Text>
            </View>
          </View>

          <View className="absolute -bottom-10 -right-5 h-36 w-36 rounded-full border-[22px] border-white/5" />
        </View>

        {/* Search */}
        <View className="mb-7">
          <Text className="mb-3 text-base font-bold text-slate-900">
            What do you need today?
          </Text>
          <SearchBar value={search} onChangeText={setSearch} />
        </View>

        {/* Quick access */}
        {!search && selectedCategory === "All" && featuredTool && (
          <View className="mb-7">
            <Text className="mb-3 text-base font-bold text-slate-900">
              Quick access
            </Text>

            <Pressable
              onPress={() => router.push(featuredTool.route)}
              className="flex-row items-center rounded-2xl border border-slate-200 bg-white p-4"
              style={({ pressed }) => ({
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <View className="mr-4 h-14 w-14 items-center justify-center rounded-2xl bg-amber-50">
                <Ionicons
                  name="code-working-outline"
                  size={27}
                  color="#B45309"
                />
              </View>

              <View className="flex-1">
                <Text className="text-base font-bold text-slate-900">
                  {featuredTool.title}
                </Text>
                <Text className="mt-1 text-sm leading-5 text-slate-500">
                  {featuredTool.description}
                </Text>
              </View>

              <Ionicons name="arrow-forward-circle" size={27} color="#0F766E" />
            </Pressable>
          </View>
        )}

        {/* Categories */}
        <View className="mb-6">
          <Text className="mb-3 text-base font-bold text-slate-900">
            Explore categories
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingRight: 4 }}
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category.value;

              return (
                <Pressable
                  key={category.value}
                  onPress={() => setSelectedCategory(category.value)}
                  className={`flex-row items-center rounded-full border px-4 py-2.5 ${
                    active
                      ? "border-teal-700 bg-teal-700"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <Ionicons
                    name={category.icon}
                    size={16}
                    color={active ? "#FFFFFF" : "#64748B"}
                  />
                  <Text
                    className={`ml-2 text-sm font-semibold ${
                      active ? "text-white" : "text-slate-600"
                    }`}
                  >
                    {category.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Tool list */}
        <View className="mb-4">
          <SectionHeader
            title={search ? "Search Results" : "All Your Tools"}
            subtitle={`${filteredTools.length} tools available`}
          />
        </View>

        {filteredTools.length > 0 ? (
          <View className="flex-row flex-wrap gap-3">
            {filteredTools.map((tool) => (
              <View key={tool.id} className="w-[47%] grow">
                <ToolCard
                  icon={tool.icon}
                  title={tool.title}
                  description={tool.description}
                  onPress={() => router.push(tool.route)}
                />
              </View>
            ))}
          </View>
        ) : (
          <View className="items-center rounded-3xl border border-slate-200 bg-white px-6 py-10">
            <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <Ionicons name="search-outline" size={30} color="#64748B" />
            </View>

            <Text className="text-base font-bold text-slate-900">
              No tools found
            </Text>

            <Text className="mt-2 text-center text-sm leading-5 text-slate-500">
              Try another keyword or choose a different category.
            </Text>

            <Pressable
              onPress={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="mt-4 rounded-xl bg-teal-700 px-5 py-3"
            >
              <Text className="font-bold text-white">Show all tools</Text>
            </Pressable>
          </View>
        )}

        {/* Footer card */}
        <View className="mt-8 rounded-2xl border border-teal-100 bg-[#ECFDF5] p-5">
          <View className="mb-2 flex-row items-center">
            <Ionicons
              name="shield-checkmark-outline"
              size={21}
              color="#0F766E"
            />
            <Text className="ml-2 text-base font-bold text-teal-950">
              Simple. Useful. Private.
            </Text>
          </View>

          <Text className="text-sm leading-6 text-teal-800">
            Your everyday toolkit for coding, productivity and quick tasks.
            Tools that work locally keep your input on your device.
          </Text>
        </View>

        <Text className="mt-6 text-center text-xs text-slate-400">
          Made for your everyday workflow
        </Text>
      </ScrollView>
    </View>
  );
}
