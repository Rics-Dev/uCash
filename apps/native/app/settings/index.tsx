import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Container } from "@/components/container";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { SettingsRow } from "@/components/settings/SettingsRow";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAppTheme } from "@/contexts/app-theme-context";
import { GlassButton } from "@/components/GlassButton";
import * as LocalAuthentication from 'expo-local-authentication';
import { BlurView } from "expo-blur";

export default function Settings() {
  const router = useRouter();
  const { isDark } = useAppTheme();

  
  // State for toggles
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleBiometricToggle = async (value: boolean) => {
    if (value) {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (hasHardware && isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: "Authenticate to enable biometric lock",
        });
        if (result.success) {
            setBiometricEnabled(true);
        }
      } else {
        // Handle case where biometrics are not available or enrolled
        alert("Biometric authentication is not available or enrolled on this device.");
        setBiometricEnabled(false);
      }
    } else {
        setBiometricEnabled(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Container className="bg-neutral-50 dark:bg-black">
      <View className="flex-row items-center px-4 mb-4 gap-4">
        <GlassButton
            variant="icon"
            onPress={() => router.back()}
            icon="arrow-back"
            size="md"
            className="py-1.5 px-5"
        />
        <Text className="font-bold text-3xl text-neutral-900 dark:text-white">
          Settings
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {isLoggedIn ? (
            <SettingsHeader 
                name="Racim" 
                email="racim@ucash.app" 
                onPress={() => {}} 
                onLogout={handleLogout}
            />
        ) : (
            <TouchableOpacity 
                activeOpacity={0.8}
                onPress={() => router.push("/settings/premium")}
                className="mx-4 mb-6 rounded-2xl overflow-hidden border border-neutral-200/50 dark:border-neutral-800/50"
            >
                <BlurView
                    intensity={isDark ? 20 : 40}
                    tint={isDark ? "dark" : "light"}
                    className="p-5 "
                >
                    <View className="flex-row items-center justify-between mb-2">
                        <View className="flex-row items-center gap-2">
                            <Ionicons name="diamond" size={20} color="#F59E0B" />
                            <Text className="font-bold text-lg text-neutral-900 dark:text-white">
                                Go Premium
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={isDark ? "#6b7280" : "#9ca3af"} />
                    </View>
                    <Text className="text-neutral-500 dark:text-neutral-400 text-sm mb-3">
                        Unlock bank connections, cloud sync, and advanced security features.
                    </Text>
                    <View className="flex-row items-center">
                        <Text className="text-indigo-500 font-medium">
                            Learn more
                        </Text>
                    </View>
                </BlurView>
            </TouchableOpacity>
        )}

        {isLoggedIn && (
            <SettingsSection title="Security & Privacy">
                <SettingsRow 
                    icon="finger-print-outline" 
                    label="Biometric Lock" 
                    type="toggle" 
                    value={biometricEnabled}
                    onToggle={handleBiometricToggle}
                />
                <SettingsRow 
                    icon="key-outline" 
                    label="Change Password" 
                    onPress={() => {}}
                />
                <SettingsRow 
                    icon="eye-off-outline" 
                    label="Data Masking" 
                    onPress={() => {}}
                />
                <SettingsRow 
                    icon="shield-checkmark-outline" 
                    label="2-Factor Auth" 
                    onPress={() => {}}
                    isLast
                />
            </SettingsSection>
        )}

        <SettingsSection title="Customization">
            <SettingsRow 
                icon="list-outline" 
                label="Manage Categories" 
                onPress={() => router.push("/settings/categories")}
            />
            <SettingsRow 
                icon="pricetags-outline" 
                label="Manage Tags" 
                onPress={() => router.push("/settings/tags")}
            />
            <SettingsRow 
                icon="cash-outline" 
                label="Currency" 
                type="value"
                value="USD"
                onPress={() => {}}
            />
            <SettingsRow 
                icon="calendar-outline" 
                label="Start of Week" 
                type="value"
                value="Monday"
                onPress={() => {}}
                isLast
            />
        </SettingsSection>

        <SettingsSection title="Accounts & Data">
            <SettingsRow 
                icon="business-outline" 
                label="Connected Banks" 
                onPress={() => router.push("/settings/banks")}
            />
            <SettingsRow 
                icon="wallet-outline" 
                label="Manual Accounts" 
                onPress={() => router.push("/settings/manual-accounts")}
            />
            <SettingsRow 
                icon="cloud-upload-outline" 
                label="Data Export" 
                onPress={() => router.push("/settings/export")}
            />
            <SettingsRow 
                icon="cloud-download-outline" 
                label="Data Import" 
                onPress={() => router.push("/settings/import")}
                isLast
            />
        </SettingsSection>

        <SettingsSection title="App Preferences">
            <SettingsRow 
                icon="notifications-outline" 
                label="Notifications" 
                type="toggle"
                value={notificationsEnabled}
                onToggle={setNotificationsEnabled}
            />
            <SettingsRow 
                icon="help-circle-outline" 
                label="Help & FAQ" 
                type="link"
                onPress={() => router.push("/settings/help")}
            />
            <SettingsRow 
                icon="document-text-outline" 
                label="Privacy Policy" 
                type="link"
                onPress={() => router.push("/settings/privacy")}
                isLast
            />
        </SettingsSection>

        <View className="items-center mt-4 mb-8">
            <Text className="text-xs text-neutral-400 dark:text-neutral-600">
                uCash Version 1.0 (Build 54)
            </Text>
        </View>
      </ScrollView>
    </Container>
  );
}
