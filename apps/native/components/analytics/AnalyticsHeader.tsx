import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { format, addMonths, subMonths, addYears, subYears, addWeeks, subWeeks } from "date-fns";
import { useAppTheme } from "@/contexts/app-theme-context";
import { BlurView } from "expo-blur";
import { GlassButton } from "@/components/GlassButton";

export type Period = 'week' | 'month' | 'year';

type AnalyticsHeaderProps = {
  period: Period;
  onPeriodChange: (period: Period) => void;
  date: Date;
  onDateChange: (date: Date) => void;
};

export const AnalyticsHeader = ({
  period,
  onPeriodChange,
  date,
  onDateChange,
}: AnalyticsHeaderProps) => {
  const { isDark } = useAppTheme();

  const handlePrev = () => {
    if (period === 'week') {
      onDateChange(subWeeks(date, 1));
    } else if (period === 'month') {
      onDateChange(subMonths(date, 1));
    } else {
      onDateChange(subYears(date, 1));
    }
  };

  const handleNext = () => {
    if (period === 'week') {
      onDateChange(addWeeks(date, 1));
    } else if (period === 'month') {
      onDateChange(addMonths(date, 1));
    } else {
      onDateChange(addYears(date, 1));
    }
  };

  const renderPeriodSelector = () => (
    <BlurView
      intensity={isDark ? 80 : 40}
      tint={isDark ? "dark" : "light"}
      className="flex-row p-1 rounded-full self-center mb-6 overflow-hidden border"
      style={{
        borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
        backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.5)",
      }}
    >
      {(['week', 'month', 'year'] as Period[]).map((p) => (
        <TouchableOpacity
          key={p}
          onPress={() => onPeriodChange(p)}
          className={`px-6 py-2 rounded-full ${
            period === p ? 'bg-white/20 dark:bg-white/20 shadow-sm' : ''
          }`}
        >
          <Text className={`text-sm font-medium capitalize ${
            period === p ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 dark:text-neutral-400'
          }`}>
            {p}
          </Text>
        </TouchableOpacity>
      ))}
    </BlurView>
  );

  const renderDateScroller = () => {
    let label = "";
    if (period === 'week') {
        label = `Week of ${format(date, "MMM d")}`;
    } else if (period === 'month') {
      label = format(date, "MMMM yyyy");
    } else {
      label = format(date, "yyyy");
    }

    return (
      <View className="flex-row items-center justify-center gap-4">
        <GlassButton 
            variant="icon" 
            icon="chevron-back" 
            size="sm"
            onPress={handlePrev} 
        />

        <Text className="text-xl font-bold text-neutral-900 dark:text-white min-w-[140px] text-center">
          {label}
        </Text>

        <GlassButton 
            variant="icon" 
            icon="chevron-forward" 
            size="sm"
            onPress={handleNext} 
        />
      </View>
    );
  };

  return (
    <View className="mb-6">
      {renderPeriodSelector()}
      {renderDateScroller()}
    </View>
  );
};

