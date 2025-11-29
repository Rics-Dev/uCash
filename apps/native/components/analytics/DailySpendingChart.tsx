import { View, Text } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { BlurView } from "expo-blur";
import { useAppTheme } from "@/contexts/app-theme-context";

export const DailySpendingChart = () => {
  const { isDark } = useAppTheme();

  const data = [
    { value: 50, label: '1' },
    { value: 80, label: '5' },
    { value: 90, label: '10' },
    { value: 70, label: '15' },
    { value: 200, label: '20' }, // Spike
    { value: 100, label: '25' },
    { value: 120, label: '30' },
  ];

  return (
    <View className="px-4 mb-8">
      <BlurView
        intensity={isDark ? 60 : 40}
        tint={isDark ? "dark" : "light"}
        className="p-4 rounded-3xl overflow-hidden border"
        style={{
            borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
            backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.4)",
        }}
      >
        <Text className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
            Daily Activity
        </Text>
        <LineChart
          data={data}
          areaChart
          curved
          color1="#8B5CF6"
          startFillColor1="#8B5CF6"
          endFillColor1="#8B5CF6"
          startOpacity={0.4}
          endOpacity={0.1}
          spacing={40}
          initialSpacing={10}
          noOfSections={3}
          yAxisThickness={0}
          xAxisThickness={0}
          yAxisTextStyle={{ color: isDark ? '#9CA3AF' : '#6B7280' }}
          xAxisLabelTextStyle={{ color: isDark ? '#9CA3AF' : '#6B7280' }}
          hideRules
          hideDataPoints
          height={150}
          width={280}
          isAnimated
          pointerConfig={{
            pointerStripHeight: 160,
            pointerStripColor: isDark ? 'white' : 'black',
            pointerStripWidth: 2,
            pointerColor: isDark ? 'white' : 'black',
            radius: 6,
            pointerLabelWidth: 100,
            pointerLabelHeight: 90,
            activatePointersOnLongPress: false,
            autoAdjustPointerLabelPosition: false,
            pointerLabelComponent: (items: any) => {
              return (
                <View
                  style={{
                    height: 90,
                    width: 100,
                    justifyContent: 'center',
                    marginTop: -30,
                    marginLeft: -40,
                  }}>
                  <Text style={{color: isDark ? 'white' : 'black', fontSize: 14, marginBottom:6, textAlign:'center'}}>
                    {items[0].date}
                  </Text>

                  <View style={{paddingHorizontal:14,paddingVertical:6, borderRadius:16, backgroundColor:'white'}}>
                    <Text style={{fontWeight: 'bold',textAlign:'center'}}>
                      {'$' + items[0].value + '.0'}
                    </Text>
                  </View>
                </View>
              );
            },
          }}
        />
      </BlurView>
    </View>
  );
};
