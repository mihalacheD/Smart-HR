import React, { useState } from 'react';
import { View, TextInput, Modal, FlatList, TouchableOpacity, Text, Pressable, Alert, StyleSheet } from 'react-native';
import MonthPicker from './MonthPicker';
import Button from './Button';
import ThemedText from './ThemedText';
import { useThemeContext } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';
import { useEmployees } from '../hooks/useEmployees';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';


interface Props {
  selectedYear: number;
  onAdded: () => void;
}

export default function AddPayslipForm({ selectedYear, onAdded }: Props) {
  const { employees } = useEmployees();
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? darkColors : lightColors;

  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [newPayslip, setNewPayslip] = useState({ month: '', userId: '', file: '' });

  const selectedEmployee = employees.find(emp => emp.uid === newPayslip.userId);

  const handleAddPayslip = async () => {
    try {
      const { userId, month, file } = newPayslip;
      const year = selectedYear;

      if (!userId || !month || !file) {
        Alert.alert('All fields are required');
        return;
      }

      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const monthIndex = months.indexOf(month);
      if (monthIndex === -1) {
        Alert.alert('Invalid month');
        return;
      }

      const orderIndex = year * 100 + (monthIndex + 1);

      await addDoc(collection(db, 'payslips'), {
        ...newPayslip,
        year,
        orderIndex,
      });

      setNewPayslip({ month: '', userId: '', file: '' });
      onAdded();
      Alert.alert('Payslip added');
    } catch (error) {
      Alert.alert('Error adding payslip');
      console.error('Add payslip error:', error);
    }
  };

  return (
    <View style={{ marginBottom: 20, gap: 10 }}>
      <ThemedText>Select Employee:</ThemedText>
      <Pressable onPress={() => setShowEmployeeModal(true)} style={[styles.dropdown, { borderColor: colors.border }]}>
        <Text style={{ color: selectedEmployee ? colors.textPrimary : colors.textSecondary }}>
          {selectedEmployee?.email || 'Select employee'}
        </Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent
        visible={showEmployeeModal}
        onRequestClose={() => setShowEmployeeModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
            <FlatList
              data={employees}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    setNewPayslip(prev => ({ ...prev, userId: item.id }));
                    setShowEmployeeModal(false);
                  }}
                >
                  <Text style={[styles.itemText, { color: colors.textPrimary }]}>{item.email}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={<ThemedText>No employees found.</ThemedText>}
            />
            <Button title="Close" onPress={() => setShowEmployeeModal(false)} />
          </View>
        </View>
      </Modal>

      <MonthPicker
        selectedMonth={newPayslip.month}
        onSelect={(month) => setNewPayslip(prev => ({ ...prev, month }))}
      />

      <TextInput
        placeholder="PDF file name"
        value={newPayslip.file}
        onChangeText={file => setNewPayslip(prev => ({ ...prev, file }))}
        style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]}
        placeholderTextColor={colors.textSecondary}
      />

      <Button title="Add Payslip" onPress={handleAddPayslip} />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    borderRadius: 8,
    maxHeight: '60%',
    padding: 10,
  },
  item: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
});
