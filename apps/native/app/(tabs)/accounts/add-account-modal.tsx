import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useColorScheme,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  Layout,
  ZoomIn,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ACCOUNT_TYPES = [
  { id: "checking", label: "Checking", icon: "wallet-outline", description: "Daily-use bank account" },
  { id: "savings", label: "Savings", icon: "trending-up-outline", description: "Money set aside with interest" },
  { id: "credit", label: "Credit Card", icon: "card-outline", description: "Revolving line of credit" },
  { id: "cash", label: "Cash", icon: "cash-outline", description: "Physical cash you hold" },
] as const;

const COLORS = [
  "#00A86B", "#2196F3", "#9C27B0", "#FF6B6B", "#F59E0B",
  "#10B981", "#8B5CF6", "#EC4899", "#06B6D4", "#6366F1",
];

const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "DZD", symbol: "د.ج", name: "Algerian Dinar" },
];

const ICONS = [
  "wallet-outline",
  "card-outline",
  "cash-outline",
  "trending-up-outline",
  "bar-chart-outline",
  "pie-chart-outline",
  "briefcase-outline",
  "home-outline",
  "car-outline",
  "airplane-outline",
  "restaurant-outline",
  "gift-outline",
  "heart-outline",
  "star-outline",
  "diamond-outline",
  "shield-outline",
  "trophy-outline",
  "rocket-outline",
] as const;

