import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Text, View } from "react-native";
import { useAppTheme } from "@/contexts/app-theme-context";
import { GlassButton } from "@/components/GlassButton";

type NetWorthCardProps = {
  balance: number;
  isPrivacyMode: boolean;
  onTogglePrivacy: () => void;
};

export const NetWorthCard = ({
  balance,
  isPrivacyMode,
  onTogglePrivacy,
}: NetWorthCardProps) => {
  const { isDark } = useAppTheme();

  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(balance);

  const displayBalance = isPrivacyMode ? "$****.**" : formattedBalance;

  return (
    <View className="mt-6 overflow-hidden rounded-3xl border border-neutral-200 bg-white/50 dark:border-white/20 dark:bg-transparent">
      <BlurView className="p-6" intensity={80} tint={isDark ? "dark" : "light"}>
        <View className="mb-2 flex-row items-start justify-between">
          <Text className="font-medium text-neutral-500 text-sm uppercase tracking-wider dark:text-white/70">
            Overall Balance
          </Text>
          <GlassButton
            variant="icon-only"
            icon={isPrivacyMode ? "eye-off-outline" : "eye-outline"}
            onPress={onTogglePrivacy}
            size="sm"
          />
        </View>

        <View className="mb-2 flex-row items-baseline">
          <Text className="font-bold text-4xl text-neutral-900 tracking-tight dark:text-white">
            {displayBalance}
          </Text>
        </View>

        <View className="mt-2 flex-row justify-between">
          <View className="flex-row items-center rounded-full bg-green-500/10 px-2 py-1 dark:bg-green-500/20">
            <Ionicons color="#4ade80" name="arrow-up" size={12} />
            <Text className="ml-1 font-medium text-green-600 text-xs dark:text-green-400">
              +$4,250 (This Month)
            </Text>
          </View>
        </View>
      </BlurView>
    </View>
  );
};
