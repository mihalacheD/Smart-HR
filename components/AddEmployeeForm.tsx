import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Button from './Button';
import ThemedText from './ThemedText';
import { useThemeContext } from '../context/ThemeContext';
import { darkColors, lightColors } from '../constants/colors';

export default function AddEmployeeForm({ onAdded }: { onAdded?: () => void }) {
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? darkColors : lightColors;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!fullName || !email || !position) {
      Alert.alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, 'users'), {
        fullName,
        email,
        position,
        role: 'employee',
      });

      Alert.alert('Employee added');
      setFullName('');
      setEmail('');
      setPosition('');
      onAdded?.();
    } catch (error) {
      console.error('Add employee error:', error);
      Alert.alert('Failed to add employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <ThemedText style={styles.title}>Add New Employee</ThemedText>

      <TextInput
        style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]}
        placeholder="Full Name"
        placeholderTextColor={colors.textSecondary}
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]}
        placeholder="Email"
        placeholderTextColor={colors.textSecondary}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]}
        placeholder="Position"
        placeholderTextColor={colors.textSecondary}
        value={position}
        onChangeText={setPosition}
      />

      <Button title="Add Employee" onPress={handleSubmit} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
});
