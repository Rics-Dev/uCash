import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { GlassButton } from './GlassButton';
import React from 'react';
import { useAppTheme } from '@/contexts/app-theme-context';

export function EmptyState() {
  const { isDark } = useAppTheme();
  return (
    <View className="items-center justify-center py-12 px-4">
      <View className="bg-neutral-100 dark:bg-neutral-900 p-6 rounded-full mb-6">
        <Ionicons name="wallet-outline" color={isDark ? "#FFF" : "#000"} size={48} className="text-neutral-400 dark:text-neutral-600" />
      </View>
      <Text className="text-xl font-bold text-neutral-900 dark:text-white mb-2 text-center">
        No Accounts Yet
      </Text>
      <Text className="text-neutral-500 dark:text-neutral-400 text-center mb-8 max-w-xs">
        Add your first account to start tracking your net worth.
      </Text>
      <Link href="/(tabs)/accounts/add-account-modal" asChild>
        <GlassButton variant="icon-text" text="Add Account" icon="add" onPress={() => {}} />
      </Link>
    </View>
  );
}
