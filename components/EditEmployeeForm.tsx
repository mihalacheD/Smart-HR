import React, { useState } from 'react';
import {
  View,
  TextInput,
  Modal,
  Alert,
  StyleSheet,
} from 'react-native';
import { Employee } from '../hooks/useEmployees';
import ThemedText from './ThemedText';
import Button from './Button';
import { lightColors, darkColors } from '../constants/colors';
import { useThemeContext } from '../context/ThemeContext';

interface Props {
  employee: Employee;
  visible: boolean;
  onClose: () => void;
  updateEmployee: (uid: string, updatedData: Partial<Employee>) => Promise<void>;
}

export default function EditEmployeeForm({
  employee,
  visible,
  onClose,
  updateEmployee,
}: Props) {

  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? darkColors : lightColors;

  const [fullName, setFullName] = useState(employee.fullName ?? '');
  const [email, setEmail] = useState(employee.email ?? '');
  const [position, setPosition] = useState(employee.position ?? '');
  const [loading, setLoading] = useState(false);

  // Resetează stările când modalul se deschide (opțional)
  React.useEffect(() => {
    if (visible) {
      setFullName(employee.fullName ?? '');
      setEmail(employee.email ?? '');
      setPosition(employee.position ?? '');
    }
  }, [visible, employee]);

  const handleSave = async () => {
    if (!fullName.trim()) {
      Alert.alert('Name is required');
      return;
    }

    setLoading(true);
    try {
      await updateEmployee(employee.id, { fullName, email, position });
      onClose();
    } catch (error) {
      Alert.alert('Failed to update employee');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >

      <View style={[styles.modalBackground, { backgroundColor: colors.background }]} >
        <ThemedText style={styles.title}>Edit Employee info</ThemedText>
        <TextInput
          style={[styles.input, { color: colors.textPrimary }]}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          editable={!loading}
        />
        <TextInput
          style={[styles.input, { color: colors.textPrimary }]}
          placeholder="Email (optional)"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, { color: colors.textPrimary }]}
          placeholder="Position"
          value={position}
          onChangeText={setPosition}
          editable={!loading}
        />

        <View style={styles.buttonRow}>
          <Button
            title={loading ? 'Saving...' : 'Save'}
            onPress={handleSave}
            disabled={loading}
            style={{ flex: 1, backgroundColor: colors.success }}
          />
          <Button title="Cancel" onPress={onClose} disabled={loading} style={{ flex: 1, marginLeft: 10, backgroundColor: colors.textSecondary }} />
        </View>

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    borderRadius: 8,
    maxHeight: '60%',
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 30,
  },
});
