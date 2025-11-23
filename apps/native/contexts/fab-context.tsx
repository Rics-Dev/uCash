import { createContext, type ReactNode, useContext } from "react";
import { type SharedValue, useSharedValue } from "react-native-reanimated";

type FabScrollContextType = {
  isFabVisible: SharedValue<number>;
  fabManualOverride: SharedValue<boolean>;
};

const FabScrollContext = createContext<FabScrollContextType | undefined>(
  undefined
);

export function FabScrollProvider({ children }: { children: ReactNode }) {
  const isFabVisible = useSharedValue(1);
  const fabManualOverride = useSharedValue(false);

  return (
    <FabScrollContext.Provider value={{ isFabVisible, fabManualOverride }}>
      {children}
    </FabScrollContext.Provider>
  );
}

export function useFabScroll() {
  const context = useContext(FabScrollContext);
  const defaultVal = useSharedValue(1);
  const defaultOverrideVal = useSharedValue(false);
  return context ?? { isFabVisible: defaultVal, fabManualOverride: defaultOverrideVal };
}
