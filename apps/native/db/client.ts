import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';
// biome-ignore lint/performance/noNamespaceImport: <>
import * as schema from './schema';

export let expoDb = openDatabaseSync('ucash.db');

export let db = drizzle(expoDb, { schema });

export const reinitializeDb = () => {
  expoDb = openDatabaseSync('ucash.db');
  db = drizzle(expoDb, { schema });
};
