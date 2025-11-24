import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type AccountRowProps = {
  name: string;
  balance: number;
  last4: string;
  isPrivacyMode: boolean;
  iconName?: keyof typeof Ionicons.glyphMap;
};

export const AccountRow = ({
  name,
  balance,
  last4,
  isPrivacyMode,
  iconName = "wallet-outline",
}: AccountRowProps) => {
  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(balance);

  return (
    <View className="flex-row items-center border-neutral-100 border-b bg-white p-4 last:border-b-0 dark:border-neutral-800 dark:bg-neutral-900">
      <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
        <Ionicons
          className="text-neutral-900 dark:text-white"
          name={iconName}
          size={20}
        />
      </View>

      <View className="flex-1">
        <Text className="mb-0.5 font-semibold text-base text-neutral-900 dark:text-white">
          {name}
        </Text>
        <Text className="text-neutral-500 text-sm dark:text-neutral-400">
          **** {last4}
        </Text>
      </View>

      <View className="items-end">
        <Text className="mb-0.5 font-medium font-mono text-base text-neutral-900 dark:text-white">
          {isPrivacyMode ? "****" : formattedBalance}
        </Text>
        <Text className="text-neutral-400 text-xs">Updated just now</Text>
      </View>
    </View>
  );
};
