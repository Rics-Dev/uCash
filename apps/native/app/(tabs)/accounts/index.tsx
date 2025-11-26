import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { AccountRow } from "@/components/accounts/AccountRow";
import { CreditRow } from "@/components/accounts/CreditRow";
import { NetWorthCard } from "@/components/accounts/NetWorthCard";
import { SectionHeader } from "@/components/accounts/SectionHeader";
import { Container } from "@/components/container";
import { Link } from "expo-router";
import { GlassButton } from "@/components/GlassButton";
import { useAppTheme } from "@/contexts/app-theme-context";
import { useWallets } from "@/hooks/use-wallets";
import { GlassToast } from "@/components/GlassToast";

export default function Accounts() {
  const [isPrivacyMode, setIsPrivacyMode] = useState(false);
  const { isDark } = useAppTheme();
  const { accounts } = useWallets();

  const togglePrivacy = () => setIsPrivacyMode(!isPrivacyMode);

  // Group accounts
  const checkingAccounts = accounts.filter(a => a.type === "checking");
  const savingsAccounts = accounts.filter(a => a.type === "savings");
  const creditAccounts = accounts.filter(a => a.type === "credit");
  const cashAccounts = accounts.filter(a => a.type === "cash");

  // Calculate Net Worth
  const netWorth = accounts.reduce((total, account) => {
    if (!account.isNetWorth) return total;
    if (account.type === "credit") {
      return total - account.currentBalance;
    }
    return total + account.currentBalance;
  }, 0);

  return (
    <Container className="bg-neutral-50 px-4 dark:bg-black">
      <View className="flex-row items-center justify-between">
        <Text className="font-bold text-3xl text-neutral-900 dark:text-white">
          Accounts
        </Text>
        <View className="flex-row items-center gap-4">
          {/* <Link href="/(tabs)/accounts/add-account-modal" asChild>
            <GlassButton variant="icon-text" icon="add" text="Add" onPress={() => {}} />
          </Link> */}
          <GlassButton variant="icon-text" icon="add" text="Add" onPress={() => {
            GlassToast({ message: "Add Account", type: "info", onDismiss: () => { } });
          }} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <NetWorthCard
          balance={netWorth}
          isPrivacyMode={isPrivacyMode}
          onTogglePrivacy={togglePrivacy}
        />

        {/* Checking Accounts */}
        {checkingAccounts.length > 0 && (
          <View className="mt-6">
            <SectionHeader title="Checking" />
            <View className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
              {checkingAccounts.map((account) => (
                <AccountRow
                  key={account.walletId}
                  name={account.name}
                  balance={account.currentBalance}
                  last4={account.accountNumber ? account.accountNumber.slice(-4) : "••••"}
                  iconName={account.icon as any}
                  isPrivacyMode={isPrivacyMode}
                />
              ))}
            </View>
          </View>
        )}

        {/* Savings Accounts */}
        {savingsAccounts.length > 0 && (
          <View className="mt-6">
            <SectionHeader title="Savings" />
            <View className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
              {savingsAccounts.map((account) => (
                <AccountRow
                  key={account.walletId}
                  name={account.name}
                  balance={account.currentBalance}
                  last4={account.accountNumber ? account.accountNumber.slice(-4) : "••••"}
                  iconName={account.icon as any}
                  isPrivacyMode={isPrivacyMode}
                />
              ))}
            </View>
          </View>
        )}

        {/* Credit Cards */}
        {creditAccounts.length > 0 && (
          <View className="mt-6">
            <SectionHeader title="Credit Cards" />
            <View className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
              {creditAccounts.map((account) => (
                <CreditRow
                  key={account.walletId}
                  name={account.name}
                  balance={account.currentBalance}
                  limit={account.creditLimit || 0}
                  iconName={account.icon as any}
                  isPrivacyMode={isPrivacyMode}
                />
              ))}
            </View>
          </View>
        )}

        {/* Cash Accounts */}
        {cashAccounts.length > 0 && (
          <View className="mt-6">
            <SectionHeader title="Cash" />
            <View className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
              {cashAccounts.map((account) => (
                <AccountRow
                  key={account.walletId}
                  name={account.name}
                  balance={account.currentBalance}
                  last4="N/A"
                  iconName={account.icon as any}
                  isPrivacyMode={isPrivacyMode}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </Container>
  );
}
