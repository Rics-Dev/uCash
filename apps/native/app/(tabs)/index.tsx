import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Container } from "@/components/container";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SafeToSpendCard } from "@/components/dashboard/SafeToSpendCard";
import { InsightCard, InsightType } from "@/components/dashboard/InsightCard";
import { QuickActionItem } from "@/components/dashboard/QuickActionItem";
import { TransactionRow } from "@/components/dashboard/TransactionRow";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";

export default function Dashboard() {
  const [isPrivacyMode, setIsPrivacyMode] = useState(false);
  const router = useRouter();

  const togglePrivacy = () => setIsPrivacyMode(!isPrivacyMode);

  // Mock Data
  const insights: { type: InsightType; title: string; description: string }[] = [
    {
      type: "warning",
      title: "Groceries Budget",
      description: "90% Used. $25 remaining.",
    },
    {
      type: "info",
      title: "Rent Bill Due",
      description: "Due in 3 days ($2,000).",
    },
    {
      type: "success",
      title: "Savings Goal",
      description: "You saved $45 more on dining out this week.",
    },
  ];

  const recentActivity = [
    {
      id: "1",
      title: "Whole Foods Market",
      subtitle: "Groceries",
      amount: -124.50,
      icon: "cart-outline" as const,
      date: "Today",
    },
    {
      id: "2",
      title: "Uber",
      subtitle: "Transport",
      amount: -24.90,
      icon: "car-outline" as const,
      date: "Yesterday",
    },
    {
      id: "3",
      title: "Salary Deposit",
      subtitle: "Income",
      amount: 4250.00,
      icon: "cash-outline" as const,
      date: "Nov 25",
    },
    {
      id: "4",
      title: "Netflix Subscription",
      subtitle: "Entertainment",
      amount: -15.99,
      icon: "film-outline" as const,
      date: "Nov 24",
    },
  ];

  return (
    <Container className="bg-neutral-50 dark:bg-black">
        <View className="px-4">
          <DashboardHeader userName="Racim" />
          
          <SafeToSpendCard
            amount={3500}
            remainingThisMonth={500}
            isPrivacyMode={isPrivacyMode}
            onTogglePrivacy={togglePrivacy}
          />
        </View>

        {/* Insights Carousel */}
        <View className="mt-8">
          <Text className="px-4 text-lg font-bold text-neutral-900 dark:text-white mb-4">
            Priority Alerts & Insights
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          >
            {insights.map((insight, index) => (
              <InsightCard
                key={index}
                type={insight.type}
                title={insight.title}
                description={insight.description}
                onPress={() => {}}
              />
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View className="mt-4 px-4">
          <Text className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
            Quick Actions
          </Text>
          <View className="flex-row justify-between">
            <QuickActionItem 
              icon="bar-chart-outline" 
              label="Budgets" 
              onPress={() => {}} 
            />
            <QuickActionItem 
              icon="calculator-outline" 
              label="Goals" 
              onPress={() => {}} 
            />
            <QuickActionItem 
              icon="card-outline" 
              label="Cards" 
              onPress={() => router.push("/(tabs)/accounts")} 
            />
            <QuickActionItem 
              icon="search-outline" 
              label="Search" 
              onPress={() => router.push("/(tabs)/activity")} 
            />
          </View>
        </View>

        {/* Recent Activity */}
        <View className="mt-8 px-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-neutral-900 dark:text-white">
              Recent Activity
            </Text>
            <Link href="/(tabs)/activity" asChild>
              <TouchableOpacity>
                <Text className="text-primary-500 font-medium">View All</Text>
              </TouchableOpacity>
            </Link>
          </View>
          
          <View className="bg-white dark:bg-neutral-900 rounded-3xl p-4 shadow-sm shadow-neutral-100 dark:shadow-none border border-neutral-100 dark:border-neutral-800">
            {recentActivity.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                title={transaction.title}
                subtitle={transaction.subtitle}
                amount={transaction.amount}
                icon={transaction.icon}
                date={transaction.date}
              />
            ))}
            
            <TouchableOpacity 
              className="mt-4 py-2 items-center justify-center border-neutral-100 dark:border-neutral-800"
              onPress={() => router.push("/(tabs)/activity")}
            >
              <View className="flex-row items-center">
                <Text className="text-neutral-500 dark:text-neutral-400 font-medium mr-1">
                  View All Activity
                </Text>
                <Ionicons name="arrow-forward" size={16} color="#737373" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
    </Container>
  );
}