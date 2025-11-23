import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  Icon,
  Label,
  NativeTabs,
  VectorIcon,
} from "expo-router/unstable-native-tabs";
import { Platform, View } from "react-native";
import { Fab } from "@/components/fab";
import { useAppTheme } from "@/contexts/app-theme-context";
import { FabScrollProvider } from "@/contexts/fab-context";

export default function TabLayout() {
  const { isDark } = useAppTheme();

  return (
    <FabScrollProvider>
      <View style={{ flex: 1 }}>
        <NativeTabs
          backgroundColor={Platform.select({
            android: isDark ? "#121212" : "#ffffff",
            default: undefined,
          })}
          iconColor={Platform.select({
            android: isDark
              ? { default: "#b0b0b0", selected: "#ffffff" }
              : { default: "#757575", selected: "#000000" },
            default: undefined,
          })}
          indicatorColor={Platform.select({
            android: isDark ? "#333333" : "#e0e0e0",
            default: undefined,
          })}
          labelVisibilityMode={Platform.select({
            android: "labeled",
            default: undefined,
          })}
          minimizeBehavior="onScrollDown"
          tintColor={Platform.select({
            android: isDark ? "#ffffff" : "#000000",
            default: undefined,
          })}
        >
          <NativeTabs.Trigger name="index">
            <Label>Home</Label>
            {Platform.select({
              ios: <Icon sf="square.grid.2x2.fill" />,
              android: (
                <Icon
                  src={<VectorIcon family={MaterialIcons} name="dashboard" />}
                />
              ),
            })}
          </NativeTabs.Trigger>

          <NativeTabs.Trigger name="explore">
            <Label>Accounts</Label>
            {Platform.select({
              ios: <Icon sf="creditcard.fill" />,
              android: (
                <Icon
                  src={
                    <VectorIcon
                      family={MaterialIcons}
                      name="account-balance-wallet"
                    />
                  }
                />
              ),
            })}
          </NativeTabs.Trigger>

          <NativeTabs.Trigger name="activity">
            <Label>Activity</Label>
            {Platform.select({
              ios: <Icon sf="chart.bar.fill" />,
              android: (
                <Icon
                  src={<VectorIcon family={MaterialIcons} name="bar-chart" />}
                />
              ),
            })}
          </NativeTabs.Trigger>

          <NativeTabs.Trigger name="profile">
            <Label>Analytics</Label>
            {Platform.select({
              ios: <Icon sf="chart.pie.fill" />,
              android: (
                <Icon
                  src={<VectorIcon family={MaterialIcons} name="pie-chart" />}
                />
              ),
            })}
          </NativeTabs.Trigger>
        </NativeTabs>
        <Fab
          actions={[
            {
              icon: "arrow-right-arrow-left",
              label: "Transfer",
              onPress: () => console.log("Action 3"),
            },
            {
              icon: "arrow-up",
              label: "Income",
              onPress: () => console.log("Action 1"),
            },
            {
              icon: "arrow-down",
              label: "Expense",
              onPress: () => console.log("Action 2"),
            },
          ]}
          variant={
            Platform.OS === "ios" &&
            Number.parseInt(String(Platform.Version), 10) === 26
              ? "minimize"
              : "hide"
          }
        />
      </View>
    </FabScrollProvider>
  );
}
