import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { db } from '../db/client';
import migrations from '../drizzle/migrations';
import { View, Text, ActivityIndicator } from 'react-native';
import { type ReactNode, useEffect, useState } from 'react';
import { resetDatabase } from '../db/reset';

// Set this to true to reset the database on app start
const SHOULD_RESET_DB = false;

function InnerDatabaseProvider({ children }: { children: ReactNode }) {
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

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (SHOULD_RESET_DB) {
        await resetDatabase();
      }
      setIsReady(true);
    };
    init();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Initializing...</Text>
      </View>
    );
  }

  return <InnerDatabaseProvider>{children}</InnerDatabaseProvider>;
}
