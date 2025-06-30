import React from 'react';
import { FlatList, View, Alert } from 'react-native';
import Card from './Card';
import Button from './Button';
import ThemedText from './ThemedText';
import { useThemeContext } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface Props {
  payslips: any[];
  role: string | null;
  onDeleted: () => void;
}

export default function PayslipList({ payslips, role, onDeleted }: Props) {
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? darkColors : lightColors;

  const handleDeletePayslip = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'payslips', id));
      Alert.alert('Payslip deleted');
      onDeleted();
    } catch {
      Alert.alert('Failed to delete payslip');
    }
  };

  return (
    <FlatList
      data={payslips}
      keyExtractor={item => item.id}
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
  );
}
