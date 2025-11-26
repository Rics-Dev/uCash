import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import * as schema from './schema';

// Users
export type User = InferSelectModel<typeof schema.users>;
export type NewUser = InferInsertModel<typeof schema.users>;

// Wallets
export type Wallet = InferSelectModel<typeof schema.wallets>;
export type NewWallet = InferInsertModel<typeof schema.wallets>;

// Categories
export type Category = InferSelectModel<typeof schema.categories>;
export type NewCategory = InferInsertModel<typeof schema.categories>;

// Transactions
export type Transaction = InferSelectModel<typeof schema.transactions>;
export type NewTransaction = InferInsertModel<typeof schema.transactions>;

// Recurring Transactions
export type RecurringTransaction = InferSelectModel<typeof schema.recurringTransactions>;
export type NewRecurringTransaction = InferInsertModel<typeof schema.recurringTransactions>;

// Budgets
export type Budget = InferSelectModel<typeof schema.budgets>;
export type NewBudget = InferInsertModel<typeof schema.budgets>;

// Tags
export type Tag = InferSelectModel<typeof schema.tags>;
export type NewTag = InferInsertModel<typeof schema.tags>;

// Transaction Tags
export type TransactionTag = InferSelectModel<typeof schema.transactionTags>;
export type NewTransactionTag = InferInsertModel<typeof schema.transactionTags>;

// Sync Log
export type SyncLog = InferSelectModel<typeof schema.syncLog>;
export type NewSyncLog = InferInsertModel<typeof schema.syncLog>;

// Sync Conflicts
export type SyncConflict = InferSelectModel<typeof schema.syncConflicts>;
export type NewSyncConflict = InferInsertModel<typeof schema.syncConflicts>;

// Attachments
export type Attachment = InferSelectModel<typeof schema.attachments>;
export type NewAttachment = InferInsertModel<typeof schema.attachments>;

// User Preferences
export type UserPreference = InferSelectModel<typeof schema.userPreferences>;
export type NewUserPreference = InferInsertModel<typeof schema.userPreferences>;
