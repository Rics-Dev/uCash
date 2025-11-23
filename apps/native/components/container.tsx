import { useFocusEffect } from "expo-router";
import { cn } from "heroui-native";
import { type PropsWithChildren, useCallback } from "react";
import { View, type ViewProps } from "react-native";
import Animated, {
  type AnimatedProps,
  useAnimatedScrollHandler,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFabScroll } from "@/contexts/fab-context";

const AnimatedView = Animated.createAnimatedComponent(View);

type Props = AnimatedProps<ViewProps> & {
  className?: string;
};

export function Container({
  children,
  className,
  ...props
}: PropsWithChildren<Props>) {
  const insets = useSafeAreaInsets();
  const { isFabVisible } = useFabScroll();

  // We define a small threshold to trigger the "Top" state.
  // 10-20px makes it feel responsive without requiring pixel-perfect 0.
  const TOP_THRESHOLD = 20;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentOffset = event.contentOffset.y;

      // Case 1: We are at the top (or bounced past it on iOS) -> Show FAB
      if (currentOffset <= TOP_THRESHOLD && isFabVisible.value === 0) {
        isFabVisible.value = withTiming(1, { duration: 350 });
      }
      // Case 2: We are scrolled down past the threshold -> Hide FAB
      else if (currentOffset > TOP_THRESHOLD && isFabVisible.value === 1) {
        isFabVisible.value = withTiming(0, { duration: 250 });
      }
    },
  });

  useFocusEffect(
    useCallback(() => {
      // Ensure FAB is visible when screen first focuses
      isFabVisible.value = withTiming(1, { duration: 250 });
    }, [isFabVisible])
  );

  return (
    <AnimatedView
      className={cn("flex-1 bg-background", className)}
      style={{
        paddingBottom: insets.bottom,
      }}
      {...props}
    >
      <Animated.ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </Animated.ScrollView>
    </AnimatedView>
  );
}