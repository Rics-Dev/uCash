import { View, ScrollView } from "react-native";
import { Container } from "@/components/container";
import { useState } from "react";
import { AnalyticsHeader, Period } from "@/components/analytics/AnalyticsHeader";
import { DonutChart, ChartData } from "@/components/analytics/DonutChart";
import { CashFlowBar } from "@/components/analytics/CashFlowBar";
import { CategoryRankingList, CategoryItem } from "@/components/analytics/CategoryRankingList";
import { SpendingTrendChart } from "@/components/analytics/SpendingTrendChart";
import { DailySpendingChart } from "@/components/analytics/DailySpendingChart";

export default function Analytics() {
  const [period, setPeriod] = useState<Period>('month');
  const [date, setDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Mock Data Calculation
  const totalSpent = 2450;
  const income = 3200;
  
  const chartData: ChartData[] = [
    { value: 600, color: '#EF4444', text: '25%', category: 'Dining' }, // Red
    { value: 450, color: '#F59E0B', text: '18%', category: 'Groceries' }, // Amber
    { value: 300, color: '#3B82F6', text: '12%', category: 'Transport' }, // Blue
    { value: 200, color: '#10B981', text: '8%', category: 'Shopping' }, // Emerald
    { value: 150, color: '#8B5CF6', text: '6%', category: 'Entertainment' }, // Violet
    { value: 750, color: '#9CA3AF', text: '31%', category: 'Others' }, // Gray
  ];

  const categories: CategoryItem[] = [
    { 
        id: '1', 
        name: 'Dining', 
        amount: 600, 
        percentage: 25, 
        color: '#EF4444', 
        icon: 'restaurant-outline',
        trend: { diff: 100, average: 500 }
    },
    { 
        id: '2', 
        name: 'Groceries', 
        amount: 450, 
        percentage: 18, 
        color: '#F59E0B', 
        icon: 'cart-outline',
        trend: { diff: -50, average: 500 }
    },
    { 
        id: '3', 
        name: 'Transport', 
        amount: 300, 
        percentage: 12, 
        color: '#3B82F6', 
        icon: 'car-outline',
        trend: { diff: 20, average: 280 }
    },
    { 
        id: '4', 
        name: 'Shopping', 
        amount: 200, 
        percentage: 8, 
        color: '#10B981', 
        icon: 'bag-outline',
        trend: { diff: 0, average: 200 }
    },
    { 
        id: '5', 
        name: 'Entertainment', 
        amount: 150, 
        percentage: 6, 
        color: '#8B5CF6', 
        icon: 'film-outline',
        trend: { diff: -30, average: 180 }
    },
    { 
        id: '6', 
        name: 'Others', 
        amount: 750, 
        percentage: 31, 
        color: '#9CA3AF', 
        icon: 'ellipsis-horizontal',
        trend: { diff: 50, average: 700 }
    },
  ];

  const filteredCategories = selectedCategory 
    ? categories.filter(c => c.name === selectedCategory)
    : categories;

  return (
    <Container className="bg-white dark:bg-black" scrollable={false}>
      <View className="flex-1">
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
            <View className="px-4 pt-4">
                <AnalyticsHeader 
                    period={period} 
                    onPeriodChange={setPeriod}
                    date={date}
                    onDateChange={setDate}
                />
            </View>

            <DonutChart 
                data={chartData} 
                totalSpent={totalSpent}
                onSlicePress={setSelectedCategory}
            />

            <CashFlowBar income={income} expense={totalSpent} />

            <DailySpendingChart />

            <SpendingTrendChart />

            <CategoryRankingList categories={filteredCategories} />
        </ScrollView>
      </View>
    </Container>
  );
}
