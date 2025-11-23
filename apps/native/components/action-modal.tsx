import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import type React from "react";
import { useCallback, useMemo } from "react";
import { Pressable, Text } from "react-native";
import { useAppTheme } from "@/contexts/app-theme-context";

export type ActionType = "Income" | "Expense" | "Transfer" | null;

type ActionModalProps = {
  type: ActionType;
  onClose?: () => void;
  ref: React.RefObject<BottomSheetModal | null>;
};

export const ActionModal = ({ type, onClose, ref }: ActionModalProps) => {
  const { isDark } = useAppTheme();

  // variables
  const snapPoints = useMemo(() => ["50%"], []);

  // callbacks
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      backdropComponent={renderBackdrop}
      backgroundStyle={{
        backgroundColor: isDark ? "#1E1E1E" : "white",
      }}
      handleIndicatorStyle={{
        backgroundColor: isDark ? "#ffffff" : "#000000",
      }}
      index={1}
      onDismiss={onClose}
      ref={ref}
      snapPoints={snapPoints}
    >
      <BottomSheetView className="flex-1 items-center p-6">
        <Text
          className={`mb-4 text-center font-bold text-xl ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {type} Action
        </Text>
        <Text
          className={`mb-5 text-center ${isDark ? "text-[#ccc]" : "text-[#666]"}`}
        >
          This is the modal content for {type}.
        </Text>
        {/* Optional: Close button if needed, though swipe/backdrop works */}
        <Pressable
          className="mt-5 min-w-[100px] rounded-[20px] bg-[#2196F3] p-2.5 shadow-sm"
          onPress={() => {
            ref.current?.dismiss();
          }}
        >
          <Text className="text-center font-bold text-white">Close</Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
