import { View, Text, ScrollView } from "react-native";
import { Container } from "@/components/container";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { SettingsRow } from "@/components/settings/SettingsRow";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAppTheme } from "@/contexts/app-theme-context";

export default function Settings() {
  const router = useRouter();
  const { isDark } = useAppTheme();
  
  // State for toggles
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
  };

  return (
    <Container className="bg-neutral-50 dark:bg-black">
      <View className="flex-row items-center justify-between px-4 mb-4">
        <Text className="font-bold text-3xl text-neutral-900 dark:text-white">
          Settings
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <SettingsHeader 
            name="Racim" 
            email="racim@ucash.app" 
            onPress={() => {}} 
            onLogout={handleLogout}
        />

        <SettingsSection title="Security & Privacy">
            <SettingsRow 
                icon="finger-print-outline" 
                label="Biometric Lock" 
                type="toggle" 
                value={biometricEnabled}
                onToggle={setBiometricEnabled}
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

        <SettingsSection title="Customization">
            <SettingsRow 
                icon="list-outline" 
                label="Manage Categories" 
                onPress={() => {}}
            />
            <SettingsRow 
                icon="pricetags-outline" 
                label="Manage Tags" 
                onPress={() => {}}
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
                onPress={() => {}}
            />
            <SettingsRow 
                icon="wallet-outline" 
                label="Manual Accounts" 
                onPress={() => {}}
            />
            <SettingsRow 
                icon="cloud-upload-outline" 
                label="Data Export" 
                onPress={() => {}}
            />
            <SettingsRow 
                icon="cloud-download-outline" 
                label="Data Import" 
                onPress={() => {}}
                isLast
            />
        </SettingsSection>

        <SettingsSection title="App Preferences">
            <SettingsRow 
                icon="color-palette-outline" 
                label="Appearance" 
                type="value"
                value={isDark ? "Dark" : "Light"}
                onPress={() => {}}
            />
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
                onPress={() => {}}
            />
            <SettingsRow 
                icon="document-text-outline" 
                label="Privacy Policy" 
                type="link"
                onPress={() => {}}
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
