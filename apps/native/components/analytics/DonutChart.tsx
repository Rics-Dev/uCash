import { View, Text, useColorScheme } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { useState, useEffect } from "react";
import { useAppTheme } from "@/contexts/app-theme-context";

export type ChartData = {
  value: number;
  color: string;
  text?: string;
  category: string;
  focused?: boolean;
};

type DonutChartProps = {
  data: ChartData[];
  totalSpent: number;
  onSlicePress: (category: string | null) => void;
};

export const DonutChart = ({ data, totalSpent, onSlicePress }: DonutChartProps) => {
  const { isDark } = useAppTheme();
  const [centerLabel, setCenterLabel] = useState("Total Spent");
  const [centerAmount, setCenterAmount] = useState(`$${totalSpent.toLocaleString()}`);
  const [focusedCategory, setFocusedCategory] = useState<string | null>(null);

  useEffect(() => {
    setCenterAmount(`$${totalSpent.toLocaleString()}`);
  }, [totalSpent]);

  const handlePress = (item: any) => {
    if (focusedCategory === item.category) {
        // Deselect
        setFocusedCategory(null);
        setCenterLabel("Total Spent");
        setCenterAmount(`$${totalSpent.toLocaleString()}`);
        onSlicePress(null);
    } else {
        // Select
        setFocusedCategory(item.category);
        setCenterLabel(item.category);
        setCenterAmount(`$${item.value.toLocaleString()}`);
        onSlicePress(item.category);
    }
  };

  const chartData = data.map(item => ({
    ...item,
    onPress: () => handlePress(item),
    focused: focusedCategory === item.category,
    shiftTextX: 0,
    shiftTextY: 0,
  }));

  return (
    <View className="items-center justify-center py-4">
      <PieChart
        data={chartData}
        donut
        radius={120}
        innerRadius={80}
        innerCircleColor={isDark ? "#000" : "#fff"}
        centerLabelComponent={() => (
          <View className="items-center justify-center">
            <Text className="text-neutral-500 dark:text-neutral-400 text-xs font-medium mb-1">
              {centerLabel}
            </Text>
            <Text className="text-2xl font-bold text-neutral-900 dark:text-white">
              {centerAmount}
            </Text>
          </View>
        )}
        focusOnPress
        toggleFocusOnPress
      />
    </View>
  );
};
