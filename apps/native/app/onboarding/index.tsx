import React, { useState, useRef } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Text, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { OnboardingSlide } from '@/components/onboarding/OnboardingSlide';
import { useAppTheme } from '@/contexts/app-theme-context';
import { GlassButton } from '@/components/GlassButton';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { Container } from '@/components/container';
import { useOnboardingStore } from '@/stores/onboarding-store';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const progress = useSharedValue(0);
  const { isDark } = useAppTheme();
      const { completeOnboarding } = useOnboardingStore();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
    progress.value = withSpring(index);
  };

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      completeOnboarding();
      router.replace('/(tabs)');
    }
  };


  return (
    <Container className="bg-neutral-50 dark:bg-black">
      <View className="flex-1">

        <View className="p-8">
          <View className="flex-row justify-center mb-8 space-x-2 gap-2">
          </View>

          <GlassButton
            variant="text"
            text={currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
            onPress={handleNext}
            size="lg"
            solid
            className="w-full bg-blue-600"
          />
        </View>
      </View>
    </Container>
  );
}
