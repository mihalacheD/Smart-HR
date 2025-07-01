import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import Card from './Card';
import Button from './Button';
import ThemedText from './ThemedText';
import { useThemeContext } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useEmployees } from '../hooks/useEmployees';

interface Props {
  item: any;
  role: string | null;
  onDeleted: () => void;
}

export default function PayslipCard({ item, role, onDeleted }: Props) {
  const { employees } = useEmployees();
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? darkColors : lightColors;

  const employee = employees.find(emp => emp.id === item.userId);

  const handleDeletePayslip = async () => {
    try {
      await deleteDoc(doc(db, 'payslips', item.id));
      Alert.alert('Payslip deleted');
      onDeleted();
    } catch {
      Alert.alert('Failed to delete payslip');
    }
  };

  return (
    <Card title={item.month} iconName="file-pdf-box">
      <ThemedText>File: {item.file}</ThemedText>
      <ThemedText>Employee: {employee ? employee.fullName ?? employee.email : item.userId}</ThemedText>
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
              Alert.alert('Confirm Delete', 'Are you sure?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: handleDeletePayslip },
              ])
            }
            style={{ flex: 1, marginLeft: 10 }}
          />
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
