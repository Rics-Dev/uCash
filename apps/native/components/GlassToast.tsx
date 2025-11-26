import React, { useEffect } from "react";
import { Text, View, useColorScheme, Platform } from "react-native";
import { BlurView } from "expo-blur";
import Animated, { FadeInUp, FadeOutUp, Layout } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ToastType = "success" | "error" | "info";

interface GlassToastProps {
  message: string;
  type: ToastType;
  onDismiss: () => void;
}

export function GlassToast({ message, type, onDismiss }: GlassToastProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return "checkmark-circle";
      case "error":
        return "alert-circle";
      case "info":
        return "information-circle";
    }
  };

  const getColor = () => {
    switch (type) {
      case "success":
        return "#00A86B";
      case "error":
        return "#EF4444";
      case "info":
        return "#3B82F6";
    }
  };

  return (
    <Animated.View
      entering={FadeInUp.springify().damping(15)}
      exiting={FadeOutUp}
      layout={Layout.springify()}
      style={{
        position: "absolute",
        top: Platform.OS === "ios" ? insets.top + 10 : insets.top + 20,
        left: 16,
        right: 16,
        zIndex: 1000,
        alignItems: "center",
      }}
    >
      <View className="overflow-hidden rounded-2xl border border-neutral-200/50 bg-white/70 shadow-lg dark:border-neutral-800/50 dark:bg-black/70">
        <BlurView
          intensity={Platform.OS === "ios" ? 80 : 100}
          tint={isDark ? "dark" : "light"}
          className="flex-row items-center px-4 py-3"
        >
          <View
            className="mr-3 h-8 w-8 items-center justify-center rounded-full"
            style={{ backgroundColor: `${getColor()}20` }}
          >
            <Ionicons name={getIcon()} size={20} color={getColor()} />
          </View>
          <Text className="flex-1 font-medium text-base text-neutral-900 dark:text-white">
            {message}
          </Text>
        </BlurView>
      </View>
    </Animated.View>
  );
}
