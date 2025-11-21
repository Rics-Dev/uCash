import { Card } from "heroui-native";
import { ScrollView, View } from "react-native";
import { Container } from "@/components/container";

export default function Explore() {
    const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);
  // return (
  //   <Container className="p-6">
  //     <View className="flex-1 items-center justify-center">
  //       {/** biome-ignore assist/source/useSortedAttributes: <> */}
  //       <Card variant="secondary" className="items-center p-8">
  //         <Card.Title className="mb-2 text-3xl">Explore</Card.Title>
  //       </Card>
  //     </View>
  //   </Container>
  // );

  return (
    <Container className="p-6">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className="flex-1"
      >
        {items.map((item, index) => (
          <View key={index} className="mb-4 items-center">
            <Card variant="secondary" className="w-full items-center p-6">
              <Card.Title className="text-xl">{item}</Card.Title>
            </Card>
          </View>
        ))}
      </ScrollView>
    </Container>
  );
}
