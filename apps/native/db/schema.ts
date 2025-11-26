import { sqliteTable, text, integer, real, index, unique } from 'drizzle-orm/sqlite-core';
// import { sql } from 'drizzle-orm';

// ============================================
// USERS & AUTHENTICATION
// ============================================
export const users = sqliteTable('users', {
  userId: text('user_id').primaryKey(),
  email: text('email').notNull().unique(),
  displayName: text('display_name'),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
  lastSyncAt: integer('last_sync_at'),
  isPremium: integer('is_premium', { mode: 'boolean' }).default(false),
});

// ============================================
// WALLETS 
// ============================================
export const wallets = sqliteTable('wallets', {
  walletId: text('wallet_id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.userId, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  type: text('type').notNull(),
  currency: text('currency').notNull().default('USD'),
  currentBalance: real('current_balance').notNull().default(0),
  color: text('color'),
  icon: text('icon'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  isNetWorth: integer('is_net_worth', { mode: 'boolean' }).default(true),
  bankName: text('bank_name'),
  accountNumber: text('account_number'),
  creditLimit: real('credit_limit'),
  billingCycleDay: integer('billing_cycle_day'),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
  syncedAt: integer('synced_at'),
  isDeleted: integer('is_deleted', { mode: 'boolean' }).default(false),
}, (table) => [
  index('idx_wallets_user').on(table.userId),
  index('idx_wallets_active').on(table.userId, table.isActive, table.isDeleted),
]);

// ============================================
// CATEGORIES (Income & Expense categories)
// ============================================
export const categories = sqliteTable('categories', {
  categoryId: text('category_id').primaryKey(),
  userId: text('user_id').references(() => users.userId, { onDelete: 'cascade' }), // NULL for system/default categories
  parentCategoryId: text('parent_category_id'), // Self-reference handled below if needed, or just loose coupling
  name: text('name').notNull(),
  type: text('type').notNull(), // income, expense, transfer
  color: text('color'),
  icon: text('icon'),
  isSystem: integer('is_system', { mode: 'boolean' }).default(false),
  displayOrder: integer('display_order').default(0),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
  syncedAt: integer('synced_at'),
  isDeleted: integer('is_deleted', { mode: 'boolean' }).default(false),
}, (table) => [
  index('idx_categories_user').on(table.userId),
  index('idx_categories_type').on(table.userId, table.type, table.isDeleted),
  index('idx_categories_parent').on(table.parentCategoryId),
  index('fk_categories_parent').on(table.parentCategoryId), // Approximate FK index
]);

// ============================================
// TRANSACTIONS (Core financial records)
// ============================================
export const transactions = sqliteTable('transactions', {
  transactionId: text('transaction_id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.userId, { onDelete: 'cascade' }),
  walletId: text('wallet_id').notNull().references(() => wallets.walletId, { onDelete: 'cascade' }),
  categoryId: text('category_id').references(() => categories.categoryId, { onDelete: 'set null' }),
  type: text('type').notNull(), // income, expense, transfer
  amount: real('amount').notNull(),
  currency: text('currency').notNull().default('USD'),
  transactionDate: integer('transaction_date').notNull(), // Unix timestamp
  description: text('description'),
  notes: text('notes'),
  location: text('location'),
  receiptPath: text('receipt_path'),
  
  // Transfer specific fields
  toWalletId: text('to_wallet_id').references(() => wallets.walletId, { onDelete: 'set null' }),
  linkedTransactionId: text('linked_transaction_id'), // Self-reference
  
  // Recurrence
  recurrenceId: text('recurrence_id'), // Reference to recurring_transactions defined later
  
  // Metadata
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
  syncedAt: integer('synced_at'),
  isDeleted: integer('is_deleted', { mode: 'boolean' }).default(false),
}, (table) => [
  index('idx_transactions_user').on(table.userId),
  index('idx_transactions_wallet').on(table.walletId, table.isDeleted),
  index('idx_transactions_date').on(table.transactionDate),
  index('idx_transactions_category').on(table.categoryId),
  index('idx_transactions_user_date').on(table.userId, table.transactionDate, table.isDeleted),
  index('idx_transactions_sync').on(table.syncedAt, table.updatedAt),
  index('fk_transactions_linked').on(table.linkedTransactionId),
]);

// ============================================
// RECURRING TRANSACTIONS (Subscriptions, bills)
// ============================================
export const recurringTransactions = sqliteTable('recurring_transactions', {
  recurrenceId: text('recurrence_id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.userId, { onDelete: 'cascade' }),
  walletId: text('wallet_id').notNull().references(() => wallets.walletId, { onDelete: 'cascade' }),
  categoryId: text('category_id').references(() => categories.categoryId, { onDelete: 'set null' }),
  type: text('type').notNull(), // income, expense
  amount: real('amount').notNull(),
  currency: text('currency').notNull().default('USD'),
  description: text('description').notNull(),
  notes: text('notes'),
  
  // Recurrence rules
  frequency: text('frequency').notNull(), // daily, weekly, biweekly, monthly, quarterly, yearly
  interval: integer('interval').default(1),
  startDate: integer('start_date').notNull(),
  endDate: integer('end_date'),
  nextOccurrence: integer('next_occurrence').notNull(),
  
  // Settings
  autoCreate: integer('auto_create', { mode: 'boolean' }).default(true),
  notifyBeforeDays: integer('notify_before_days').default(1),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
  syncedAt: integer('synced_at'),
  isDeleted: integer('is_deleted', { mode: 'boolean' }).default(false),
}, (table) => [
  index('idx_recurring_user').on(table.userId),
  index('idx_recurring_next').on(table.nextOccurrence, table.isActive, table.isDeleted),
]);

// ============================================
// BUDGETS (Monthly/period budgets)
// ============================================
export const budgets = sqliteTable('budgets', {
  budgetId: text('budget_id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.userId, { onDelete: 'cascade' }),
  categoryId: text('category_id').references(() => categories.categoryId, { onDelete: 'cascade' }), // NULL for overall budget
  name: text('name').notNull(),
  amount: real('amount').notNull(),
  currency: text('currency').notNull().default('USD'),
  periodType: text('period_type').notNull(), // weekly, monthly, quarterly, yearly, custom
  startDate: integer('start_date').notNull(),
  endDate: integer('end_date'),
  rollover: integer('rollover', { mode: 'boolean' }).default(false),
  alertThreshold: real('alert_threshold'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
  syncedAt: integer('synced_at'),
  isDeleted: integer('is_deleted', { mode: 'boolean' }).default(false),
}, (table) => [
  index('idx_budgets_user').on(table.userId),
  index('idx_budgets_period').on(table.userId, table.startDate, table.endDate, table.isDeleted),
]);

// ============================================
// TAGS (Flexible tagging system)
// ============================================
export const tags = sqliteTable('tags', {
  tagId: text('tag_id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.userId, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  color: text('color'),
  createdAt: integer('created_at').notNull(),
  isDeleted: integer('is_deleted', { mode: 'boolean' }).default(false),
}, (table) => [
  index('idx_tags_user').on(table.userId, table.isDeleted),
  unique('unique_user_tag').on(table.userId, table.name),
]);

export const transactionTags = sqliteTable('transaction_tags', {
  transactionId: text('transaction_id').notNull().references(() => transactions.transactionId, { onDelete: 'cascade' }),
  tagId: text('tag_id').notNull().references(() => tags.tagId, { onDelete: 'cascade' }),
  createdAt: integer('created_at').notNull(),
}, (table) => [
  unique('pk_transaction_tags').on(table.transactionId, table.tagId), // Composite PK simulation
]);

// ============================================
// SYNC TRACKING (For cloud synchronization)
// ============================================
export const syncLog = sqliteTable('sync_log', {
  syncId: text('sync_id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.userId, { onDelete: 'cascade' }),
  syncStartedAt: integer('sync_started_at').notNull(),
  syncCompletedAt: integer('sync_completed_at'),
  status: text('status').notNull(), // pending, in_progress, completed, failed
  recordsPushed: integer('records_pushed').default(0),
  recordsPulled: integer('records_pulled').default(0),
  conflictsResolved: integer('conflicts_resolved').default(0),
  errorMessage: text('error_message'),
}, (table) => [
  index('idx_sync_user').on(table.userId, table.syncStartedAt),
]);

export const syncConflicts = sqliteTable('sync_conflicts', {
  conflictId: text('conflict_id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.userId, { onDelete: 'cascade' }),
  tableName: text('table_name').notNull(),
  recordId: text('record_id').notNull(),
  localData: text('local_data').notNull(), // JSON
  remoteData: text('remote_data').notNull(), // JSON
  resolution: text('resolution'), // local, remote, manual, NULL
  createdAt: integer('created_at').notNull(),
  resolvedAt: integer('resolved_at'),
});

// ============================================
// ATTACHMENTS (Receipts, documents)
// ============================================
export const attachments = sqliteTable('attachments', {
  attachmentId: text('attachment_id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.userId, { onDelete: 'cascade' }),
  transactionId: text('transaction_id').notNull().references(() => transactions.transactionId, { onDelete: 'cascade' }),
  fileName: text('file_name').notNull(),
  filePath: text('file_path').notNull(), // Local path
  fileSize: integer('file_size'),
  mimeType: text('mime_type'),
  cloudUrl: text('cloud_url'),
  uploadedAt: integer('uploaded_at'),
  createdAt: integer('created_at').notNull(),
  isDeleted: integer('is_deleted', { mode: 'boolean' }).default(false),
}, (table) => [
  index('idx_attachments_transaction').on(table.transactionId),
]);

// ============================================
// USER PREFERENCES
// ============================================
export const userPreferences = sqliteTable('user_preferences', {
  userId: text('user_id').primaryKey().references(() => users.userId, { onDelete: 'cascade' }),
  defaultCurrency: text('default_currency').default('USD'),
  defaultWalletId: text('default_wallet_id').references(() => wallets.walletId, { onDelete: 'set null' }),
  theme: text('theme').default('system'),
  notificationEnabled: integer('notification_enabled', { mode: 'boolean' }).default(true),
  budgetAlertEnabled: integer('budget_alert_enabled', { mode: 'boolean' }).default(true),
  weeklyReportEnabled: integer('weekly_report_enabled', { mode: 'boolean' }).default(false),
  firstDayOfWeek: integer('first_day_of_week').default(0), // 0 = Sunday
  dateFormat: text('date_format').default('MM/DD/YYYY'),
  updatedAt: integer('updated_at').notNull(),
});
