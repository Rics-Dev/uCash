import React from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppTheme } from '../contexts/app-theme-context';

// Define the size of the button based on a portion of the screen width
const BUTTON_SIZE = Dimensions.get('window').width * 0.18;

// Define the component for the stylish button
const NeumorphicButton: React.FC = () => {
  // const { isDark, toggleTheme } = useAppTheme();

  return (
    // The main container for the button
    <View>
      <TouchableOpacity
        className="items-center justify-center bg-[#F7F7F7] dark:bg-neutral-800 shadow-lg shadow-black/20 dark:shadow-black/50 border border-white dark:border-neutral-700"
        style={{
          width: BUTTON_SIZE,
          height: BUTTON_SIZE,
          borderRadius: BUTTON_SIZE / 2,
          // Elevation for Android
          elevation: 10,
        }}
        // onPress={toggleTheme}
        activeOpacity={0.7} // Visual feedback on press
      >
        <Feather 
          // name={isDark ? "moon" : "sun"} 
          size={BUTTON_SIZE * 0.4} 
          // color={isDark ? "#FFF" : "#000"} 
        />
      </TouchableOpacity>
    </View>
  );
};

export default NeumorphicButton;