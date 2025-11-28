import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { BlurView } from "expo-blur";
import { useThemeColor } from "heroui-native";
import { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAppTheme } from "@/contexts/app-theme-context";
import { useFabScroll } from "@/contexts/fab-context";

const AnimatedView = Animated.createAnimatedComponent(View);

type Action = {
  icon: keyof typeof FontAwesome6.glyphMap;
  label: string;
  onPress: () => void;
};

type FabProps = {
  position?: "left" | "center" | "right";
  actions: Action[];
  variant?: "hide" | "minimize";
  mode?: "transaction" | "account";
  visualStyle?: "solid" | "blur";
};

type FabActionProps = {
  action: Action;
  angle: number;
  isExpanded: boolean;
  iconColor: string;
  openAnimation: SharedValue<number>;
  setIsExpanded: (value: boolean) => void;
  radius: number;
  visualStyle: "solid" | "blur";
};

const FabAction = ({
  action,
  angle,
  isExpanded,
  iconColor,
  openAnimation,
  setIsExpanded,
  radius,
  visualStyle,
}: FabActionProps) => {
  const { isDark } = useAppTheme();

  const animatedStyle = useAnimatedStyle(() => {
    const targetX = radius * Math.cos(angle);
    const targetY = radius * Math.sin(angle);

    const translateX = interpolate(openAnimation.value, [0, 1], [0, targetX]);
    const translateY = interpolate(openAnimation.value, [0, 1], [0, targetY]);

    const opacity = interpolate(
      openAnimation.value,
      [0, 0.3, 1],
      [0, 1, 1],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ translateX }, { translateY }, { scale: 1 }],
    };
  });

  // Determine styles based on visualStyle
  const isBlur = visualStyle === "blur";
  
  const containerClassName = isBlur
    ? "bg-[#F7F7F7]/80 dark:bg-neutral-800/80 shadow-lg shadow-black/20 dark:shadow-black/50 border border-white/50 dark:border-neutral-700/50"
    : "bg-[#F7F7F7] dark:bg-neutral-800 shadow-lg shadow-black/20 dark:shadow-black/50 border border-white dark:border-neutral-700";

  const finalIconColor = isDark ? "#FFF" : "#000";

  return (
    <AnimatedView
      pointerEvents={isExpanded ? "auto" : "none"}
      style={[styles.action, { position: "absolute" }, animatedStyle]}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          action.onPress();
          setIsExpanded(false);
        }}
        className={containerClassName}
        style={[styles.actionTouchable, { elevation: 10 }]}
      >
        {isBlur && Platform.OS === "ios" && (
          <BlurView
            intensity={isDark ? 30 : 90}
            style={StyleSheet.absoluteFill}
            tint={isDark ? "light" : "default"}
          />
        )}
        <View style={styles.actionContent}>
          <FontAwesome6
            color={finalIconColor}
            name={action.icon}
            size={Platform.select({ ios: 24, android: 20 })}
          />
          <Text style={[styles.actionText, { color: finalIconColor }]}>
            {action.label}
          </Text>
        </View>
      </TouchableOpacity>
    </AnimatedView>
  );
};

