import React, { useState, useRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, FlatList } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Container } from '@/components/container';
import { useAppTheme } from '@/contexts/app-theme-context';
import { useOnboardingStore } from '@/stores/onboarding-store';
import { router } from 'expo-router';
import { GlassButton } from '@/components/GlassButton';

export default function OnboardingScreen() {


  return (
    <>
    </>
  );
}