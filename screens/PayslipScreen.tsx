import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ThemedText from '../components/ThemedText';
import { useThemeContext } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';
import YearPickerModal from '../components/YearPickerModal';
import { useAuth } from '../context/AuthContext';

import AddPayslipForm from '../components/AddPayslipForm';
import PayslipList from '../components/PayslipList';
import LoadingOrEmpty from '../components/LoadingOrEmpty';
import { usePayslips } from '../hooks/usePayslip';

export default function PayslipScreen() {
  const { role } = useAuth();
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? darkColors : lightColors;

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { payslips, loading, fetchPayslips } = usePayslips(selectedYear);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedText style={styles.title}>Payslips</ThemedText>

      <YearPickerModal selectedYear={selectedYear} onChange={setSelectedYear} />

      {role === 'hr' && <AddPayslipForm selectedYear={selectedYear} onAdded={fetchPayslips} />}

      {loading ? (
        <LoadingOrEmpty loading={loading} emptyMessage={`No payslips available for ${selectedYear}.`} />
      ) : payslips.length === 0 ? (
        <LoadingOrEmpty loading={false} emptyMessage={`No payslips available for ${selectedYear}.`} />
      ) : (
        <PayslipList payslips={payslips} role={role} onDeleted={fetchPayslips} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 10,
  },
});
