import { Stack } from "expo-router";
// import { useColorScheme } from "react-native";

export default function AccountsLayout() {
  // const colorScheme = useColorScheme();
  // const isDark = colorScheme === "dark";

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Accounts",
        }}
      />
      <Stack.Screen
        name="add-account-modal"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
