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
import { CategoryFilter } from "./CategoryFilter";

type ActivityHeaderProps = {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  filter: DateFilter;
  onFilterChange: (filter: DateFilter) => void;
  onFilterPress: () => void;
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
};

export const ActivityHeader = ({
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange,
  onFilterPress,
  categories,
  selectedCategories,
  onCategoryChange,
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
                icon={showFilters ? "close" : "filter"} 
                onPress={toggleFilters} 
                size="md"
              />
            </View>
          </Animated.View>
        )}
      </View>

      {/* Filters View (Expandable) */}
      {showFilters && (
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onSelectCategory={onCategoryChange}
        />
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