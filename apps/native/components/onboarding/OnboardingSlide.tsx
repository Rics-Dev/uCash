import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/contexts/app-theme-context';

const { width } = Dimensions.get('window');

interface OnboardingSlideProps {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  index: number;
}

export const OnboardingSlide: React.FC<OnboardingSlideProps> = ({ title, description, icon, index }) => {
  const { isDark } = useAppTheme();

  return (
    <View style={{ width, flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>
      <Animated.View 
        entering={FadeInUp.delay(index * 200).springify()}
        className="mb-12 items-center justify-center"
      >
        <View className={`w-40 h-40 rounded-full items-center justify-center mb-8 relative overflow-hidden ${isDark ? 'bg-white/10' : 'bg-black/5'}`}>
             <LinearGradient
                colors={isDark ? ['rgba(59, 130, 246, 0.3)', 'rgba(147, 51, 234, 0.3)'] : ['rgba(59, 130, 246, 0.1)', 'rgba(147, 51, 234, 0.1)']}
                style={{ position: 'absolute', width: '100%', height: '100%' }}
              />
            <Ionicons name={icon} size={64} color={isDark ? "#60a5fa" : "#3b82f6"} />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(index * 300 + 200).springify()} className="items-center">
        <Text className={`text-3xl font-bold text-center mb-4 leading-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
          {title}
        </Text>
        <Text className={`text-lg text-center leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
          {description}
        </Text>
      </Animated.View>
    </View>
  );
};
