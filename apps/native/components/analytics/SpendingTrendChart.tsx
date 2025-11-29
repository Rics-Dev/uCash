import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { BlurView } from "expo-blur";
import { useAppTheme } from "@/contexts/app-theme-context";

export const SpendingTrendChart = () => {
  const { isDark } = useAppTheme();

  const data = [
    { value: 2500, label: 'Jun' },
    { value: 3500, label: 'Jul' },
    { value: 3000, label: 'Aug' },
    { value: 4500, label: 'Sep' },
    { value: 3200, label: 'Oct' },
    { value: 5000, label: 'Nov', frontColor: '#10B981' }, // Highlight current
  ];

  return (
    <View className="px-4 mb-8">
      <BlurView
        intensity={isDark ? 60 : 40}
        tint={isDark ? "dark" : "light"}
        className="p-4 rounded-3xl overflow-hidden border"
        style={{
            borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
            backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.4)",
        }}
      >
        <Text className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
            Monthly Spending
        </Text>
        <BarChart
          data={data}
          barWidth={22}
          noOfSections={3}
          barBorderRadius={4}
          frontColor={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"}
          yAxisThickness={0}
          xAxisThickness={0}
          yAxisTextStyle={{ color: isDark ? '#9CA3AF' : '#6B7280' }}
          xAxisLabelTextStyle={{ color: isDark ? '#9CA3AF' : '#6B7280' }}
          hideRules
          height={150}
          width={280} // Approximate width, can be adjusted or made responsive
          isAnimated
        />
      </BlurView>
    </View>
  );
};
