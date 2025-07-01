import React from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import ThemedText from './ThemedText';
import Card from './Card';
import Button from './Button';
import { useThemeContext } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';

interface Props {
  id: string;
  email: string;
  role: string;
  fullName?: string;
  position?: string;
  onDelete?: (id: string) => void;
  onUpdate?: (id: string) => void;
}

export default function EmployeeCard({
  id,
  email,
  role,
  fullName,
  position,
  onDelete,
  onUpdate
}: Props) {
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? darkColors : lightColors;

  const handleDelete = () => {
    Alert.alert('Confirm Delete', `Are you sure you want to delete ${email}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => onDelete?.(id) },
    ]);
  };


  return (
    <Card title={fullName ?? email} iconName="account">
      <ThemedText>Email: {email}</ThemedText>
      <ThemedText>ID: {id}</ThemedText>
      <ThemedText>Role: {role}</ThemedText>
      {position && <ThemedText>Position: {position}</ThemedText>}

      <View style={styles.buttonRow}>
        {onUpdate && (
          <Button
            title="Update"
            backgroundColor={colors.accent}
            onPress={() => onUpdate(id)}
            style={{ flex: 1 }}
          />
        )
        }

        {onDelete && (
          <Button
            title="Delete"
            backgroundColor={colors.danger}
            onPress={handleDelete}
            style={{ flex: 1, marginLeft: 10 }}
          />
        )}

      </View>
    </Card >
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
