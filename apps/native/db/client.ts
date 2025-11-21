import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';
// biome-ignore lint/performance/noNamespaceImport: <>
import * as schema from './schema';

const expoDb = openDatabaseSync('ucash.db');

export const db = drizzle(expoDb, { schema });
