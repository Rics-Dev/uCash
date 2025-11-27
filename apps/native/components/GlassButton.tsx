import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import type React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAppTheme } from "@/contexts/app-theme-context";

type GlassButtonVariant = "icon-only" | "text-only" | "icon-text";
type GlassButtonSize = "sm" | "md" | "lg";

type GlassButtonProps = {
  variant: GlassButtonVariant;
  icon?: keyof typeof Ionicons.glyphMap;
  text?: string;
  onPress: () => void;
  size?: GlassButtonSize;
  className?: string;
};

const sizeConfig = {
  sm: {
    iconSize: 18,
    padding: "px-2 py-1.75",
    textSize: "text-xs",
  },
  md: {
    iconSize: 20,
    padding: "px-3 py-2",
    textSize: "text-sm",
  },
  lg: {
    iconSize: 24,
    padding: "px-4 py-2",
    textSize: "text-base",
  },
};

export const GlassButton: React.FC<GlassButtonProps> = ({
  variant,
  icon,
  text,
  onPress,
  size = "md",
  className = "",
}) => {
  const { isDark } = useAppTheme();
  const config = sizeConfig[size];

  const isIconOnly = variant === "icon-only";
  const isTextOnly = variant === "text-only";
  const isIconText = variant === "icon-text";

  return (
    <TouchableOpacity onPress={onPress}>
      <BlurView
        intensity={isDark ? 80 : 40}
        tint={isDark ? "dark" : "light"}
        className={`overflow-hidden rounded-full border shadow-sm ${config.padding} ${className}`}
        style={{
          borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
          backgroundColor: isDark
            ? "rgba(255,255,255,0.1)"
            : "rgba(255,255,255,0.5)",
        }}
      >
        <View className="flex-row items-center gap-2">
          {(isIconOnly || isIconText) && icon && (
            <Ionicons
              name={icon}
              size={config.iconSize}
              color={isDark ? "white" : "black"}
            />
          )}
          {(isTextOnly || isIconText) && text && (
            <Text
              className={`font-medium ${config.textSize} text-neutral-900 dark:text-white`}
            >
              {text}
            </Text>
          )}
        </View>
      </BlurView>
    </TouchableOpacity>
  );
};
