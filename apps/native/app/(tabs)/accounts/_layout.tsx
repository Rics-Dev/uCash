import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function AccountsLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Accounts",
          // headerBlurEffect: "none",
          // headerTransparent: true,
          headerShadowVisible: false,
          // headerLargeTitle: true,
          headerStyle: { backgroundColor: isDark ? "#000000" : "#fafafa" },
          headerTintColor: isDark ? "#ffffff" : "#000000",
          headerLargeTitleStyle: { color: isDark ? "#ffffff" : "#000000" },
          headerTitleStyle: { color: isDark ? "#ffffff" : "#000000" },
          // headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
