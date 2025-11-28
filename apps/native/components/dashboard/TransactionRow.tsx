import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@/contexts/app-theme-context";

type TransactionRowProps = {
  title: string;
  subtitle: string;
  amount: number;
  icon: keyof typeof Ionicons.glyphMap;
  date: string;
};

export const TransactionRow = ({ title, subtitle, amount, icon, date }: TransactionRowProps) => {
  const { isDark } = useAppTheme();
  
  const isPositive = amount > 0;
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(amount));

  return (
    <View className="flex-row items-center py-3 border-b border-neutral-100 dark:border-neutral-800 last:border-0">
      <View className="h-10 w-10 rounded-full bg-neutral-100 dark:bg-neutral-800 items-center justify-center mr-3">
        <Ionicons name={icon} size={20} color={isDark ? "#a3a3a3" : "#525252"} />
      </View>
      
      <View className="flex-1">
        <Text className="font-semibold text-neutral-900 dark:text-white text-base">
          {title}
        </Text>
        <Text className="text-sm text-neutral-500 dark:text-neutral-400">
          {subtitle} • {date}
        </Text>
      </View>

      <Text className={`font-bold text-base ${isPositive ? "text-green-600 dark:text-green-400" : "text-neutral-900 dark:text-white"}`}>
        {isPositive ? "+" : "-"}{formattedAmount}
      </Text>
    </View>
  );
};