export default function AddAccountModal() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedIcon, setSelectedIcon] = useState<string>(ICONS[0]);
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [showAccountTypePicker, setShowAccountTypePicker] = useState(false);
  
  // Checking/Savings specific
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [includeInNetWorth, setIncludeInNetWorth] = useState(true);
  
  // Credit Card specific
  const [creditLimit, setCreditLimit] = useState("");
  const [billingCycleDay, setBillingCycleDay] = useState("");

  const handleSave = () => {
    const baseData = {
      accountName,
      accountType,
      selectedColor,
      selectedIcon,
      balance,
      currency,
      includeInNetWorth,
    };

    const typeSpecificData: any = {};

    switch (accountType) {
      case "checking":
      case "savings":
        typeSpecificData.bankName = bankName;
        typeSpecificData.accountNumber = accountNumber;
        break;
      case "credit":
        typeSpecificData.creditLimit = creditLimit;
        typeSpecificData.billingCycleDay = billingCycleDay;
        break;
      case "cash":
        typeSpecificData.location = location;
        break;
    }

    console.log({ ...baseData, ...typeSpecificData });
    router.back();
  };

  const isFormValid = accountName.trim() && accountType && balance;

  return (
    <View className="flex-1 bg-neutral-50 dark:bg-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <Animated.View
          entering={FadeInDown.duration(400)}
          style={{
            paddingTop: Platform.OS === "android" ? insets.top : 0,
          }}
          className="border-b border-neutral-200 dark:border-neutral-800"
        >
          <View className="overflow-hidden">
            <BlurView
              intensity={isDark ? 80 : 90}
              tint={isDark ? "dark" : "light"}
              className="px-4 py-4"
            >
              <View className="flex-row items-center justify-between">
                <Pressable
                  onPress={() => router.back()}
                  hitSlop={10}
                  className="active:opacity-50"
                >
                  <Ionicons
                    name="close"
                    size={28}
                    color={isDark ? "#fff" : "#000"}
                  />
                </Pressable>
                <Text className="font-bold text-xl text-neutral-900 dark:text-white">
                  Add Account
                </Text>
                <Pressable
                  onPress={handleSave}
                  disabled={!isFormValid}
                  hitSlop={10}
                  className="active:opacity-50"
                >
                  <Text
                    className={`font-semibold text-base ${
                      isFormValid
                        ? "text-[#00A86B]"
                        : "text-neutral-400 dark:text-neutral-600"
                    }`}
                  >
                    Save
                  </Text>
                </Pressable>
              </View>
            </BlurView>
          </View>
        </Animated.View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            padding: 16,
            paddingBottom: insets.bottom + 16,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Account Name */}
          <Animated.View
            entering={FadeInUp.delay(100).duration(400)}
            layout={Layout.springify()}
            className="mb-4"
          >
            <Text className="mb-2 font-medium text-neutral-700 text-sm dark:text-neutral-300">
              Account Name *
            </Text>
            <View className="overflow-hidden rounded-2xl border border-neutral-200 bg-white/50 dark:border-neutral-800 dark:bg-transparent">
              <BlurView
                intensity={80}
                tint={isDark ? "dark" : "light"}
                className="p-4"
              >
                <TextInput
                  value={accountName}
                  onChangeText={setAccountName}
                  placeholder="e.g., Chase Checking"
                  placeholderTextColor={
                    isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"
                  }
                  className="font-medium text-base text-neutral-900 dark:text-white"
                />
              </BlurView>
            </View>
          </Animated.View>

          {/* Account Type */}
          <Animated.View
            entering={FadeInUp.delay(150).duration(400)}
            className="mb-4"
          >
            <Text className="mb-2 font-medium text-neutral-700 text-sm dark:text-neutral-300">
              Account Type *
            </Text>
            
            <Pressable
              onPress={() => setShowAccountTypePicker(!showAccountTypePicker)}
              className="active:opacity-70"
            >
              <View className="overflow-hidden rounded-2xl border border-neutral-200 bg-white/50 dark:border-neutral-800 dark:bg-transparent">
                <BlurView
                  intensity={80}
                  tint={isDark ? "dark" : "light"}
                  className="flex-row items-center justify-between p-4"
                >
                  <View className="flex-row items-center gap-3">
                    {accountType ? (
                      <>
                        <View
                          className="h-10 w-10 items-center justify-center rounded-full"
                          style={{ backgroundColor: `${selectedColor}20` }}
                        >
                          <Ionicons
                            name={ACCOUNT_TYPES.find(t => t.id === accountType)?.icon as any}
                            size={20}
                            color={selectedColor}
                          />
                        </View>
                        <View>
                          <Text className="font-medium text-base text-neutral-900 dark:text-white">
                            {ACCOUNT_TYPES.find(t => t.id === accountType)?.label}
                          </Text>
                          <Text className="text-neutral-500 text-xs dark:text-neutral-400">
                            {ACCOUNT_TYPES.find(t => t.id === accountType)?.description}
                          </Text>
                        </View>
                      </>
                    ) : (
                      <Text className="font-medium text-base text-neutral-500 dark:text-neutral-400">
                        Select Account Type
                      </Text>
                    )}
                  </View>
                  <Ionicons
                    name={showAccountTypePicker ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={isDark ? "#fff" : "#000"}
                  />
                </BlurView>
              </View>
            </Pressable>

            {showAccountTypePicker && (
              <Animated.View
                entering={FadeInUp.duration(300)}
                className="mt-2 overflow-hidden rounded-2xl border border-neutral-200 bg-white/50 dark:border-neutral-800 dark:bg-transparent"
              >
                <BlurView
                  intensity={80}
                  tint={isDark ? "dark" : "light"}
                  className="p-2"
                >
                  {ACCOUNT_TYPES.map((type, index) => (
                    <Pressable
                      key={type.id}
                      onPress={() => {
                        setAccountType(type.id);
                        setShowAccountTypePicker(false);
                      }}
                      className="active:opacity-70"
                    >
                      <View
                        className={`flex-row items-center justify-between rounded-xl p-3 ${
                          accountType === type.id
                            ? "bg-[#00A86B]/10"
                            : "bg-transparent"
                        } ${
                          index < ACCOUNT_TYPES.length - 1
                            ? "border-b border-neutral-200 dark:border-neutral-700"
                            : ""
                        }`}
                      >
                        <View className="flex-row items-center gap-3">
                          <View
                            className={`h-10 w-10 items-center justify-center rounded-full ${
                              accountType === type.id
                                ? "bg-[#00A86B]"
                                : "bg-neutral-100 dark:bg-neutral-800"
                            }`}
                          >
                            <Ionicons
                              name={type.icon as any}
                              size={20}
                              color={
                                accountType === type.id
                                  ? "#fff"
                                  : isDark
                                    ? "#fff"
                                    : "#000"
                              }
                            />
                          </View>
                          <View>
                            <Text
                              className={`font-medium text-base ${
                                accountType === type.id
                                  ? "text-[#00A86B]"
                                  : "text-neutral-900 dark:text-white"
                              }`}
                            >
                              {type.label}
                            </Text>
                            <Text className="text-neutral-500 text-xs dark:text-neutral-400">
                              {type.description}
                            </Text>
                          </View>
                        </View>
                        {accountType === type.id && (
                          <Ionicons name="checkmark-circle" size={20} color="#00A86B" />
                        )}
                      </View>
                    </Pressable>
                  ))}
                </BlurView>
              </Animated.View>
            )}
          </Animated.View>

          {/* Color Selection */}
          <Animated.View
            entering={FadeInUp.delay(200).duration(400)}
            className="mb-4"
          >
            <Text className="mb-2 font-medium text-neutral-700 text-sm dark:text-neutral-300">
              Color
            </Text>
            <View className="flex-row flex-wrap gap-3">
              {COLORS.map((color) => (
                <Pressable
                  key={color}
                  onPress={() => setSelectedColor(color)}
                >
                  <Animated.View
                    layout={Layout.springify()}
                    className={`h-12 w-12 items-center justify-center rounded-full border-2 ${
                      selectedColor === color
                        ? "border-neutral-900 dark:border-white scale-110"
                        : "border-transparent"
                    }`}
                  >
                    <View
                      style={{ backgroundColor: color }}
                      className="h-10 w-10 rounded-full shadow-sm"
                    />
                    {selectedColor === color && (
                      <Animated.View 
                        entering={ZoomIn}
                        className="absolute bg-white/20 rounded-full h-4 w-4"
                      />
                    )}
                  </Animated.View>
                </Pressable>
              ))}
            </View>
          </Animated.View>

          {/* Icon Selection */}
          <Animated.View
            entering={FadeInUp.delay(225).duration(400)}
            className="mb-4"
          >
            <Text className="mb-2 font-medium text-neutral-700 text-sm dark:text-neutral-300">
              Icon
            </Text>
            <Pressable
              onPress={() => setShowIconPicker(!showIconPicker)}
              className="active:opacity-70"
            >
              <View className="overflow-hidden rounded-2xl border border-neutral-200 bg-white/50 dark:border-neutral-800 dark:bg-transparent">
                <BlurView
                  intensity={80}
                  tint={isDark ? "dark" : "light"}
                  className="flex-row items-center justify-between p-4"
                >
                  <View className="flex-row items-center gap-3">
                    <View
                      style={{ backgroundColor: `${selectedColor}20` }}
                      className="h-10 w-10 items-center justify-center rounded-full"
                    >
                      <Ionicons
                        name={selectedIcon as any}
                        size={20}
                        color={selectedColor}
                      />
                    </View>
                    <Text className="font-medium text-base text-neutral-900 dark:text-white">
                      Selected Icon
                    </Text>
                  </View>
                  <Ionicons
                    name={showIconPicker ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={isDark ? "#fff" : "#000"}
                  />
                </BlurView>
              </View>
            </Pressable>

            {showIconPicker && (
              <Animated.View
                entering={FadeInUp.duration(300)}
                className="mt-2 overflow-hidden rounded-2xl border border-neutral-200 bg-white/50 dark:border-neutral-800 dark:bg-transparent"
              >
                <BlurView
                  intensity={80}
                  tint={isDark ? "dark" : "light"}
                  className="p-4"
                >
                  <View className="flex-row flex-wrap gap-3 justify-center">
                    {ICONS.map((icon) => (
                      <Pressable
                        key={icon}
                        onPress={() => {
                          setSelectedIcon(icon);
                          setShowIconPicker(false);
                        }}
                        className="active:scale-90"
                      >
                        <View
                          className={`h-12 w-12 items-center justify-center rounded-xl border-2 ${
                            selectedIcon === icon
                              ? `border-${selectedColor}`
                              : "border-neutral-200 dark:border-neutral-700"
                          }`}
                          style={selectedIcon === icon ? { borderColor: selectedColor } : {}}
                        >
                          <Ionicons
                            name={icon as any}
                            size={24}
                            color={
                              selectedIcon === icon
                                ? selectedColor
                                : isDark
                                  ? "#fff"
                                  : "#000"
                            }
                          />
                        </View>
                      </Pressable>
                    ))}
                  </View>
                </BlurView>
              </Animated.View>
            )}
          </Animated.View>

          {/* Initial Balance */}
          <Animated.View
            entering={FadeInUp.delay(250).duration(400)}
            layout={Layout.springify()}
            className="mb-4"
          >
            <Text className="mb-2 font-medium text-neutral-700 text-sm dark:text-neutral-300">
              Initial Balance *
            </Text>
            <View className="overflow-hidden rounded-2xl border border-neutral-200 bg-white/50 dark:border-neutral-800 dark:bg-transparent">
              <BlurView
                intensity={80}
                tint={isDark ? "dark" : "light"}
                className="flex-row items-center p-4"
              >
                <Text className="mr-2 font-medium text-lg text-neutral-900 dark:text-white">
                  {currency.symbol}
                </Text>
                <TextInput
                  value={balance}
                  onChangeText={setBalance}
                  placeholder="0.00"
                  placeholderTextColor={
                    isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"
                  }
                  keyboardType="decimal-pad"
                  className="flex-1 font-medium text-base text-neutral-900 dark:text-white"
                />
                <Pressable
                  onPress={() => setShowCurrencyPicker(!showCurrencyPicker)}
                  className="active:opacity-50"
                  hitSlop={10}
                >
                  <View className="flex-row items-center gap-1">
                    <Text className="font-medium text-sm text-[#00A86B]">
                      {currency.code}
                    </Text>
                    <Ionicons
                      name={showCurrencyPicker ? "chevron-up" : "chevron-down"}
                      size={16}
                      color="#00A86B"
                    />
                  </View>
                </Pressable>
              </BlurView>
            </View>
          </Animated.View>

          {/* Currency Picker */}
          {showCurrencyPicker && (
            <Animated.View
              entering={FadeInUp.duration(300)}
              className="mb-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white/50 dark:border-neutral-800 dark:bg-transparent"
            >
              <BlurView
                intensity={80}
                tint={isDark ? "dark" : "light"}
                className="p-2"
              >
                {CURRENCIES.map((curr, index) => (
                  <Pressable
                    key={curr.code}
                    onPress={() => {
                      setCurrency(curr);
                      setShowCurrencyPicker(false);
                    }}
                    className="active:opacity-70"
                  >
                    <View
                      className={`flex-row items-center justify-between rounded-xl p-3 ${
                        currency.code === curr.code
                          ? "bg-[#00A86B]/10"
                          : "bg-transparent"
                      } ${
                        index < CURRENCIES.length - 1
                          ? "border-b border-neutral-200 dark:border-neutral-700"
                          : ""
                      }`}
                    >
                      <View className="flex-row items-center gap-3">
                        <Text className="font-medium text-lg text-neutral-900 dark:text-white">
                          {curr.symbol}
                        </Text>
                        <View>
                          <Text className="font-medium text-base text-neutral-900 dark:text-white">
                            {curr.code}
                          </Text>
                          <Text className="text-neutral-500 text-xs dark:text-neutral-400">
                            {curr.name}
                          </Text>
                        </View>
                      </View>
                      {currency.code === curr.code && (
                        <Ionicons name="checkmark-circle" size={20} color="#00A86B" />
                      )}
                    </View>
                  </Pressable>
                ))}
              </BlurView>
            </Animated.View>
          )}

          {/* Type-Specific Fields */}
          
          {/* Checking/Savings: Bank Name */}
          {(accountType === "checking" || accountType === "savings") && (
            <>
              <Animated.View
                entering={FadeInUp.delay(300).duration(400)}
                className="mb-4"
              >
                <Text className="mb-2 font-medium text-neutral-700 text-sm dark:text-neutral-300">
                  Bank Name (Optional)
                </Text>
                <View className="overflow-hidden rounded-2xl border border-neutral-200 bg-white/50 dark:border-neutral-800 dark:bg-transparent">
                  <BlurView
                    intensity={80}
                    tint={isDark ? "dark" : "light"}
                    className="p-4"
                  >
                    <TextInput
                      value={bankName}
                      onChangeText={setBankName}
                      placeholder="e.g., Chase, Bank of America"
                      placeholderTextColor={
                        isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"
                      }
                      className="font-medium text-base text-neutral-900 dark:text-white"
                    />
                  </BlurView>
                </View>
              </Animated.View>

              <Animated.View
                entering={FadeInUp.delay(320).duration(400)}
                className="mb-4"
              >
                <Text className="mb-2 font-medium text-neutral-700 text-sm dark:text-neutral-300">
                  Account Number (Optional)
                </Text>
                <View className="overflow-hidden rounded-2xl border border-neutral-200 bg-white/50 dark:border-neutral-800 dark:bg-transparent">
                  <BlurView
                    intensity={80}
                    tint={isDark ? "dark" : "light"}
                    className="p-4"
                  >
                    <TextInput
                      value={accountNumber}
                      onChangeText={setAccountNumber}
                      placeholderTextColor={
                        isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"
                      }
                      keyboardType="number-pad"
                      className="font-medium text-base text-neutral-900 dark:text-white"
                    />
                  </BlurView>
                </View>
              </Animated.View>
            </>
          )}

          {/* Credit Card Specific Fields */}
          {accountType === "credit" && (
            <>
              <Animated.View
                entering={FadeInUp.delay(300).duration(400)}
                className="mb-4"
              >
                <Text className="mb-2 font-medium text-neutral-700 text-sm dark:text-neutral-300">
                  Credit Limit *
                </Text>
                <View className="overflow-hidden rounded-2xl border border-neutral-200 bg-white/50 dark:border-neutral-800 dark:bg-transparent">
                  <BlurView
                    intensity={80}
                    tint={isDark ? "dark" : "light"}
                    className="flex-row items-center p-4"
                  >
                    <Text className="mr-2 font-medium text-lg text-neutral-900 dark:text-white">
                      {currency.symbol}
                    </Text>
                    <TextInput
                      value={creditLimit}
                      onChangeText={setCreditLimit}
                      placeholder="10,000"
                      placeholderTextColor={
                        isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"
                      }
                      keyboardType="decimal-pad"
                      className="flex-1 font-medium text-base text-neutral-900 dark:text-white"
                    />
                  </BlurView>
                </View>
              </Animated.View>

              <Animated.View
                entering={FadeInUp.delay(320).duration(400)}
                className="mb-4"
              >
                <Text className="mb-2 font-medium text-neutral-700 text-sm dark:text-neutral-300">
                  Billing Cycle Day *
                </Text>
                <View className="overflow-hidden rounded-2xl border border-neutral-200 bg-white/50 dark:border-neutral-800 dark:bg-transparent">
                  <BlurView
                    intensity={80}
                    tint={isDark ? "dark" : "light"}
                    className="p-4"
                  >
                    <TextInput
                      value={billingCycleDay}
                      onChangeText={setBillingCycleDay}
                      placeholder="Day of month (1-31)"
                      placeholderTextColor={
                        isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"
                      }
                      keyboardType="number-pad"
                      className="font-medium text-base text-neutral-900 dark:text-white"
                    />
                  </BlurView>
                </View>
              </Animated.View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}