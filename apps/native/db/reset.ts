import { deleteDatabaseAsync } from 'expo-sqlite';
import { expoDb, reinitializeDb } from './client';

export async function resetDatabase() {
  console.log('RESETTING DATABASE (FILE DELETION)...');
  
  try {
    // 1. Close the existing connection
    expoDb.closeSync();

    // 2. Delete database using expo-sqlite
    console.log('Deleting database...');
    await deleteDatabaseAsync('ucash.db');

    // 3. Re-initialize the database connection
    console.log('Re-initializing database...');
    reinitializeDb();

    console.log('DATABASE RESET COMPLETE');
  } catch (error) {
    console.error('Error resetting database:', error);
    throw error;
  }
}
