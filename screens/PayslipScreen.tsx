import React, { useState, useEffect, useCallback } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
} from 'react-native';

import MonthPicker from '../components/MonthPicker';
import Card from '../components/Card';
import Button from '../components/Button';
import ThemedText from '../components/ThemedText';
import { useThemeContext } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';
import YearPickerModal from '../components/YearPickerModal';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function PayslipScreen() {
  const { role, user } = useAuth();
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? darkColors : lightColors;

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [filteredPayslips, setFilteredPayslips] = useState<any[]>([]);
  const [allEmployees, setAllEmployees] = useState<any[]>([]);
  const [newPayslip, setNewPayslip] = useState({ month: '', year: selectedYear, userId: '', file: '' });
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);

  // Fetch payslips based on role and selected year
  const fetchPayslips = useCallback(async () => {
    if (!user) return;

    try {
      const payslipRef = collection(db, 'payslips');
      const q = role === 'hr'
        ? query(payslipRef, where('year', '==', selectedYear))
        : query(payslipRef, where('userId', '==', user.uid), where('year', '==', selectedYear));

      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFilteredPayslips(items);
    } catch {
      Alert.alert('Error fetching payslips');
    }
  }, [user, role, selectedYear]);

  // Fetch employees only if HR
  const fetchEmployees = useCallback(async () => {
    if (role !== 'hr') return;
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('role', '==', 'employee'));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
      setAllEmployees(items);
    } catch {
      Alert.alert('Error fetching employees');
    }
  }, [role]);

  // Add a new payslip
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

      setNewPayslip({ month: '', year, userId: '', file: '' });
      fetchPayslips();
      Alert.alert('Payslip added');
    } catch (error) {
      Alert.alert('Error adding payslip');
      console.error('Add payslip error:', error);
    }
  };

  // Delete payslip by id
  const handleDeletePayslip = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'payslips', id));
      Alert.alert('Payslip deleted');
      await fetchPayslips();
    } catch {
      Alert.alert('Failed to delete payslip');
    }
  };

  // Effects
  useEffect(() => {
    fetchPayslips();
    fetchEmployees();
  }, [fetchPayslips, fetchEmployees]);

  const selectedEmployee = allEmployees.find(emp => emp.uid === newPayslip.userId);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedText style={styles.title}>Payslips</ThemedText>

      <YearPickerModal selectedYear={selectedYear} onChange={setSelectedYear} />

      {role === 'hr' && (
        <View style={styles.formContainer}>
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
                  data={allEmployees}
                  keyExtractor={item => item.uid}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.item}
                      onPress={() => {
                        setNewPayslip({ ...newPayslip, userId: item.uid });
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
            onSelect={(month) => setNewPayslip({ ...newPayslip, month })}
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
      )}

      {filteredPayslips.length === 0 ? (
        <View style={styles.emptyState}>
          <ThemedText style={styles.emptyText}>No payslips available for {selectedYear}.</ThemedText>
        </View>
      ) : (
        <FlatList
          data={filteredPayslips}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Card title={item.month} iconName="file-pdf-box">
              <ThemedText>File: {item.file}</ThemedText>
              <ThemedText>Employee: {item.userId}</ThemedText>
              <View style={styles.buttonRow}>
                <Button
                  title="Download"
                  onPress={() => Alert.alert(`Downloading ${item.file}`)}
                  style={{ flex: 1 }}
                />
                {role === 'hr' && (
                  <Button
                    title="Delete"
                    backgroundColor={colors.danger}
                    onPress={() =>
                      Alert.alert(
                        'Confirm Delete',
                        'Are you sure you want to delete this payslip?',
                        [
                          { text: 'Cancel', style: 'cancel' },
                          { text: 'Delete', style: 'destructive', onPress: () => handleDeletePayslip(item.id) },
                        ]
                      )
                    }
                    style={{ flex: 1, marginLeft: 10 }}
                  />
                )}
              </View>
            </Card>
          )}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  emptyState: {
    marginTop: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    opacity: 0.7,
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 10,
  },
  formContainer: {
    marginBottom: 20,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
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
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
