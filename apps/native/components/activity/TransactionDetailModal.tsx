import { Modal, View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useAppTheme } from "@/contexts/app-theme-context";
import { GlassButton } from "@/components/GlassButton";

type Transaction = {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  icon: keyof typeof Ionicons.glyphMap;
  date: string;
  status?: 'pending' | 'recurring' | 'completed';
};

type TransactionDetailModalProps = {
  visible: boolean;
  transaction: Transaction | null;
  onClose: () => void;
};

export const TransactionDetailModal = ({ visible, transaction, onClose }: TransactionDetailModalProps) => {
  const { isDark } = useAppTheme();

  if (!transaction) return null;

  const isPositive = transaction.amount > 0;
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(transaction.amount));

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white dark:bg-neutral-900 rounded-t-3xl h-[85%] overflow-hidden">
          {/* Header */}
          <View className="flex-row justify-between items-center p-4 border-b border-neutral-100 dark:border-neutral-800">
            <GlassButton variant="icon" icon="close" onPress={onClose} size="sm" />
            <Text className="font-bold text-lg text-neutral-900 dark:text-white">
              Transaction Details
            </Text>
            <GlassButton variant="icon" icon="share-outline" onPress={() => {}} size="sm" />
          </View>

          <ScrollView className="flex-1 p-6">
            {/* Map Placeholder */}
            <View className="h-48 bg-neutral-100 dark:bg-neutral-800 rounded-2xl mb-6 items-center justify-center">
              <Ionicons name="map" size={48} color={isDark ? "#525252" : "#a3a3a3"} />
              <Text className="text-neutral-500 dark:text-neutral-400 mt-2">Map View</Text>
            </View>

            {/* Amount & Title */}
            <View className="items-center mb-8">
              <View className="h-16 w-16 rounded-full bg-neutral-100 dark:bg-neutral-800 items-center justify-center mb-4">
                <Ionicons name={transaction.icon} size={32} color={isDark ? "#a3a3a3" : "#525252"} />
              </View>
              <Text className="text-3xl font-bold text-neutral-900 dark:text-white mb-1">
                {isPositive ? "+" : "-"}{formattedAmount}
              </Text>
              <Text className="text-lg text-neutral-500 dark:text-neutral-400">
                {transaction.title}
              </Text>
            </View>

            {/* Details Grid */}
            <View className="bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl p-4 mb-6">
              <View className="flex-row justify-between py-3 border-b border-neutral-200 dark:border-neutral-700">
                <Text className="text-neutral-500 dark:text-neutral-400">Status</Text>
                <Text className="font-medium text-neutral-900 dark:text-white capitalize">
                  {transaction.status || 'Completed'}
                </Text>
              </View>
              <View className="flex-row justify-between py-3 border-b border-neutral-200 dark:border-neutral-700">
                <Text className="text-neutral-500 dark:text-neutral-400">Date</Text>
                <Text className="font-medium text-neutral-900 dark:text-white">
                  {transaction.date}, 10:42 AM
                </Text>
              </View>
              <View className="flex-row justify-between py-3">
                <Text className="text-neutral-500 dark:text-neutral-400">Category</Text>
                <Text className="font-medium text-neutral-900 dark:text-white">
                  {transaction.subtitle.split(' • ')[0]}
                </Text>
              </View>
            </View>

            {/* Notes */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2 ml-1">
                Notes
              </Text>
              <TextInput
                className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-4 text-neutral-900 dark:text-white min-h-[100px]"
                placeholder="Add a note..."
                placeholderTextColor={isDark ? "#525252" : "#a3a3a3"}
                multiline
                textAlignVertical="top"
              />
            </View>

            {/* Attachments */}
            <TouchableOpacity className="flex-row items-center justify-center p-4 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 mb-8">
              <Ionicons name="camera-outline" size={24} color={isDark ? "#a3a3a3" : "#737373"} />
              <Text className="ml-2 font-medium text-neutral-600 dark:text-neutral-400">
                Add Receipt Photo
              </Text>
            </TouchableOpacity>

            {/* History Insight */}
            <View className="flex-row items-center bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl mb-8">
              <Ionicons name="information-circle" size={24} color="#3b82f6" />
              <Text className="ml-3 flex-1 text-blue-700 dark:text-blue-300 text-sm">
                You have spent $1,200 at {transaction.title} this year.
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
