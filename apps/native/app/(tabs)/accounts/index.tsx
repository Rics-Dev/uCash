
import { useState } from "react";
import { Pressable, useColorScheme, View, Text } from "react-native";
import { AccountRow } from "@/components/accounts/AccountRow";
import { CreditRow } from "@/components/accounts/CreditRow";
import { NetWorthCard } from "@/components/accounts/NetWorthCard";
import { SectionHeader } from "@/components/accounts/SectionHeader";
import { Container } from "@/components/container";
import { Ionicons } from "@expo/vector-icons";




export default function Accounts() {
  const [isPrivacyMode, setIsPrivacyMode] = useState(false);
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

  const togglePrivacy = () => setIsPrivacyMode(!isPrivacyMode);

  // Mock Data (Replace with real data later)
  const netWorth = 2110.0;

  const wallets = [
    {
      id: "1",
      name: "Chase Checking",
      balance: 2400.0,
      last4: "4402",
      icon: "wallet-outline" as const,
      type: "wallet",
    },
    {
      id: "2",
      name: "Cash",
      balance: 150.0,
      last4: "N/A",
      icon: "cash-outline" as const,
      type: "wallet",
    },
  ];

  const creditCards = [
    {
      id: "3",
      name: "Amex Gold",
      balance: 1299.0,
      limit: 10_000,
      icon: "card-outline" as const,
      type: "credit",
    },
    {
      id: "4",
      name: "Apple Card",
      balance: 45.0,
      limit: 5000,
      icon: "logo-apple" as const,
      type: "credit",
    },
    {
      id: "20",
      name: "Apple Card",
      balance: 45.0,
      limit: 5000,
      icon: "logo-apple" as const,
      type: "credit",
    },
    {
      id: "21",
      name: "Apple Card",
      balance: 45.0,
      limit: 5000,
      icon: "logo-apple" as const,
      type: "credit",
    },
    {
      id: "22",
      name: "Apple Card",
      balance: 45.0,
      limit: 5000,
      icon: "logo-apple" as const,
      type: "credit",
    },
    {
      id: "23",
      name: "Apple Card",
      balance: 45.0,
      limit: 5000,
      icon: "logo-apple" as const,
      type: "credit",
    },
    {
      id: "24",
      name: "Apple Card",
      balance: 45.0,
      limit: 5000,
      icon: "logo-apple" as const,
      type: "credit",
    },
    {
      id: "25",
      name: "Apple Card",
      balance: 45.0,
      limit: 5000,
      icon: "logo-apple" as const,
      type: "credit",
    },
    {
      id: "26",
      name: "Apple Card",
      balance: 45.0,
      limit: 5000,
      icon: "logo-apple" as const,
      type: "credit",
    },
    {
      id: "27",
      name: "Apple Card",
      balance: 45.0,
      limit: 5000,
      icon: "logo-apple" as const,
      type: "credit",
    },
    {
      id: "28",
      name: "Apple Card",
      balance: 45.0,
      limit: 5000,
      icon: "logo-apple" as const,
      type: "credit",
    },
    {
      id: "29",
      name: "Apple Card",
      balance: 45.0,
      limit: 5000,
      icon: "logo-apple" as const,
      type: "credit",
    },
    {
      id: "30",
      name: "Apple Card",
      balance: 45.0,
      limit: 5000,
      icon: "logo-apple" as const,
      type: "credit",
    },
  ];

  const savings = [
    {
      id: "5",
      name: "High Yield Savings",
      balance: 10_500.0,
      last4: "9921",
      icon: "trending-up-outline" as const,
    },
    {
      id: "6",
      name: "Robinhood",
      balance: 5200.0,
      last4: "1122",
      icon: "bar-chart-outline" as const,
    },
    {
      id: "7",
      name: "Robinhood",
      balance: 5200.0,
      last4: "1122",
      icon: "bar-chart-outline" as const,
    },
    {
      id: "8",
      name: "Robinhood",
      balance: 5200.0,
      last4: "1122",
      icon: "bar-chart-outline" as const,
    },
    {
      id: "9",
      name: "Robinhood",
      balance: 5200.0,
      last4: "1122",
      icon: "bar-chart-outline" as const,
    },
    {
      id: "10",
      name: "Robinhood",
      balance: 5200.0,
      last4: "1122",
      icon: "bar-chart-outline" as const,
    },
    {
      id: "11",
      name: "Robinhood",
      balance: 5200.0,
      last4: "1122",
      icon: "bar-chart-outline" as const,
    },
    {
      id: "12",
      name: "Robinhood",
      balance: 5200.0,
      last4: "1122",
      icon: "bar-chart-outline" as const,
    },
    {
      id: "13",
      name: "Robinhood",
      balance: 5200.0,
      last4: "1122",
      icon: "bar-chart-outline" as const,
    },
  ];

  return (
    <Container className="bg-neutral-50 px-4 dark:bg-black">

      <View
        className="flex-row items-center justify-between"
      >
        <Text className="font-bold text-3xl text-neutral-900 dark:text-white">
          Accounts
        </Text>
        <View className="flex-row items-center gap-4">
          <Pressable onPress={togglePrivacy}>
            <Ionicons
              color={isDark ? "white" : "black"}
              name={isPrivacyMode ? "eye-off-outline" : "eye-outline"}
              size={24}
            />
          </Pressable>
        </View>
      </View>

      <NetWorthCard
        balance={netWorth}
        isPrivacyMode={isPrivacyMode}
        onTogglePrivacy={togglePrivacy}
      />

      <View className="mt-2">
        <SectionHeader title="Accounts" />
        <View className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
          {wallets.map((wallet) => (
            <AccountRow
              balance={wallet.balance}
              iconName={wallet.icon}
              isPrivacyMode={isPrivacyMode}
              key={wallet.id}
              last4={wallet.last4}
              name={wallet.name}
            />
          ))}
          {creditCards.map((card) => (
            <CreditRow
              balance={card.balance}
              iconName={card.icon}
              isPrivacyMode={isPrivacyMode}
              key={card.id}
              limit={card.limit}
              name={card.name}
            />
          ))}
        </View>
      </View>

      <View className="mt-6">
        <SectionHeader title="Savings" />
        <View className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
          {savings.map((account) => (
            <AccountRow
              balance={account.balance}
              iconName={account.icon}
              isPrivacyMode={isPrivacyMode}
              key={account.id}
              last4={account.last4}
              name={account.name}
            />
          ))}
        </View>
      </View>
      </Container>
  );
}
