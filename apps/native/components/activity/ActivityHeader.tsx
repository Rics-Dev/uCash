import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@/contexts/app-theme-context";
import { GlassInput } from "@/components/GlassInput";
import { GlassButton } from "@/components/GlassButton";
import { useState } from "react";
import Animated, { 
  FadeIn, 
  FadeOut, 
  LinearTransition, 
  FadeInRight, 
  FadeOutRight,
  FadeInLeft,
  FadeOutLeft
} from "react-native-reanimated";
import { TimelinePicker, DateFilter } from "./TimelinePicker";

type ActivityHeaderProps = {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  filter: DateFilter;
  onFilterChange: (filter: DateFilter) => void;
  onFilterPress: () => void;
};

export const ActivityHeader = ({
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange,
  onFilterPress,
}: ActivityHeaderProps) => {
  const { isDark } = useAppTheme();
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleSearch = () => {
    // If opening search, close others immediately
    if (!isSearching) {
      setShowFilters(false);
      setShowDatePicker(false);
    }
    setIsSearching(!isSearching);
  };

  const toggleFilters = () => {
    // If opening filters, close others immediately
    if (!showFilters) {
      setIsSearching(false);
      setShowDatePicker(false);
    }
    setShowFilters(!showFilters);
  };

  const toggleDatePicker = () => {
    // If opening date picker, close others immediately
    if (!showDatePicker) {
      setShowFilters(false);
      setIsSearching(false);
    }
    setShowDatePicker(!showDatePicker);
  };

  // Standard animation duration for a "non-bouncy", professional feel
  const ANIM_DURATION = 300;

  return (
    <View className="px-4 pb-4 bg-neutral-50 dark:bg-black pt-2 z-10">
      {/* Top Row: Title/Search vs SearchBar */}
      <View className="h-14 mb-3.5 justify-center">
        {isSearching ? (
          <Animated.View 
            key="search-bar"
            entering={FadeInRight.duration(ANIM_DURATION)} 
            exiting={FadeOutRight.duration(ANIM_DURATION)}
            className="absolute w-full h-full flex-row items-center gap-3"
          >
            <View className="flex-1">
              <GlassInput
                value={searchQuery}
                onChangeText={onSearchChange}
                placeholder="Search transactions..."
                icon="search"
                autoFocus
              />
            </View>
            <GlassButton
              size="sm"
              variant="icon"
              icon="close"
              onPress={() => {
                onSearchChange("");
                toggleSearch();
              }}
            />
          </Animated.View>
        ) : (
          <Animated.View 
            key="title-bar"
            entering={FadeInLeft.duration(ANIM_DURATION)} 
            exiting={FadeOutLeft.duration(ANIM_DURATION)}
            className="absolute w-full h-full flex-row justify-between items-center"
          >
            <Text className="text-3xl font-bold text-neutral-900 dark:text-white">
              Activity
            </Text>
            <View className="flex-row items-center gap-4">
              <GlassButton 
                variant="icon" 
                icon="search" 
                onPress={toggleSearch} 
                size="md"
              />
              <GlassButton 
                variant="icon" 
                icon={showFilters ? "options" : "options-outline"} 
                onPress={toggleFilters} 
                size="md"
              />
            </View>
          </Animated.View>
        )}
      </View>

      {/* Filters View (Expandable) */}
      {showFilters && (
        <Animated.View 
          entering={FadeIn.duration(ANIM_DURATION)}
          exiting={FadeOut.duration(ANIM_DURATION)}
          layout={LinearTransition.duration(ANIM_DURATION)}
          className="mb-4 p-4 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800"
        >
          <Text className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">Filter By</Text>
          <View className="flex-row flex-wrap gap-2">
            {["Income", "Expense", "Pending", "Recurring"].map((filter) => (
              <TouchableOpacity
                key={filter}
                className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
              >
                <Text className="text-sm text-neutral-600 dark:text-neutral-300">{filter}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      )}

      {/* Timeline Picker */}
      <Animated.View layout={LinearTransition.duration(ANIM_DURATION)}>
        <TimelinePicker
          filter={filter}
          onChange={onFilterChange}
          isExpanded={showDatePicker}
          onToggleExpand={toggleDatePicker}
        />
      </Animated.View>

      {/* Summary Cards (Always Visible) */}
      <Animated.View 
        layout={LinearTransition.duration(ANIM_DURATION)}
        className="flex-row gap-4"
      >
        {/* Income */}
        <View className="flex-1 p-3 rounded-2xl bg-green-500/10 border border-green-500/20">
          <View className="flex-row items-center gap-2 mb-1">
            <View className="w-5 h-5 rounded-full bg-green-500/20 items-center justify-center">
              <Ionicons name="arrow-down" size={10} color="#22c55e" />
            </View>
            <Text className="text-green-700 dark:text-green-400 font-medium text-xs">Income</Text>
          </View>
          <Text className="text-lg font-bold text-green-800 dark:text-green-300">
            $4,250
          </Text>
        </View>

        {/* Expense */}
        <View className="flex-1 p-3 rounded-2xl bg-red-500/10 border border-red-500/20">
          <View className="flex-row items-center gap-2 mb-1">
            <View className="w-5 h-5 rounded-full bg-red-500/20 items-center justify-center">
              <Ionicons name="arrow-up" size={10} color="#ef4444" />
            </View>
            <Text className="text-red-700 dark:text-red-400 font-medium text-xs">Expense</Text>
          </View>
          <Text className="text-lg font-bold text-red-800 dark:text-red-300">
            $1,245
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};