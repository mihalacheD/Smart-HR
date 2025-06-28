import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, FlatList, TextInput, Modal, Pressable, Text, TouchableOpacity } from 'react-native';
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

  const fetchPayslips = async () => {
    if (!user) return;

    const payslipRef = collection(db, 'payslips');
    const q = role === 'hr'
      ? query(payslipRef, where('year', '==', selectedYear))
      : query(payslipRef, where('userId', '==', user.uid), where('year', '==', selectedYear));

    const snapshot = await getDocs(q);
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setFilteredPayslips(items);
  };

  const fetchEmployees = async () => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('role', '==', 'employee'));
    const snapshot = await getDocs(q);
    const items = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
    setAllEmployees(items);
  };

  const handleAddPayslip = async () => {
    try {
      if (!newPayslip.userId || !newPayslip.month || !newPayslip.file) {
        Alert.alert('All fields are required');
        return;
      }
      await addDoc(collection(db, 'payslips'), newPayslip);
      setNewPayslip({ month: '', year: selectedYear, userId: '', file: '' });
      fetchPayslips();
      Alert.alert('Payslip added');
    } catch (error) {
      Alert.alert('Error adding payslip');
    }
  };

  const handleDeletePayslip = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'payslips', id));
      Alert.alert('Payslip deleted');
      fetchPayslips(); // Reîncarcă lista
    } catch (error) {
      Alert.alert('Failed to delete payslip');
    }
  };


  useEffect(() => {
    fetchPayslips();
    if (role === 'hr') fetchEmployees();
  }, [selectedYear, role]);

  const selectedEmployee = allEmployees.find(emp => emp.uid === newPayslip.userId);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedText style={styles.title}>Payslips</ThemedText>
      <YearPickerModal selectedYear={selectedYear} onChange={setSelectedYear} />

      {role === 'hr' && (
        <View style={styles.formContainer}>
          <ThemedText>Select Employee:</ThemedText>
          <Pressable onPress={() => setShowEmployeeModal(true)} style={styles.dropdown}>
            <Text>{selectedEmployee?.email || 'Select employee'}</Text>
          </Pressable>

          <Modal
            animationType="slide"
            transparent={true}
            visible={showEmployeeModal}
            onRequestClose={() => setShowEmployeeModal(false)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <FlatList
                  data={allEmployees}
                  keyExtractor={(item) => item.uid}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.item}
                      onPress={() => {
                        setNewPayslip({ ...newPayslip, userId: item.uid });
                        setShowEmployeeModal(false);
                      }}
                    >
                      <Text style={styles.itemText}>{item.email}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </Modal>

          <TextInput
            placeholder="Month"
            value={newPayslip.month}
            onChangeText={text => setNewPayslip({ ...newPayslip, month: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="PDF file name"
            value={newPayslip.file}
            onChangeText={text => setNewPayslip({ ...newPayslip, file: text })}
            style={styles.input}
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
          keyExtractor={(item) => item.file}
          renderItem={({ item }) => (
            <Card title={item.month} iconName="file-pdf-box">
              <ThemedText>File: {item.file}</ThemedText>
              <ThemedText>Employee: {item.userId}</ThemedText>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Button
                  title="Download"
                  onPress={() => Alert.alert(`Downloading ${item.file}`)}
                  style={{ flex: 1 }}
                />

                {role === 'hr' && (
                  <Button
                    title="Delete"
                    backgroundColor="#D9534F" // roșu bootstrap
                    onPress={() => {
                      Alert.alert(
                        "Confirm Delete",
                        "Are you sure you want to delete this payslip?",
                        [
                          { text: "Cancel", style: "cancel" },
                          {
                            text: "Delete",
                            style: "destructive",
                            onPress: () => handleDeletePayslip(item.id),
                          },
                        ]
                      );
                    }}
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
    padding: 20,
    flex: 1,
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
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
  },
  dropdown: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
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
    backgroundColor: 'white',
    borderRadius: 8,
    maxHeight: '60%',
    padding: 10,
  },
  item: {
    paddingVertical: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
  },
});
