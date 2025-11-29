import { View, Text, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { useAppTheme } from "@/contexts/app-theme-context";
import { Ionicons } from "@expo/vector-icons";

type SettingsHeaderProps = {
  name: string;
  email: string;
  onPress: () => void;
  onLogout: () => void;
};

export const SettingsHeader = ({ name, email, onPress, onLogout }: SettingsHeaderProps) => {
  const { isDark } = useAppTheme();

  return (
    <View className="px-4 mb-8 mt-2">
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <BlurView
            intensity={isDark ? 60 : 40}
            tint={isDark ? "dark" : "light"}
            className="p-4 rounded-3xl overflow-hidden border flex-row items-center justify-between"
            style={{
                borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.4)",
            }}
        >
            <View className="flex-row items-center gap-4">
                <View className="w-14 h-14 rounded-full bg-neutral-200 dark:bg-neutral-800 items-center justify-center">
                    <Text className="text-2xl font-bold text-neutral-600 dark:text-neutral-300">
                        {name.charAt(0)}
                    </Text>
                </View>
                <View>
                    <Text className="text-xl font-bold text-neutral-900 dark:text-white">
                        {name}
                    </Text>
                    <Text className="text-sm text-neutral-500 dark:text-neutral-400">
                        {email}
                    </Text>
                </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={isDark ? "#6b7280" : "#9ca3af"} />
        </BlurView>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={onLogout}
        className="mt-4 flex-row items-center justify-center p-3 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30"
      >
        <Ionicons name="log-out-outline" size={20} color="#EF4444" style={{ marginRight: 8 }} />
        <Text className="text-red-500 font-semibold">Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};
