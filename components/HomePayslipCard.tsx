// components/HomePayslipCard.tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Card from './Card';
import ThemedText from './ThemedText';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootTabParamList } from '../types/navigation';
import { useEmployees } from '../hooks/useEmployees';
import { getDisplayName } from '../utils/getDisplayName';

interface Props {
  recentPayslip: any;
  loadingPayslip: boolean;
  role: string | null;
}

export default function HomePayslipCard({ recentPayslip, loadingPayslip, role }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootTabParamList>>();
  const { employees } = useEmployees();

  const payslipCardTitle = (role === 'hr' || role === 'demo-hr')? 'Most Recent Payslip in System' : 'Your Most Recent Payslip';

  if (loadingPayslip) {
    return (
      <Card title={payslipCardTitle}>
        <ThemedText>Loading payslip...</ThemedText>
      </Card>
    );
  }

  if (!recentPayslip) {
    return (
      <Card title={payslipCardTitle}>
        <ThemedText>{(role === 'hr' || role === 'demo-hr') ? 'No payslips found in the system.' : 'You have no payslips yet.'}</ThemedText>
      </Card>
    );
  }

  const employeeName = getDisplayName(recentPayslip?.userId, employees, { email: recentPayslip?.userEmail });

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Payslip')}>
      <Card
        title={payslipCardTitle}
        iconName="file-document-outline"
        buttonText="View Details"
        onButtonPress={() => navigation.navigate('Payslip')}
      >
        {
        (role === 'hr' || role === 'demo-hr') && <ThemedText>
          Employee: {employeeName}</ThemedText>
        }
        <ThemedText>Month: {recentPayslip.month}</ThemedText>
        <ThemedText>Year: {recentPayslip.year}</ThemedText>
        <ThemedText>File: {recentPayslip.file}</ThemedText>
      </Card>
    </TouchableOpacity>
  );
}
