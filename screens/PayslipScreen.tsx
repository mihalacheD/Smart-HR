import React, { useState } from 'react';
import YearPickerModal from '../components/YearPickerModal';
import { useAuth } from '../context/AuthContext';

import AddPayslipForm from '../components/AddPayslipForm';
import LoadingOrEmpty from '../components/LoadingOrEmpty';
import { usePayslips } from '../hooks/usePayslip';
import ThemedContainer from '../components/ThemedContainer';
import TitleHeader from '../components/TitleHeader';
import { FlatList } from 'react-native';
import PayslipCard from '../components/PayslipCard';

export default function PayslipScreen() {
  const { role } = useAuth();


  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { payslips, loading, fetchPayslips } = usePayslips(selectedYear);

  return (
    <ThemedContainer>
      <FlatList
        data={payslips}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        ListHeaderComponent={
          <>
            <TitleHeader title="Payslip" />
            <YearPickerModal selectedYear={selectedYear} onChange={setSelectedYear} />
            {role === 'hr' && (
              <AddPayslipForm selectedYear={selectedYear} onAdded={fetchPayslips} />
            )}
            {loading && (
              <LoadingOrEmpty loading={true} emptyMessage="" />
            )}
            {!loading && payslips.length === 0 && (
              <LoadingOrEmpty loading={false} emptyMessage={`No payslips available for ${selectedYear}.`} />
            )}
          </>
        }
        renderItem={({ item }) => (
          <PayslipCard item={item} role={role} onDeleted={fetchPayslips} />
        )}
        keyboardShouldPersistTaps="handled"
      />
    </ThemedContainer>
  );
}

