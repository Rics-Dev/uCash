import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Container } from "@/components/container";
import { GlassButton } from "@/components/GlassButton";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@/contexts/app-theme-context";
import { BlurView } from "expo-blur";

export default function PremiumScreen() {
  const router = useRouter();
  const { isDark } = useAppTheme();

  const features = [
    {
      icon: "cloud-upload-outline",
      title: "Cloud Sync",
      description: "Sync your data across all your devices securely.",
    },
    {
      icon: "business-outline",
      title: "Bank Connections",
      description: "Automatically import transactions from your bank.",
    },
    {
      icon: "finger-print-outline",
      title: "Advanced Security",
      description: "Protect your data with Biometric Lock and 2FA.",
    },
    {
      icon: "document-text-outline",
      title: "Unlimited Exports",
      description: "Export your financial data in CSV or PDF formats.",
    },
  ];

  return (
    <Container className="bg-neutral-50 dark:bg-black">
      <View className="flex-row items-center px-4 mb-4 gap-4">
        <GlassButton
            variant="icon"
            onPress={() => router.back()}
            icon="close"
            size="md"
            className="py-1.5 px-5"
        />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 20 }}>
        <View className="items-center mb-8">
            <View className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-800 items-center justify-center mb-4">
                <Ionicons name="diamond-outline" size={40} color={isDark ? "#fff" : "#000"} />
            </View>
            <Text className="text-3xl font-bold text-neutral-900 dark:text-white text-center mb-2">
                Unlock Premium
            </Text>
            <Text className="text-neutral-500 dark:text-neutral-400 text-center text-base">
                Take control of your finances with powerful tools and insights.
            </Text>
        </View>

        <View className="gap-4 mb-8">
            {features.map((feature, index) => (
                <BlurView
                    key={index}
                    intensity={isDark ? 20 : 40}
                    tint={isDark ? "dark" : "light"}
                    className="flex-row items-center p-4 rounded-2xl overflow-hidden border border-neutral-200/50 dark:border-neutral-800/50"
                >
                    <View className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 items-center justify-center mr-4">
                        <Ionicons name={feature.icon as any} size={20} color={isDark ? "#fff" : "#000"} />
                    </View>
                    <View className="flex-1">
                        <Text className="text-base font-bold text-neutral-900 dark:text-white mb-0.5">
                            {feature.title}
                        </Text>
                        <Text className="text-sm text-neutral-500 dark:text-neutral-400">
                            {feature.description}
                        </Text>
                    </View>
                </BlurView>
            ))}
        </View>

        <View className="gap-3">
            <GlassButton
                variant="text"
                solid
                onPress={() => {}}
                text="Start Free Trial"
                size="lg"
                className="w-full"
            />
            <TouchableOpacity onPress={() => router.push("/settings/login")}>
                <Text className="text-center text-neutral-900 dark:text-white font-medium py-2">
                    Already have an account? Log in
                </Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
}
