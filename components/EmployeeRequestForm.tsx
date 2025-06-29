import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Alert,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from 'react-native';
import { db } from '../firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Button from './Button';
import ThemedText from './ThemedText';
import { useAuth } from '../context/AuthContext';
import { lightColors, darkColors } from '../constants/colors';
import { useThemeContext } from '../context/ThemeContext';
import { formatDateLabel } from '../utils/formatDate';

const requestTypes = ['Holiday', 'Work from home', 'Medical'];

export default function EmployeeRequestForm() {
  const { user } = useAuth();
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? darkColors : lightColors;

  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [pickerVisible, setPickerVisible] = useState<'from' | 'to' | null>(null);

  const handleSubmit = async () => {
    if (!type || !fromDate || !toDate) {
      Alert.alert('Please complete all required fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'requests'), {
        userId: user?.uid,
        userEmail: user?.email,
        type,
        message,
        fromDate: Timestamp.fromDate(fromDate),
        toDate: Timestamp.fromDate(toDate),
        status: 'pending',
        createdAt: Timestamp.now(),
      });

      Alert.alert('Request submitted!');
      setType('');
      setMessage('');
      setFromDate(null);
      setToDate(null);
    } catch (error) {
      Alert.alert('Failed to send request');
      console.error('Submit error:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <View style={styles.section}>
            <ThemedText style={styles.label}>Request Type</ThemedText>
            <View style={styles.optionsContainer}>
              {requestTypes.map(option => (
                <Pressable
                  key={option}
                  style={[
                    styles.option,
                    {
                      backgroundColor: type === option ? colors.primary : colors.card,
                      borderColor: colors.border,
                    },
                  ]}
                  onPress={() => setType(option)}
                >
                  <Text style={{ color: colors.textPrimary }}>{option}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.label}>Select Dates</ThemedText>
            <View style={styles.dateRow}>
              <Button
                title={fromDate ? `From: ${formatDateLabel(fromDate)}` : 'From'}
                onPress={() => setPickerVisible('from')}
                style={styles.dateButton}
              />

              <View style={{ width: 10 }} />

              <Button
                title={toDate ? `To: ${formatDateLabel(toDate)}` : 'To'}
                onPress={() => setPickerVisible('to')}
                style={styles.dateButton}
              />
            </View>
          </View>


          <View style={styles.section}>
            <ThemedText style={styles.label}>Message</ThemedText>
            <TextInput
              placeholder="Optional message"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
              style={[styles.input, { color: colors.textPrimary, borderColor: colors.border }]}
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <Button title="Submit Request" onPress={handleSubmit} />
          {/* Date picker modal */}
          <DateTimePickerModal
            isVisible={!!pickerVisible}
            mode="date"
            onConfirm={(date) => {
              pickerVisible === 'from' ? setFromDate(date) : setToDate(date);
              setPickerVisible(null);
            }}
            onCancel={() => setPickerVisible(null)}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: '600',
  },
  dropdown: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 10,
    flexWrap: 'wrap',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },

  option: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginVertical: 10,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  dateButton: {
    flex: 1,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },

});
