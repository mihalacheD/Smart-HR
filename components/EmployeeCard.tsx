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
}

export default function EmployeeCard({
  id,
  email,
  role,
  fullName,
  position,
  onDelete,
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

      {onDelete && (
        <View style={styles.buttonWrapper}>
          <Button
            title="Delete"
            backgroundColor={colors.danger}
            onPress={handleDelete}
          />
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    marginTop: 10,
  },
});
