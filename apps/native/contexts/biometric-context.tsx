import React, { createContext, useContext, useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { AppState, AppStateStatus, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useAppTheme } from './app-theme-context';

const BIOMETRIC_ENABLED_KEY = 'biometric_enabled';

interface BiometricContextType {
  isBiometricEnabled: boolean;
  isLocked: boolean;
  enableBiometric: () => Promise<boolean>;
  disableBiometric: () => Promise<void>;
  authenticate: () => Promise<boolean>;
}

const BiometricContext = createContext<BiometricContextType | undefined>(undefined);

export function BiometricProvider({ children }: { children: React.ReactNode }) {
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { isDark } = useAppTheme();

  useEffect(() => {
    checkBiometricStatus();
  }, []);

  const checkBiometricStatus = async () => {
    try {
      const enabled = await SecureStore.getItemAsync(BIOMETRIC_ENABLED_KEY);
      if (enabled === 'true') {
        setIsBiometricEnabled(true);
        setIsLocked(true); // Lock on startup if enabled
      }
    } catch (error) {
      console.error('Error checking biometric status:', error);
    } finally {
      setIsReady(true);
    }
  };

  const authenticate = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        // Fallback or error if hardware missing but enabled (edge case)
        return false;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Unlock uCash',
        fallbackLabel: 'Use Passcode',
      });

      if (result.success) {
        setIsLocked(false);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  };

  const enableBiometric = async () => {
    const success = await authenticate();
    if (success) {
      await SecureStore.setItemAsync(BIOMETRIC_ENABLED_KEY, 'true');
      setIsBiometricEnabled(true);
      return true;
    }
    return false;
  };

  const disableBiometric = async () => {
    await SecureStore.deleteItemAsync(BIOMETRIC_ENABLED_KEY);
    setIsBiometricEnabled(false);
  };

  // Effect to trigger auth when locked
  useEffect(() => {
    if (isReady && isLocked && isBiometricEnabled) {
      authenticate();
    }
  }, [isReady, isLocked, isBiometricEnabled]);

  if (!isReady) {
    return null; // Or a splash screen
  }

  return (
    <BiometricContext.Provider
      value={{
        isBiometricEnabled,
        isLocked,
        enableBiometric,
        disableBiometric,
        authenticate,
      }}
    >
      {children}
      {isLocked && isBiometricEnabled && (
        <View className="absolute inset-0 z-50 bg-neutral-50 dark:bg-neutral-950 items-center justify-center">
            <BlurView 
                intensity={80} 
                tint={isDark ? "dark" : "light"}
                className="absolute inset-0"
            />
            <View className="items-center gap-6">
                <View className="w-20 h-20 rounded-full bg-neutral-200 dark:bg-neutral-800 items-center justify-center">
                    <Ionicons name="lock-closed" size={40} color={isDark ? "#fff" : "#000"} />
                </View>
                <Text className="text-2xl font-bold text-neutral-900 dark:text-white">
                    uCash is Locked
                </Text>
                <TouchableOpacity 
                    onPress={authenticate}
                    className="bg-indigo-600 px-8 py-3 rounded-full"
                >
                    <Text className="text-white font-semibold">
                        Unlock
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
      )}
    </BiometricContext.Provider>
  );
}

export function useBiometric() {
  const context = useContext(BiometricContext);
  if (context === undefined) {
    throw new Error('useBiometric must be used within a BiometricProvider');
  }
  return context;
}
