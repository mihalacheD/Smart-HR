import React from 'react';
import { Calendar, DateData } from 'react-native-calendars';
import { useThemeColors } from '../hooks/useThemeColor';

interface Props {
  selectedDate: string;
  onDateChange: (date: string) => void;
  markedDates: Record<string, any>;
}

export default function ThemedCalendar({ selectedDate, onDateChange, markedDates }: Props) {
  const colors = useThemeColors();

  return (
    <Calendar
      onDayPress={(day: DateData) => onDateChange(day.dateString)}
      markedDates={markedDates}
      key={colors.background}
      theme={{
        backgroundColor: colors.background,
        calendarBackground: colors.background,
        textSectionTitleColor: colors.textPrimary,
        dayTextColor: colors.textPrimary,
        todayTextColor: colors.primary,
        selectedDayBackgroundColor: colors.primary,
        selectedDayTextColor: '#fff',
        monthTextColor: colors.textPrimary,
        arrowColor: colors.primary,
        textDisabledColor: '#555',
        textDayFontWeight: '500',
        textMonthFontWeight: 'bold',
        textDayFontSize: 14,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 13,
      }}
    />
  );
}
