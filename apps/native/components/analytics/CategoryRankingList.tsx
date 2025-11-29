import { View, Text, TouchableOpacity, Platform, UIManager } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Animated, { FadeInDown, FadeOutUp, LinearTransition } from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { useAppTheme } from "@/contexts/app-theme-context";

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export type CategoryItem = {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  trend?: {
    diff: number; // positive means spent more
    average: number;
  };
};

type CategoryRankingListProps = {
  categories: CategoryItem[];
};

export const CategoryRankingList = ({ categories }: CategoryRankingListProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { isDark } = useAppTheme();

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const sortedCategories = [...categories].sort((a, b) => b.amount - a.amount);
  const maxAmount = sortedCategories.length > 0 ? sortedCategories[0].amount : 0;

  return (
    <View className="px-4 pb-20">
      <Text className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
        Top Spending
      </Text>
      {sortedCategories.map((item) => {
        const isExpanded = expandedId === item.id;
        const relativeWidth = maxAmount > 0 ? (item.amount / maxAmount) * 100 : 0;

        return (
          <Animated.View 
            key={item.id} 
            layout={LinearTransition.duration(300)}
            className="mb-3"
          >
            <TouchableOpacity 
              onPress={() => toggleExpand(item.id)}
              activeOpacity={0.7}
            >
              <BlurView
                intensity={isDark ? 60 : 40}
                tint={isDark ? "dark" : "light"}
                className="relative overflow-hidden rounded-2xl border"
                style={{
                    borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                    backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.4)",
                }}
              >
                {/* Progress Bar Background */}
                <View 
                    className="absolute top-0 bottom-0 left-0 bg-neutral-200/20 dark:bg-white/5"
                    style={{ width: `${relativeWidth}%` }}
                />

                <View className="flex-row items-center p-4">
                    {/* Icon */}
                    <View 
                    className="w-10 h-10 rounded-full items-center justify-center mr-3 shadow-sm"
                    style={{ backgroundColor: item.color }}
                    >
                    <Ionicons name={item.icon} size={20} color="white" />
                    </View>

                    {/* Info */}
                    <View className="flex-1">
                    <View className="flex-row justify-between items-center">
                        <Text className="font-semibold text-neutral-900 dark:text-white text-base">
                        {item.name}
                        </Text>
                        <Text className="font-bold text-neutral-900 dark:text-white text-base">
                        ${item.amount.toFixed(2)}
                        </Text>
                    </View>
                    <Text className="text-sm text-neutral-500 dark:text-neutral-400">
                        {item.percentage}% of total
                    </Text>
                    </View>
                </View>
              </BlurView>
            </TouchableOpacity>

            {/* Expanded Content (Trend) */}
            {isExpanded && item.trend && (
              <Animated.View 
                entering={FadeInDown.duration(300)} 
                exiting={FadeOutUp.duration(200)}
                className="mt-2 p-4 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50"
              >
                <Text className="text-sm text-neutral-600 dark:text-neutral-300 mb-2">
                  Spending Trend
                </Text>
                <View className="flex-row items-end h-24 gap-4">
                    <View className="flex-1 items-center">
                        <View className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-t-lg flex-1" />
                        <Text className="text-xs mt-1 text-neutral-500">Average</Text>
                        <Text className="text-xs font-bold text-neutral-900 dark:text-white">${item.trend.average}</Text>
                    </View>
                    <View className="flex-1 items-center">
                        <View 
                            className={`w-full rounded-t-lg flex-1 ${item.trend.diff > 0 ? 'bg-red-400' : 'bg-green-400'}`} 
                            style={{ height: '120%' }} // Just for visual diff
                        />
                        <Text className="text-xs mt-1 text-neutral-500">This Month</Text>
                        <Text className="text-xs font-bold text-neutral-900 dark:text-white">${item.amount}</Text>
                    </View>
                </View>
                <Text className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
                    You spent <Text className="font-bold">${Math.abs(item.trend.diff)} {item.trend.diff > 0 ? 'more' : 'less'}</Text> on {item.name} than usual.
                </Text>
              </Animated.View>
            )}
          </Animated.View>
        );
      })}
    </View>
  );
};
