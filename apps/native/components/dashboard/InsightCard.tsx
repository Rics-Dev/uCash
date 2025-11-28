import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useAppTheme } from "@/contexts/app-theme-context";

export type InsightType = "warning" | "info" | "success";

type InsightCardProps = {
  type: InsightType;
  title: string;
  description: string;
  onPress: () => void;
};

export const InsightCard = ({ type, title, description, onPress }: InsightCardProps) => {
  const { isDark } = useAppTheme();

  const getStyles = () => {
    switch (type) {
      case "warning":
        return {
          borderColor: "border-red-200 dark:border-red-900/50",
          iconColor: "#ef4444",
          iconName: "alert-circle" as const,
          bgColor: "bg-red-50/50 dark:bg-red-900/10",
        };
      case "info":
        return {
          borderColor: "border-blue-200 dark:border-blue-900/50",
          iconColor: "#3b82f6",
          iconName: "information-circle" as const,
          bgColor: "bg-blue-50/50 dark:bg-blue-900/10",
        };
      case "success":
        return {
          borderColor: "border-green-200 dark:border-green-900/50",
          iconColor: "#22c55e",
          iconName: "trending-up" as const,
          bgColor: "bg-green-50/50 dark:bg-green-900/10",
        };
    }
  };

  const styles = getStyles();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View
        className={`w-72 p-4 rounded-2xl border ${styles.borderColor} ${styles.bgColor} mr-4`}
      >
        <View className="flex-row items-start gap-3">
          <View className="p-2 rounded-full bg-white/80 dark:bg-black/20">
            <Ionicons name={styles.iconName} size={20} color={styles.iconColor} />
          </View>
          <View className="flex-1">
            <Text className="font-bold text-neutral-900 dark:text-white mb-1">
              {title}
            </Text>
            <Text className="text-sm text-neutral-600 dark:text-neutral-400 leading-5">
              {description}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
