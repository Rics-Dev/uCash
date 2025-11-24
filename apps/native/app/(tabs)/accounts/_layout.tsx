import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

export default function AccountsLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Accounts",
          headerBlurEffect: "regular",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: isDark ? "#000000" : "#fafafa" },
          headerTintColor: isDark ? "#ffffff" : "#000000",
          headerLargeTitleStyle: { color: isDark ? "#ffffff" : "#000000" },
          headerTitleStyle: { color: isDark ? "#ffffff" : "#000000" },
          headerTitleAlign: "center",
          headerRight: () => (
            <Pressable
              // onPress={togglePrivacy}
              hitSlop={10}
              style={{
                paddingHorizontal: 8,
                paddingVertical: 8,
              }}
            >
              <Ionicons
                color={isDark ? "white" : "black"}
                // name={isPrivacyMode ? "eye-off-outline" : "eye-outline"}
                name="eye-outline"
                size={22}
              />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
