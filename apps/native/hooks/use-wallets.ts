import { useCallback, useState } from "react";
import { db } from "../db/client";
import { wallets, users } from "../db/schema";
import { NewWallet, Wallet } from "../db/types";
import { eq, desc } from "drizzle-orm";
import { useFocusEffect } from "expo-router";
import * as Crypto from 'expo-crypto';

export function useWallets() {
  const [accounts, setAccounts] = useState<Wallet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchAccounts = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await db.select().from(wallets).where(eq(wallets.isDeleted, false));
      setAccounts(result);
      setError(null);
    } catch (err) {
      console.error("Error fetching accounts:", err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAccounts();
    }, [fetchAccounts])
  );

  return { accounts, isLoading, error, refetch: fetchAccounts };
}

export function useCreateWallet() {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createWallet = async (walletData: Omit<NewWallet, "walletId" | "userId" | "createdAt" | "updatedAt">) => {
    setIsCreating(true);
    setError(null);
    try {
      // Ensure a default user exists (for local-first app)
      // In a real app with auth, you'd get the userId from the auth context
      const defaultUserId = "default-user";
      const existingUser = await db.select().from(users).where(eq(users.userId, defaultUserId)).limit(1);

      if (existingUser.length === 0) {
        await db.insert(users).values({
          userId: defaultUserId,
          email: "user@example.com",
          displayName: "Default User",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
      }

      const newWallet: NewWallet = {
        ...walletData,
        walletId: Crypto.randomUUID(),
        userId: defaultUserId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        isDeleted: false,
      };

      await db.insert(wallets).values(newWallet);
      return newWallet;
    } catch (err) {
      console.error("Error creating wallet:", err);
      setError(err as Error);
      throw err;
    } finally {
      setIsCreating(false);
    }
  };

  return { createWallet, isCreating, error };
}
