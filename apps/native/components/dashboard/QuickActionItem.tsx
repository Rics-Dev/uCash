import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@/contexts/app-theme-context";

type QuickActionItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

export const QuickActionItem = ({ icon, label, onPress }: QuickActionItemProps) => {
  const { isDark } = useAppTheme();

  return (
    <TouchableOpacity 
      onPress={onPress} 
      className="flex-1 items-center gap-2"
      activeOpacity={0.7}
    >
      <View className="h-14 w-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 items-center justify-center border border-neutral-200 dark:border-neutral-700">
        <Ionicons 
          name={icon} 
          size={24} 
          color={isDark ? "#ffffff" : "#171717"} 
        />
      </View>
      <Text className="text-xs font-medium text-neutral-600 dark:text-neutral-400 text-center">
        {label}
      </Text>
    </TouchableOpacity>
  );
};
