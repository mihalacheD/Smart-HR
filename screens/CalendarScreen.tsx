import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { useAuth } from '../context/AuthContext';
import { useCalendarNotes } from '../hooks/useCalendarNotes';
import { useThemeColors } from '../hooks/useThemeColor';
import ThemedContainer from '../components/ThemedContainer';
import ThemedText from '../components/ThemedText';
import AddNoteForm from '../components/AddNoteForm';
import NoteItem from '../components/NoteItem';
import ThemedCalendar from '../components/ThemedCalendar';

export default function CalendarScreen() {
  const { user } = useAuth();
  const colors = useThemeColors();
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const { notes, addNote } = useCalendarNotes(user?.uid ?? '');

  const handleAddNote = async (note: string) => {
    await addNote(selectedDate, note);
  };

  const notesForDate = notes.filter((note) => note.date === selectedDate);

  const markedDates = useMemo(() => {
    const result: Record<string, any> = {};

    notes.forEach((note) => {
      result[note.date] = {
        marked: true,
        dotColor: colors.primary,
        textColor: colors.primary,
      };
    });

    result[selectedDate] = {
      ...(result[selectedDate] || {}),
      selected: true,
      selectedColor: colors.primary,
      selectedTextColor: '#fff',
    };

    return result;
  }, [notes, selectedDate, colors]);

  return (
    <ThemedContainer style={{ backgroundColor: colors.background, padding: 16 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <ThemedCalendar
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            markedDates={markedDates}
          />

          <View style={{ marginTop: 20, flex: 1 }}>
            <ThemedText style={styles.sectionTitle}>
              Notes for {selectedDate}
            </ThemedText>
            <FlatList
              data={notesForDate}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <NoteItem note={item.note} />}
              ListEmptyComponent={
                <ThemedText style={{ opacity: 0.6 }}>
                  No notes for this day.
                </ThemedText>
              }
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ paddingBottom: 100 }}
            />
          </View>

            <AddNoteForm onAdd={handleAddNote} />

        </View>
      </TouchableWithoutFeedback>
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
