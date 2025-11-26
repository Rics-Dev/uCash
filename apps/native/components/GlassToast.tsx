import React, { useEffect } from "react";
import { Text, View, useColorScheme, Platform } from "react-native";
import { BlurView } from "expo-blur";
import Animated, { SlideInUp, SlideOutUp, LinearTransition, SlideInDown } from "react-native-reanimated";
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
    const timer = setTimeout(onDismiss, 2000);
    console.log(message);
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

  const topPosition = Platform.OS === "ios" ? insets.top + 10 : insets.top + 20;

  return (
    <Animated.View
      entering={SlideInUp.duration(600).springify()}
      exiting={SlideOutUp.duration(400)}
      layout={LinearTransition.springify()}
      className="absolute left-4 right-4 z-[1000]"
      style={{ top: topPosition }}
    >
      <View className="overflow-hidden rounded-2xl border border-neutral-200/50 bg-white/70 shadow-lg dark:border-neutral-800/50 dark:bg-black/70">
        <BlurView
          intensity={Platform.OS === "ios" ? 60 : 100}
          tint={isDark ? "dark" : "light"}
          className="flex-row items-center px-4 py-5"
        >
          <View
            className="mr-3 h-8 w-8 items-center justify-center rounded-full"
            style={{ backgroundColor: `${getColor()}20` }}
          >
            <Ionicons name={getIcon()} size={20} color={getColor()} />
          </View>
          <Text className="flex-1 text-base font-medium text-neutral-900 dark:text-white">
            {message}
          </Text>
        </BlurView>
      </View>
    </Animated.View>
  );
}
