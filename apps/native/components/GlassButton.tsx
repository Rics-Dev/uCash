import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import type React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAppTheme } from "@/contexts/app-theme-context";

type GlassButtonVariant = "icon" | "text" | "icon-text";
type GlassButtonSize = "sm" | "md" | "lg";

type GlassButtonProps = {
  variant: GlassButtonVariant;
  icon?: keyof typeof Ionicons.glyphMap;
  text?: string;
  onPress: () => void;
  size?: GlassButtonSize;
  className?: string; // you decide solid/glass via classes
  solid?: boolean;    // optional flag if you want solid vs glass
};

const sizeConfig = {
  sm: { iconSize: 18, padding: "px-2 py-2", textSize: "text-xs" },
  md: { iconSize: 20, padding: "px-3 py-3", textSize: "text-sm" },
  lg: { iconSize: 24, padding: "px-6 py-3", textSize: "text-base" },
};

export function GlassButton({
  variant,
  icon,
  text,
  onPress,
  size = "md",
  className = "",
  solid = false,
}: GlassButtonProps) {
  const { isDark } = useAppTheme();
  const config = sizeConfig[size];

  const isIconOnly = variant === "icon";
  const isTextOnly = variant === "text";
  const isIconText = variant === "icon-text";

  const content = (
    <View className="flex-row items-center gap-2 justify-center">
      {(isIconOnly || isIconText) && icon && (
        <Ionicons
          name={icon}
          size={config.iconSize}
          color={solid ? (isDark ? "black" : "white") : isDark ? "white" : "black"}
        />
      )}

      {(isTextOnly || isIconText) && text && (
        <Text
          className={[
            config.textSize,
            solid
              ? isDark
                ? "text-black font-bold"
                : "text-white font-bold"
              : "text-neutral-900 dark:text-white font-medium",
          ].join(" ")}
        >
          {text}
        </Text>
      )}
    </View>
  );

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      {solid ? (
        <View
          className={[
            "overflow-hidden rounded-full items-center justify-center shadow-md",
            config.padding,
            className,
            isDark ? "bg-white" : "bg-black",
          ].join(" ")}
        >
          {content}
        </View>
      ) : (
        <BlurView
          intensity={isDark ? 80 : 40}
          tint={isDark ? "dark" : "light"}
          className={[
            "overflow-hidden rounded-full border shadow-sm",
            config.padding,
            className,
          ].join(" ")}
          style={{
          borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
          backgroundColor: isDark
            ? "rgba(255,255,255,0.1)"
            : "rgba(255,255,255,0.5)",
        }}
        >
          {content}
        </BlurView>
      )}
    </TouchableOpacity>
  );
}