export function Fab({
  position = "center",
  actions,
  variant = "hide",
  mode = "transaction",
  visualStyle = "solid",
}: FabProps) {
  if (!actions || actions.length !== 3) {
    throw new Error("Fab requires exactly 3 actions");
  }

  const [isExpanded, setIsExpanded] = useState(false);
  const insets = useSafeAreaInsets();
  const { isDark } = useAppTheme();
  const { width } = useWindowDimensions();

  const openAnimation = useSharedValue(0);

  useEffect(() => {
    const config = {
      duration: isExpanded ? 250 : 250,
      easing: Easing.out(Easing.circle),
    };
    openAnimation.value = withTiming(isExpanded ? 1 : 0, config);
  }, [isExpanded, openAnimation]);

  const getActionRadius = () => {
    switch (position) {
      case "left":
        return 110;
      case "right":
        return 110;
      default:
        return 105;
    }
  };

  const getPositionStyle = () => {
    const ovalOffset =
      mode === "account"
        ? Platform.select({ ios: -60, android: -55 })
        : Platform.select({ ios: -30, android: -28 });

    switch (position) {
      case "left":
        return { left: 24 };
      case "right":
        return { right: 24 };
      default:
        return {
          left: "50%" as const,
          marginLeft: ovalOffset,
        };
    }
  };

  const getActionPositions = () => {
    switch (position) {
      case "center":
        return [
          { angle: -Math.PI / 2 },
          { angle: -Math.PI / 6 },
          { angle: -(5 * Math.PI) / 6 },
        ];
      case "right":
        return [
          { angle: Math.PI },
          { angle: -(3 * Math.PI) / 4 },
          { angle: -Math.PI / 2 },
        ];
      default:
        return [{ angle: 0 }, { angle: -Math.PI / 4 }, { angle: -Math.PI / 2 }];
    }
  };

  const positions = getActionPositions();
  const radius = getActionRadius();

  const mainIconStyle = useAnimatedStyle(() => {
    const rotate = interpolate(openAnimation.value, [0, 1], [0, 45]);
    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  const { isFabVisible, fabManualOverride } = useFabScroll();

  const fabContainerStyle = useAnimatedStyle(() => {
    if (variant === "hide") {
      return {
        transform: [
          {
            translateY: interpolate(isFabVisible.value, [0, 1], [200, 0]),
          },
        ],
      };
    }

    // Minimize variant
    const targetX = width / 2 - 32 - 24; 
    const targetY = 90; 

    return {
      transform: [
        {
          translateX: interpolate(isFabVisible.value, [0, 1], [targetX, 0]),
        },
        {
          translateY: interpolate(isFabVisible.value, [0, 1], [targetY, 0]),
        },
        {
          scale: interpolate(isFabVisible.value, [0, 1], [0.7, 1]),
        },
      ],
    };
  });

  // Determine styles based on visualStyle
  const isBlur = visualStyle === "blur";

  const mainButtonClassName = isBlur
    ? "bg-[#F7F7F7]/80 dark:bg-neutral-800/80 shadow-lg shadow-black/20 dark:shadow-black/50 border border-white/50 dark:border-neutral-700/50"
    : "bg-[#F7F7F7] dark:bg-neutral-800 shadow-lg shadow-black/20 dark:shadow-black/50 border border-white dark:border-neutral-700";
    
  const iconColor = isDark ? "#FFF" : "#000";

  return (
    <AnimatedView
      pointerEvents="box-none"
      style={[
        styles.fabContainer,
        getPositionStyle(),
        {
          bottom: Platform.select({
            ios: insets.bottom + 75,
            android: insets.bottom + 100,
          }),
        },
        fabContainerStyle,
      ]}
    >
      {actions.map((action, index) => (
        <FabAction
          action={action}
          angle={positions[index].angle}
          iconColor={iconColor}
          isExpanded={isExpanded}
          key={action.label}
          openAnimation={openAnimation}
          radius={radius}
          setIsExpanded={setIsExpanded}
          visualStyle={visualStyle}
        />
      ))}

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          const animation = 200;
          const expandDelay = animation * 0.6;
          fabManualOverride.value = true;

          if (isFabVisible.value < 0.5) {
            isFabVisible.value = withTiming(1, { duration: animation });

            setTimeout(() => {
              setIsExpanded((p) => !p);
            }, expandDelay);
          } else {
            setIsExpanded((p) => !p);
            fabManualOverride.value = false;
          }
        }}
        className={mainButtonClassName}
        style={[
          styles.container,
          { elevation: 10 },
          mode === "account" && styles.containerOval,
        ]}
      >
        {isBlur && Platform.OS === "ios" && (
          <BlurView
            intensity={isDark ? 30 : 90}
            style={StyleSheet.absoluteFill}
            tint={isDark ? "light" : "default"}
          />
        )}
        <View style={styles.content}>
          {mode === "account" ? (
            <View style={styles.accountMode}>
              <Ionicons
                color={iconColor}
                name="add"
                size={Platform.select({ ios: 20, android: 18 })}
              />
              <Text style={[styles.accountText, { color: iconColor }]}>
                Account
              </Text>
            </View>
          ) : (
            <AnimatedView style={mainIconStyle}>
              <Ionicons
                color={iconColor}
                name="add"
                size={Platform.select({ ios: 28, android: 24 })}
              />
            </AnimatedView>
          )}
        </View>
      </TouchableOpacity>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute" as const,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: Platform.select({ ios: 64, android: 56 }),
    height: Platform.select({ ios: 64, android: 56 }),
    borderRadius: Platform.select({ ios: 32, android: 28 }),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  containerOval: {
    width: Platform.select({ ios: 120, android: 110 }),
    borderRadius: Platform.select({ ios: 32, android: 28 }),
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  accountMode: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  accountText: {
    fontSize: Platform.select({ ios: 14, android: 13 }),
    fontWeight: "600",
  },
  action: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 990,
  },
  actionTouchable: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  actionContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingVertical: 4,
  },
  actionText: {
    fontSize: 10,
    textAlign: "center",
    marginTop: 2,
    fontWeight: "500", 
  },
});
