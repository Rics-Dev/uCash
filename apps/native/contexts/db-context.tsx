import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { db } from '../db/client';
import migrations from '../drizzle/migrations';
import { View, Text, ActivityIndicator } from 'react-native';
import type { ReactNode } from 'react';

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Setting up database...</Text>
      </View>
    );
  }

  return <>{children}</>;
}
