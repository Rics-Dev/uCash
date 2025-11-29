import { View, Text } from "react-native";
import { BlurView } from "expo-blur";
import { useAppTheme } from "@/contexts/app-theme-context";

type CashFlowBarProps = {
  income: number;
  expense: number;
};

export const CashFlowBar = ({ income, expense }: CashFlowBarProps) => {
  const { isDark } = useAppTheme();
  const total = income + expense;
  const incomePercent = total > 0 ? (income / total) * 100 : 0;
  const expensePercent = total > 0 ? (expense / total) * 100 : 0;

  const isSaved = income > expense;
  const diff = Math.abs(income - expense);
  const message = isSaved 
    ? `Saved ${Math.round((diff / income) * 100)}% of income`
    : `Overspent by $${diff.toLocaleString()}`;

  return (
    <View className="px-4 mb-8">
      <BlurView
        intensity={isDark ? 60 : 40}
        tint={isDark ? "dark" : "light"}
        className="p-4 rounded-2xl overflow-hidden border"
        style={{
            borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
            backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.4)",
        }}
      >
        <View className="flex-row h-3 rounded-full overflow-hidden mb-3 bg-neutral-200 dark:bg-neutral-800">
            <View 
            style={{ width: `${incomePercent}%` }} 
            className="bg-emerald-500 h-full" 
            />
            <View 
            style={{ width: `${expensePercent}%` }} 
            className="bg-neutral-500 dark:bg-neutral-600 h-full" 
            />
        </View>
        <View className="flex-row justify-between items-center">
            <Text className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                Income vs Expense
            </Text>
            <Text className={`text-sm font-bold ${isSaved ? 'text-emerald-500' : 'text-red-500'}`}>
                {message}
            </Text>
        </View>
      </BlurView>
    </View>
  );
};
