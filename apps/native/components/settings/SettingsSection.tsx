import { View, Text } from "react-native";
import { BlurView } from "expo-blur";
import { useAppTheme } from "@/contexts/app-theme-context";
import type { PropsWithChildren } from "react";

type SettingsSectionProps = PropsWithChildren<{
  title?: string;
}>;

export const SettingsSection = ({ title, children }: SettingsSectionProps) => {
  const { isDark } = useAppTheme();

  return (
    <View className="mb-6">
      {title && (
        <Text className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-2 px-4 uppercase tracking-wider">
          {title}
        </Text>
      )}
      <BlurView
        intensity={isDark ? 60 : 40}
        tint={isDark ? "dark" : "light"}
        className="overflow-hidden rounded-2xl border mx-4"
        style={{
            borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
            backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.4)",
        }}
      >
        {children}
      </BlurView>
    </View>
  );
};
