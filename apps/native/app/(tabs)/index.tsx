import { Container } from "@/components/container";
import { View } from "react-native";
import { Card } from "heroui-native";

export default function Dashboard() {
  return (
    <Container className="p-6">
      <View className="flex-1 items-center justify-center">
        <Card variant="secondary" className="items-center p-8">
          <Card.Title className="mb-2 text-3xl">Dashboard</Card.Title>
        </Card>
      </View>
    </Container>
  );
}