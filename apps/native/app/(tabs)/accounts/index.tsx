import { Card } from "heroui-native";
import { View } from "react-native";
import { Container } from "@/components/container";

export default function Accounts() {
  const items = Array.from({ length: 20 }, (_, i) => ({
    id: `item-${i + 1}`,
    title: `Item ${i + 1}`,
  }));

  return (
    <Container className="p-6">
      {items.map((item) => (
        <View className="mb-4 items-center" key={item.id}>
          <Card className="w-full items-center p-6" variant="secondary">
            <Card.Title className="text-xl">{item.title}</Card.Title>
          </Card>
        </View>
      ))}
    </Container>
  );
}
