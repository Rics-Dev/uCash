import { BlurView } from "expo-blur";
import { Text, TouchableOpacity, View } from "react-native";
import { useAppTheme } from "@/contexts/app-theme-context";
import { Ionicons } from "@expo/vector-icons";

type ChipProps = {
  label: string;
  isSelected?: boolean;
  onPress: () => void;
  rightIcon?: keyof typeof Ionicons.glyphMap;
};

export function GlassChip({
  label,
  isSelected = false,
  onPress,
  rightIcon,
}: ChipProps) {
  const { isDark } = useAppTheme();

  if (isSelected) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View
          className={`flex-row items-center overflow-hidden rounded-full border px-4 py-1.5 ${
            isDark ? "bg-white border-white" : "bg-black border-black"
          }`}
        >
          <Text
            className={`font-medium text-sm ${
              isDark ? "text-black" : "text-white"
            }`}
          >
            {label}
          </Text>
          {rightIcon && (
            <Ionicons
              name={rightIcon}
              size={14}
              color={isDark ? "white" : "black"}
              style={{ marginLeft: 4 }}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <BlurView
        intensity={isDark ? 80 : 40}
        tint={isDark ? "dark" : "light"}
        className="overflow-hidden rounded-full border px-4 py-1.5"
        style={{
          borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
          backgroundColor: isDark
            ? "rgba(255,255,255,0.1)"
            : "rgba(255,255,255,0.5)",
        }}
      >
        <Text
          className={`font-medium text-sm ${
            isDark ? "text-white" : "text-neutral-900"
          }`}
        >
          {label}
        </Text>
      </BlurView>
    </TouchableOpacity>
  );
};
