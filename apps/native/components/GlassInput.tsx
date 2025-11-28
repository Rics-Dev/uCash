import { BlurView } from "expo-blur";
import { TextInput, View, TextInputProps, TouchableOpacity, ViewProps } from "react-native";
import { useAppTheme } from "@/contexts/app-theme-context";
import { Ionicons } from "@expo/vector-icons";

type GlassInputProps = TextInputProps & {
  icon?: keyof typeof Ionicons.glyphMap;
  onIconPress?: () => void;
};

export function GlassInput({ icon, onIconPress, style, ...props }: GlassInputProps) {
  const { isDark } = useAppTheme();

  return (
    <View className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
      <BlurView
        intensity={isDark ? 50 : 40}
        tint={isDark ? "dark" : "light"}
        className="flex-row items-center px-4 "
        style={{
          backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.7)",
        }}
      >
        {icon && (
          <TouchableOpacity onPress={onIconPress} disabled={!onIconPress}>
            <Ionicons
              name={icon}
              size={20}
              color={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"}
              style={{ marginRight: 8 }}
            />
          </TouchableOpacity>
        )}
        <TextInput
          className={`flex-1 font-medium py-4 ${
            isDark ? "text-white" : "text-neutral-900"
          }`}
          placeholderTextColor={isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.4)"}
          {...props}
        />
      </BlurView>
    </View>
  );
}
