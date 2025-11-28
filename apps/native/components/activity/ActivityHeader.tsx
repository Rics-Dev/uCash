import { View, TextInput, ScrollView, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@/contexts/app-theme-context";
import { GlassChip } from "@/components/GlassChip";
import { GlassInput } from "@/components/GlassInput";

type ActivityHeaderProps = {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  selectedFilter: string | null;
  onFilterSelect: (filter: string) => void;
};

export const ActivityHeader = ({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterSelect,
}: ActivityHeaderProps) => {
  const { isDark } = useAppTheme();

  const filters = ["This Month", "All Accounts", "Categories", "Income", "Expense"];

  return (
    <View className="px-4 pb-4 bg-neutral-50 dark:bg-black z-10 pt-2">
      {/* Search Bar */}
      <View className="mb-4">
        <GlassInput
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholder="Search merchant, amount, or note..."
          icon="search"
        />
      </View>

      {/* Filter Chips */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
        className="overflow-visible"
      >
        {filters.map((filter) => (
          <GlassChip
            key={filter}
            label={filter}
            isSelected={selectedFilter === filter}
            onPress={() => onFilterSelect(filter)}
            rightIcon="chevron-down"
          />
        ))}
      </ScrollView>
    </View>
  );
};
