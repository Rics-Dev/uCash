import { ScrollView, View } from "react-native";
import { GlassChip } from "@/components/GlassChip";
import Animated, { FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";

type CategoryFilterProps = {
  categories: string[];
  selectedCategories: string[];
  onSelectCategory: (categories: string[]) => void;
};

export const CategoryFilter = ({
  categories,
  selectedCategories,
  onSelectCategory,
}: CategoryFilterProps) => {
  const handleSelect = (category: string | null) => {
    if (category === null) {
      onSelectCategory([]);
      return;
    }

    if (selectedCategories.includes(category)) {
      onSelectCategory(selectedCategories.filter((c) => c !== category));
    } else {
      onSelectCategory([...selectedCategories, category]);
    }
  };

  return (
    <Animated.View 
      entering={FadeIn}
      exiting={FadeOut}
      layout={LinearTransition}
      className="mb-4"
    >
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
        className="flex-row"
      >
        <GlassChip
          label="All"
          isSelected={selectedCategories.length === 0}
          onPress={() => handleSelect(null)}
        />
        {categories.map((category) => (
          <GlassChip
            key={category}
            label={category}
            isSelected={selectedCategories.includes(category)}
            onPress={() => handleSelect(category)}
          />
        ))}
      </ScrollView>
    </Animated.View>
  );
};
