import { useFocusEffect } from "expo-router";
import { cn } from "heroui-native";
import { type PropsWithChildren, useCallback } from "react";
import { Platform, View, type ViewProps } from "react-native";
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
  scrollable?: boolean;
};

export function Container({
  children,
  className,
  scrollable = true,
  ...props
}: PropsWithChildren<Props>) {
  const insets = useSafeAreaInsets();
  const { isFabVisible, fabManualOverride } = useFabScroll();

  const SHOW_THRESHOLD = 20;
  const HIDE_THRESHOLD = 200;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (fabManualOverride.value) {
        return;
      }

      const y = event.contentOffset.y;

      if (y <= SHOW_THRESHOLD && isFabVisible.value === 0) {
        // Show FAB when user is near the top
        isFabVisible.value = withTiming(1, { duration: 350 });
      }

      // Hide FAB only when scrolled down far enough
      else if (y > HIDE_THRESHOLD && isFabVisible.value === 1) {
        isFabVisible.value = withTiming(0, { duration: 350 });
      }
    },
  });

  useFocusEffect(
    useCallback(() => {
      isFabVisible.value = withTiming(1, { duration: 250 });
    }, [isFabVisible])
  );

  if (!scrollable) {
    return (
      <AnimatedView 
        className={cn("flex-1 bg-background", className)} 
        style={[
          { 
            paddingTop: insets.top + (Platform.OS === "ios" ? 30 : 60),
            paddingBottom: insets.bottom + (Platform.OS === "ios" ? 30 : 60)
          }, 
          props.style
        ]} 
        {...props}
      >
        {children}
      </AnimatedView>
    );
  }

  return (
    <AnimatedView className={cn("flex-1 bg-background", className)} {...props}>
      <Animated.ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: insets.top + (Platform.OS === "ios" ? 0 : 60),
          paddingBottom: insets.bottom + (Platform.OS === "ios" ? 30 : 60),
        }}
        contentInsetAdjustmentBehavior="automatic"
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </Animated.ScrollView>
    </AnimatedView>
  );
}
