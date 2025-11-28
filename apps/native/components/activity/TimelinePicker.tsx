import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@/contexts/app-theme-context";
import { useState, useEffect } from "react";
import { 
  format, 
  addMonths, 
  subMonths, 
  setMonth, 
  setYear, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addYears, 
  subYears,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  addDays,
  subDays
} from "date-fns";
import Animated, { 
  FadeIn, 
  FadeOut, 
  LinearTransition 
} from "react-native-reanimated";

export type FilterMode = 'day' | 'month' | 'year' | 'range';

export type DateFilter = {
  mode: FilterMode;
  date: Date;
  startDate?: Date;
  endDate?: Date;
};

type TimelinePickerProps = {
  filter: DateFilter;
  onChange: (filter: DateFilter) => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
};

export const TimelinePicker = ({
  filter,
  onChange,
  isExpanded: controlledExpanded,
  onToggleExpand,
}: TimelinePickerProps) => {
  const { isDark } = useAppTheme();
  const [internalExpanded, setInternalExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<FilterMode>(filter.mode);
  const [label, setLabel] = useState("");
  
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;
  
  const handleToggleExpand = () => {
    if (onToggleExpand) {
      onToggleExpand();
    } else {
      setInternalExpanded(!internalExpanded);
    }
  };
  
  // Internal navigation state (e.g. scrolling through months in calendar view without changing selection)
  const [navDate, setNavDate] = useState(filter.date);

  // Sync navDate when filter changes externally
  useEffect(() => {
    setNavDate(filter.date);
  }, [filter.date]);

  const handlePrev = () => {
    if (isExpanded) {
      if (viewMode === 'year') {
        setNavDate(subYears(navDate, 12));
      } else if (viewMode === 'month') {
        setNavDate(subYears(navDate, 1));
      } else {
        setNavDate(subMonths(navDate, 1));
      }
    } else {
      // Change selection
      if (filter.mode === 'day') {
        onChange({ ...filter, date: subDays(filter.date, 1) });
      } else if (filter.mode === 'month') {
        onChange({ ...filter, date: subMonths(filter.date, 1) });
      } else if (filter.mode === 'year') {
        onChange({ ...filter, date: subYears(filter.date, 1) });
      } else if (filter.mode === 'range') {
        if (filter.startDate && filter.endDate) {
          onChange({
            ...filter,
            startDate: subDays(filter.startDate, 1),
            endDate: subDays(filter.endDate, 1)
          });
        }
      }
    }
  };

  const handleNext = () => {
    if (isExpanded) {
      if (viewMode === 'year') {
        setNavDate(addYears(navDate, 12));
      } else if (viewMode === 'month') {
        setNavDate(addYears(navDate, 1));
      } else {
        setNavDate(addMonths(navDate, 1));
      }
    } else {
      // Change selection
      if (filter.mode === 'day') {
        onChange({ ...filter, date: addDays(filter.date, 1) });
      } else if (filter.mode === 'month') {
        onChange({ ...filter, date: addMonths(filter.date, 1) });
      } else if (filter.mode === 'year') {
        onChange({ ...filter, date: addYears(filter.date, 1) });
      } else if (filter.mode === 'range') {
        if (filter.startDate && filter.endDate) {
          onChange({
            ...filter,
            startDate: addDays(filter.startDate, 1),
            endDate: addDays(filter.endDate, 1)
          });
        }
      }
    }
  };

  const handleModeSelect = (mode: FilterMode) => {
    setViewMode(mode);
    // If switching to range, ensure we have start/end initialized if needed
    if (mode === 'range' && !filter.startDate) {
      onChange({
        ...filter,
        mode,
        startDate: filter.date,
        endDate: filter.date
      });
    } else {
      onChange({ ...filter, mode });
    }
  };

  const handleDateSelect = (date: Date) => {
    if (viewMode === 'day') {
      onChange({ ...filter, date, mode: 'day' });
      if (onToggleExpand) onToggleExpand(); else setInternalExpanded(false);
    } else if (viewMode === 'range') {
      if (!filter.startDate || (filter.startDate && filter.endDate)) {
        // Start new range
        onChange({ ...filter, startDate: date, endDate: undefined, mode: 'range' });
      } else {
        // Complete range
        let start = filter.startDate;
        let end = date;
        if (date < start) {
          start = date;
          end = filter.startDate;
        }
        onChange({ ...filter, startDate: start, endDate: end, mode: 'range' });
      }
    }
  };

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = setMonth(navDate, monthIndex);
    setNavDate(newDate);
    if (viewMode === 'month') {
      onChange({ ...filter, date: newDate, mode: 'month' });
      if (onToggleExpand) onToggleExpand(); else setInternalExpanded(false);
    } else {
      // If we were in day/range mode and just using month picker to navigate
      setViewMode(filter.mode === 'month' ? 'month' : 'day'); 
    }
  };

  const handleYearSelect = (year: number) => {
    const newDate = setYear(navDate, year);
    setNavDate(newDate);
    if (viewMode === 'year') {
      onChange({ ...filter, date: newDate, mode: 'year' });
      if (onToggleExpand) onToggleExpand(); else setInternalExpanded(false);
    } else {
      setViewMode('month');
    }
  };

  const renderHeader = () => {
    let label = "";
      
      if (viewMode === 'year') {
        label = format(navDate, "yyyy");
      } else if (viewMode === 'month') {
        label = format(navDate, "MMMM yyyy");
      } else if (viewMode === 'day') {
        label = format(navDate, "MMM d, yyyy");
      } else if (viewMode === 'range') {
        if (filter.startDate && filter.endDate) {
          label = `${format(filter.startDate, "MMM d")} - ${format(filter.endDate, "MMM d")}`;
        } else if (filter.startDate) {
          label = `${format(filter.startDate, "MMM d")} - ...`;
        } else {
          label = "Select Range";
        }
      }

    return (
      <View className="flex-row justify-between items-center mb-4 bg-neutral-100 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800" >
        <TouchableOpacity 
          onPress={handlePrev}
          className="w-10 h-10 justify-center items-center rounded-xl active:bg-neutral-200 dark:active:bg-neutral-800"
        >
          <Ionicons name="chevron-back" size={20} color={isDark ? "#9ca3af" : "#4b5563"} />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleToggleExpand} className="flex-row items-center px-4 py-2 gap-2">
          <Ionicons name="calendar-outline" size={18} color={isDark ? "#fff" : "#000"} />
          <Text className="text-lg font-semibold text-neutral-900 dark:text-white">
            {label}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={handleNext}
          className="w-10 h-10 justify-center items-center rounded-xl active:bg-neutral-200 dark:active:bg-neutral-800"
        >
          <Ionicons name="chevron-forward" size={20} color={isDark ? "#9ca3af" : "#4b5563"} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderModeTabs = () => (
    <View className="flex-row bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl mb-4">
      {(['day', 'range', 'month', 'year'] as FilterMode[]).map((m) => (
        <TouchableOpacity
          key={m}
          onPress={() => handleModeSelect(m)}
          className={`flex-1 py-2 rounded-lg items-center ${
            viewMode === m ? 'bg-white dark:bg-neutral-700 shadow-sm' : ''
          }`}
        >
          <Text className={`text-xs font-medium capitalize ${
            viewMode === m ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 dark:text-neutral-400'
          }`}>
            {m}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderCalendar = () => {
    const start = startOfWeek(startOfMonth(navDate));
    const end = endOfWeek(endOfMonth(navDate));
    const days = eachDayOfInterval({ start, end });
    const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

    return (
      <View>
        <View className="flex-row justify-between mb-4 mt-1">
          {weekDays.map((d, i) => (
            <Text key={i} className="w-[14.28%] text-center text-xs font-medium text-neutral-400">
              {d}
            </Text>
          ))}
        </View>
        <View className="flex-row flex-wrap">
          {days.map((day, i) => {
            const isCurrentMonth = isSameMonth(day, navDate);
            let isSelected = false;
            let isRangeStart = false;
            let isRangeEnd = false;
            let isInRange = false;

            if (viewMode === 'day') {
              isSelected = isSameDay(day, filter.date);
            } else if (viewMode === 'range') {
              if (filter.startDate) isRangeStart = isSameDay(day, filter.startDate);
              if (filter.endDate) isRangeEnd = isSameDay(day, filter.endDate);
              if (filter.startDate && filter.endDate) {
                isInRange = isWithinInterval(day, { start: filter.startDate, end: filter.endDate });
              }
            }

            // Determine the container styling
            const containerClasses = [];
            let borderStyle = '';
            
            if (isRangeStart || isRangeEnd || isSelected) {
              // Outlined circle for selected/start/end dates
              borderStyle = 'border-2 border-neutral-900 dark:border-white bg-neutral-100 dark:bg-neutral-800';
            }
            
            if (isRangeStart && !isRangeEnd) {
              containerClasses.push('bg-neutral-100 dark:bg-neutral-800 rounded-full');
            } else if (isRangeEnd && !isRangeStart) {
              containerClasses.push('bg-neutral-100 dark:bg-neutral-800 rounded-full');
            } else if (isInRange && !isRangeStart && !isRangeEnd) {
              containerClasses.push('bg-neutral-100 dark:bg-neutral-800 rounded-full');
            }

            return (
              <View
                key={i}
                className={`w-[14.28%] aspect-square ${containerClasses.join(' ')}`}
              >
                <TouchableOpacity
                  onPress={() => handleDateSelect(day)}
                  className={`w-full h-full justify-center items-center rounded-full ${borderStyle}`}
                >
                  <Text className={`text-sm
                    ${!isCurrentMonth ? 'text-neutral-300 dark:text-neutral-700' : 'text-neutral-500 dark:text-white'}
                    ${(isSelected || isRangeStart || isRangeEnd) ? 'font-bold' : ''}
                  `}>
                    {format(day, "d")}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderMonths = () => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return (
      <View className="flex-row flex-wrap justify-between">
        {months.map((month, index) => {
          const isSelected = filter.date.getMonth() === index && filter.date.getFullYear() === navDate.getFullYear();
          return (
            <TouchableOpacity
              key={month}
              onPress={() => handleMonthSelect(index)}
              className={`w-[30%] py-3 rounded-xl items-center justify-center mb-2 ${
                isSelected 
                  ? "bg-neutral-900 dark:bg-white" 
                  : "bg-neutral-50 dark:bg-neutral-800"
              }`}
            >
              <Text className={`font-medium ${
                isSelected 
                  ? "text-white dark:text-black" 
                  : "text-neutral-600 dark:text-neutral-400"
              }`}>
                {month}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderYears = () => {
    const currentYear = navDate.getFullYear();
    const startYear = currentYear -6;
    const years = Array.from({ length: 12 }, (_, i) => startYear + i);

    return (
      <View className="flex-row flex-wrap justify-between">
        {years.map((year) => {
          const isSelected = filter.date.getFullYear() === year;
          return (
            <TouchableOpacity
              key={year}
              onPress={() => handleYearSelect(year)}
              className={`w-[30%] py-3 rounded-xl items-center justify-center mb-2 ${
                isSelected 
                  ? "bg-neutral-900 dark:bg-white" 
                  : "bg-neutral-50 dark:bg-neutral-800"
              }`}
            >
              <Text className={`font-medium ${
                isSelected 
                  ? "text-white dark:text-black" 
                  : "text-neutral-600 dark:text-neutral-400"
              }`}>
                {year}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View>
      {renderHeader()}
      
      {isExpanded && (
        <Animated.View 
          entering={FadeIn}
          exiting={FadeOut}
          layout={LinearTransition}
          className="mb-4 px-4 pt-4 pb-2 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800"
        >
          {renderModeTabs()}
          
          <View className="">
            {(viewMode === 'day' || viewMode === 'range') && renderCalendar()}
            {viewMode === 'month' && renderMonths()}
            {viewMode === 'year' && renderYears()}
          </View>
        </Animated.View>
      )}
    </View>
  );
};
