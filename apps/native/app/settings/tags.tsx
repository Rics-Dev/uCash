import { View, Text } from "react-native";
import { Container } from "@/components/container";
import { GlassButton } from "@/components/GlassButton";
import { useRouter } from "expo-router";

export default function TagsSettings() {
  const router = useRouter();
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
          Tags
        </Text>
      </View>
      <View className="flex-1 justify-center items-center">
        <Text className="text-neutral-500">Coming Soon</Text>
      </View>
    </Container>
  );
}
