import { View, Text, Image } from "react-native";
import { GlassButton } from "@/components/GlassButton";
import { useAppTheme } from "@/contexts/app-theme-context";
import { Ionicons } from "@expo/vector-icons";

type DashboardHeaderProps = {
  userName?: string;
};

export const DashboardHeader = ({ userName = "User" }: DashboardHeaderProps) => {
  const { isDark } = useAppTheme();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <View className="flex-row items-center justify-between mb-6">
      <View>
        <Text className="text-neutral-500 font-medium text-sm dark:text-neutral-400">
          {getGreeting()},
        </Text>
        <Text className="text-neutral-900 font-bold text-2xl dark:text-white">
          {userName}
        </Text>
      </View>
      <View className="flex-row gap-3">
        <GlassButton
          variant="icon"
          icon="notifications-outline"
          size="sm"
          onPress={() => {}}
        />
        <GlassButton
          variant="icon"
          icon="person-outline"
          size="sm"
          onPress={() => {}}
        />
      </View>
    </View>
  );
};
