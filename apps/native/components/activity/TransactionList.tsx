import { SectionList, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { SwipeableTransactionRow } from "./SwipeableTransactionRow";
import { useAppTheme } from "@/contexts/app-theme-context";
import { Ionicons } from "@expo/vector-icons";

type Transaction = {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  icon: keyof typeof Ionicons.glyphMap;
  date: string;
  status?: 'pending' | 'recurring' | 'completed';
};

type Section = {
  title: string;
  total: number;
  data: Transaction[];
};

type TransactionListProps = {
  sections: Section[];
  onTransactionPress: (transaction: Transaction) => void;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
};

export const TransactionList = ({ sections, onTransactionPress, onEdit, onDelete }: TransactionListProps) => {
  const { isDark } = useAppTheme();

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      stickySectionHeadersEnabled
      renderItem={({ item }) => (
        <SwipeableTransactionRow
          transaction={item}
          onPress={() => onTransactionPress(item)}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item)}
        />
      )}
      renderSectionHeader={({ section: { title, total } }) => (
        <BlurView 
          intensity={isDark ? 80 : 80}
          tint={isDark ? "dark" : "light"}
          className="flex-row justify-between items-center px-4 py-3 border-b border-neutral-200/50 dark:border-neutral-800/50"
          style={{
            backgroundColor: isDark ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.8)"
          }}
        >
          <Text className="font-semibold text-neutral-900 dark:text-white text-sm tracking-wide">
            {title}
          </Text>
          <Text className={`font-medium text-sm ${total > 0 ? "text-green-600 dark:text-green-400" : "text-neutral-500 dark:text-neutral-400"}`}>
            {total > 0 ? "+" : ""}{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)}
          </Text>
        </BlurView>
      )}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    />
  );
};
