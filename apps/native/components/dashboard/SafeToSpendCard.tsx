import { View, Text } from "react-native";
import { BlurView } from "expo-blur";
import { useAppTheme } from "@/contexts/app-theme-context";
import { GlassButton } from "@/components/GlassButton";
import { Ionicons } from "@expo/vector-icons";

type SafeToSpendCardProps = {
  amount: number;
  remainingThisMonth: number;
  isPrivacyMode: boolean;
  onTogglePrivacy: () => void;
};

export const SafeToSpendCard = ({
  amount,
  remainingThisMonth,
  isPrivacyMode,
  onTogglePrivacy,
}: SafeToSpendCardProps) => {
  const { isDark } = useAppTheme();

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  const formattedRemaining = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(remainingThisMonth);

  const displayAmount = isPrivacyMode ? "$****.**" : formattedAmount;

  return (
    <View className="overflow-hidden rounded-3xl border border-neutral-200 bg-white/50 dark:border-white/20 dark:bg-transparent shadow-sm shadow-black/10 dark:shadow-black/20">
      <BlurView className="p-6" intensity={80} tint={isDark ? "dark" : "light"}>
        <View className="flex-row justify-between items-start mb-2">
          <Text className="text-neutral-500 font-medium text-sm uppercase tracking-wider dark:text-white/70">
            Safe to Spend
          </Text>
          <GlassButton
            variant="icon"
            icon={isPrivacyMode ? "eye-off-outline" : "eye-outline"}
            onPress={onTogglePrivacy}
            size="sm"
          />
        </View>

        <View className="mb-4">
          <Text className="font-bold text-4xl text-neutral-900 tracking-tight dark:text-white">
            {displayAmount}
          </Text>
        </View>

        <View className="flex-row items-center">
          <View className="h-1 flex-1 bg-neutral-200 rounded-full overflow-hidden dark:bg-neutral-700 mr-3">
            <View className="h-full w-[70%] bg-primary-500 rounded-full" />
          </View>
          <Text className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
            {formattedRemaining} left
          </Text>
        </View>
      </BlurView>
    </View>
  );
};
