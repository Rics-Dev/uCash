import { View, Text, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@/contexts/app-theme-context";
import { BlurView } from "expo-blur";

type SettingsRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  type?: "navigation" | "toggle" | "value" | "link" | "check";
  value?: string | boolean;
  checked?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
  isLast?: boolean;
  destructive?: boolean;
};

export const SettingsRow = ({
  icon,
  label,
  type = "navigation",
  value,
  checked,
  onPress,
  onToggle,
  isLast = false,
  destructive = false,
}: SettingsRowProps) => {
  const { isDark } = useAppTheme();

  const renderRightContent = () => {
    switch (type) {
      case "toggle":
        return (
          <Switch
            value={value as boolean}
            onValueChange={onToggle}
            trackColor={{ false: "#767577", true: isDark ? "#fff" : "#000" }}
            thumbColor={isDark ? "#000" : "#fff"}
            ios_backgroundColor="#3e3e3e"
          />
        );
      case "value":
        return (
          <View className="flex-row items-center gap-2">
            <Text className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">
              {value as string}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={isDark ? "#6b7280" : "#9ca3af"}
            />
          </View>
        );
      case "link":
        return (
            <Ionicons
              name="open-outline"
              size={16}
              color={isDark ? "#6b7280" : "#9ca3af"}
            />
        );
      case "check":
        return checked ? (
            <Ionicons
              name="checkmark"
              size={20}
              color={isDark ? "#fff" : "#000"}
            />
        ) : null;
      case "navigation":
      default:
        return (
          <Ionicons
            name="chevron-forward"
            size={16}
            color={isDark ? "#6b7280" : "#9ca3af"}
          />
        );
    }
  };

  const Content = (
    <View className={`flex-row items-center justify-between py-4 px-4 ${!isLast ? 'border-b border-neutral-200/50 dark:border-neutral-800/50' : ''}`}>
      <View className="flex-row items-center gap-3">
        <View className={`w-8 h-8 rounded-full items-center justify-center ${destructive ? 'bg-red-100 dark:bg-red-900/30' : 'bg-neutral-100 dark:bg-neutral-800'}`}>
            <Ionicons
            name={icon}
            size={18}
            color={destructive ? "#EF4444" : (isDark ? "#fff" : "#000")}
            />
        </View>
        <Text className={`text-base font-medium ${destructive ? 'text-red-500' : 'text-neutral-900 dark:text-white'}`}>
          {label}
        </Text>
      </View>
      {renderRightContent()}
    </View>
  );

  if (type === "toggle") {
    return <View>{Content}</View>;
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      {Content}
    </TouchableOpacity>
  );
};
