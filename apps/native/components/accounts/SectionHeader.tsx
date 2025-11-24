import { Text, View } from "react-native";

type SectionHeaderProps = {
  title: string;
};

export const SectionHeader = ({ title }: SectionHeaderProps) => (
  <View className="pt-6 pb-2">
    <Text className="font-semibold text-neutral-500 text-xs uppercase tracking-wider">
      {title}
    </Text>
  </View>
);
