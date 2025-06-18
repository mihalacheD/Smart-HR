import React, { useState } from 'react';
import { Alert } from 'react-native';
import { StyleSheet, View, FlatList } from 'react-native';

import Card from '../components/Card';
import Button from '../components/Button';
import ThemedText from '../components/ThemedText';
import { useThemeContext } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';

const dummyPayslips = [
  { month: 'May 2025', file: 'payslip-may-2025.pdf', year: 2025 },
  { month: 'April 2025', file: 'payslip-apr-2025.pdf', year: 2025 },
  { month: 'June 2024', file: 'payslip-jun-2024.pdf', year: 2024 },
];

export default function PayslipScreen() {

  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? darkColors : lightColors;



  const handleDownload = (file: string) => {
    Alert.alert(`Downloading: ${file}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedText style={styles.title}>Your Payslips</ThemedText>
      <ThemedText style={styles.subtitle}>
        Access and download your salary statements securely.
      </ThemedText>


      <FlatList
        data={dummyPayslips}
        keyExtractor={(item) => item.file}
        renderItem={({ item }) => (
          <Card title={item.month} iconName="file-pdf-box">
            <Button title="Download" onPress={() => handleDownload(item.file)} />
          </Card>
        )}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  picker: {
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
})
