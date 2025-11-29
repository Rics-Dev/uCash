import "@/global.css";

import { QueryClientProvider } from "@tanstack/react-query";

import { Stack } from "expo-router";
import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { AppThemeProvider } from "@/contexts/app-theme-context";
import { DatabaseProvider } from "@/contexts/db-context";
import { ToastProvider } from "@/contexts/toast-context";
import { BiometricProvider } from "@/contexts/biometric-context";
import * as SplashScreen from 'expo-splash-screen';
import { queryClient } from "@/utils/trpc";

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
                    <StackLayout />
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
