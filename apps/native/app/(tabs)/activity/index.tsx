import { useState } from "react";
import { View } from "react-native";
import { Container } from "@/components/container";
import { ActivityHeader } from "@/components/activity/ActivityHeader";
import { TransactionList } from "@/components/activity/TransactionList";
import { TransactionDetailModal } from "@/components/activity/TransactionDetailModal";
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

export default function Activity() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Mock Data
  const sections = [
    {
      title: "Today",
      total: -149.40,
      data: [
        {
          id: "1",
          title: "Whole Foods Market",
          subtitle: "Groceries • Chase Sapphire",
          amount: -124.50,
          icon: "cart-outline" as const,
          date: "Today",
          status: "completed" as const,
        },
        {
          id: "2",
          title: "Uber",
          subtitle: "Transport • Amex Gold",
          amount: -24.90,
          icon: "car-outline" as const,
          date: "Today",
          status: "pending" as const,
        },
      ],
    },
    {
      title: "Yesterday",
      total: 4234.01,
      data: [
        {
          id: "3",
          title: "Salary Deposit",
          subtitle: "Income • Checking",
          amount: 4250.00,
          icon: "cash-outline" as const,
          date: "Yesterday",
          status: "completed" as const,
        },
        {
          id: "4",
          title: "Netflix Subscription",
          subtitle: "Entertainment • Chase Sapphire",
          amount: -15.99,
          icon: "film-outline" as const,
          date: "Yesterday",
          status: "recurring" as const,
        },
      ],
    },
    {
      title: "November 24",
      total: -45.20,
      data: [
        {
          id: "5",
          title: "Starbucks",
          subtitle: "Dining • Cash",
          amount: -5.20,
          icon: "cafe-outline" as const,
          date: "Nov 24",
          status: "completed" as const,
        },
        {
          id: "6",
          title: "Target",
          subtitle: "Shopping • Chase Sapphire",
          amount: -40.00,
          icon: "pricetag-outline" as const,
          date: "Nov 24",
          status: "completed" as const,
        },
      ],
    },
  ];

  const handleTransactionPress = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalVisible(true);
  };

  const handleEdit = (transaction: Transaction) => {
    // Implement edit logic
    console.log("Edit", transaction.id);
  };

  const handleDelete = (transaction: Transaction) => {
    // Implement delete logic
    console.log("Delete", transaction.id);
  };

  return (
    <Container className="bg-neutral-50 dark:bg-black" scrollable={false}>
      <ActivityHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedFilter={selectedFilter}
        onFilterSelect={(filter) => setSelectedFilter(selectedFilter === filter ? null : filter)}
      />
      
      <TransactionList
        sections={sections}
        onTransactionPress={handleTransactionPress}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TransactionDetailModal
        visible={isModalVisible}
        transaction={selectedTransaction}
        onClose={() => setIsModalVisible(false)}
      />
    </Container>
  );
}

