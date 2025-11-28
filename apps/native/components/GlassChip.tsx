import { BlurView } from "expo-blur";
import { Text, TouchableOpacity, View } from "react-native";
import { useAppTheme } from "@/contexts/app-theme-context";

type ChipProps = {
  label: string;
  isSelected?: boolean;
  onPress: () => void;
};

export function GlassChip({
  label,
  isSelected = false,
  onPress,
}: ChipProps) {
  const { isDark } = useAppTheme();

  if (isSelected) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View
          className={`overflow-hidden rounded-full border px-4 py-1.5 ${
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
