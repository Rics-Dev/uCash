import { createContext, type ReactNode, useContext } from "react";
import { type SharedValue, useSharedValue } from "react-native-reanimated";

type FabScrollContextType = {
  isFabVisible: SharedValue<number>;
};

const FabScrollContext = createContext<FabScrollContextType | undefined>(
  undefined
);

export function FabScrollProvider({ children }: { children: ReactNode }) {
  const isFabVisible = useSharedValue(1);

  return (
    <FabScrollContext.Provider value={{ isFabVisible }}>
      {children}
    </FabScrollContext.Provider>
  );
}

export function useFabScroll() {
  const context = useContext(FabScrollContext);
  const defaultVal = useSharedValue(1);
  return context ?? { isFabVisible: defaultVal };
}
