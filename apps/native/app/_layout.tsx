import "@/global.css";

import { QueryClientProvider } from "@tanstack/react-query";

import { Stack, useRouter, useSegments } from "expo-router";
import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { AppThemeProvider } from "@/contexts/app-theme-context";
import { DatabaseProvider } from "@/contexts/db-context";
import { ToastProvider } from "@/contexts/toast-context";
import { BiometricProvider } from "@/contexts/biometric-context";
import * as SplashScreen from 'expo-splash-screen';
import { queryClient } from "@/utils/trpc";
import { useOnboardingStore } from "@/stores/onboarding-store";
import React from "react";

// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();


export const unstable_settings = {
  initialRouteName: "(tabs)",
};

function StackLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardProvider>
          <AppThemeProvider>
            <HeroUINativeProvider>
              <DatabaseProvider>
                <ToastProvider>
                  <BiometricProvider>
                    <RootLayoutNav />
                  </BiometricProvider>
                </ToastProvider>
              </DatabaseProvider>
            </HeroUINativeProvider>
          </AppThemeProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

function RootLayoutNav() {
  const { hasCompletedOnboarding } = useOnboardingStore();
  const segments = useSegments();
  const router = useRouter();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (!isMounted) return;

    const inOnboardingGroup = segments[0] === 'onboarding';

    if (!hasCompletedOnboarding && !inOnboardingGroup) {
      // Redirect to the onboarding page if not completed and not already there
      router.replace('/onboarding');
    } else if (hasCompletedOnboarding && inOnboardingGroup) {
      // Redirect to the tabs page if completed and currently on onboarding
      router.replace('/(tabs)');
    }
  }, [hasCompletedOnboarding, segments, isMounted]);

  return <StackLayout />;
}
