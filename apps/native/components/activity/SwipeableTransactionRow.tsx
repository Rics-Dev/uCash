import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/contexts/app-theme-context';
import Reanimated, { useAnimatedStyle, useSharedValue, withSpring, withTiming, runOnJS } from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

type Transaction = {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  icon: keyof typeof Ionicons.glyphMap;
  date: string;
  status?: 'pending' | 'recurring' | 'completed';
};

type SwipeableTransactionRowProps = {
  transaction: Transaction;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const ACTION_WIDTH = 80;

export const SwipeableTransactionRow = ({ transaction, onPress, onEdit, onDelete }: SwipeableTransactionRowProps) => {
  const { isDark } = useAppTheme();
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(72); // Approximate height
  
  const isPositive = transaction.amount > 0;
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(transaction.amount));

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      if (translateX.value > ACTION_WIDTH / 2) {
        // Swipe Right (Edit)
        translateX.value = withSpring(ACTION_WIDTH);
      } else if (translateX.value < -ACTION_WIDTH / 2) {
        // Swipe Left (Delete)
        translateX.value = withSpring(-ACTION_WIDTH);
      } else {
        translateX.value = withSpring(0);
      }
    });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const rIconLeftStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value > 0 ? 1 : 0);
    return { opacity };
  });

  const rIconRightStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < 0 ? 1 : 0);
    return { opacity };
  });

  const handleEditPress = () => {
    runOnJS(onEdit)();
    translateX.value = withSpring(0);
  };

  const handleDeletePress = () => {
    runOnJS(onDelete)();
    translateX.value = withSpring(0);
  };

  return (
    <View className="relative bg-neutral-50 dark:bg-black overflow-hidden">
      {/* Background Actions */}
      <View className="absolute inset-0 flex-row justify-between items-center">
        {/* Left Action (Edit) */}
        <TouchableOpacity 
          className="h-full w-[80px] bg-blue-500 items-center justify-center"
          onPress={handleEditPress}
        >
          <Reanimated.View style={rIconLeftStyle}>
            <Ionicons name="pencil" size={24} color="white" />
          </Reanimated.View>
        </TouchableOpacity>

        {/* Right Action (Delete) */}
        <TouchableOpacity 
          className="h-full w-[80px] bg-red-500 items-center justify-center"
          style={{ marginLeft: 'auto' }}
          onPress={handleDeletePress}
        >
          <Reanimated.View style={rIconRightStyle}>
            <Ionicons name="trash" size={24} color="white" />
          </Reanimated.View>
        </TouchableOpacity>
      </View>

      {/* Foreground Content */}
      <GestureDetector gesture={panGesture}>
        <Reanimated.View style={[rStyle, { backgroundColor: isDark ? '#000' : '#fafafa' }]}>
          <TouchableOpacity 
            onPress={onPress}
            activeOpacity={0.7}
            className="flex-row items-center px-4 py-4 border-b border-neutral-100 dark:border-neutral-800"
          >
            {/* Visual Anchor */}
            <View className="h-12 w-12 rounded-full bg-neutral-100 dark:bg-neutral-800/50 items-center justify-center mr-4">
              <Ionicons name={transaction.icon} size={24} color={isDark ? "#d4d4d4" : "#404040"} />
            </View>
            
            {/* Primary Text & Context */}
            <View className="flex-1 pr-4">
              <Text className="font-bold text-neutral-900 dark:text-white text-[17px] mb-0.5" numberOfLines={1}>
                {transaction.title}
              </Text>
              <Text className="text-[13px] text-neutral-500 dark:text-neutral-400 font-medium" numberOfLines={1}>
                {transaction.subtitle}
              </Text>
            </View>

            {/* Amount & Status */}
            <View className="items-end">
              <Text className={`font-bold text-[17px] ${isPositive ? "text-green-600 dark:text-green-400" : "text-neutral-900 dark:text-white"}`}>
                {isPositive ? "+" : ""}{formattedAmount}
              </Text>
              {transaction.status === 'pending' && (
                <View className="flex-row items-center mt-1 bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded-md">
                  <Ionicons name="time-outline" size={10} color={isDark ? "#a3a3a3" : "#737373"} />
                  <Text className="text-[10px] text-neutral-500 dark:text-neutral-400 ml-1 font-medium uppercase tracking-wider">Pending</Text>
                </View>
              )}
              {transaction.status === 'recurring' && (
                <View className="mt-1">
                  <Ionicons name="repeat" size={14} color={isDark ? "#737373" : "#a3a3a3"} />
                </View>
              )}
            </View>
          </TouchableOpacity>
        </Reanimated.View>
      </GestureDetector>
    </View>
  );
};
