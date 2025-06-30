// components/HomePayslipCard.tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Card from './Card';
import ThemedText from './ThemedText';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootTabParamList } from '../types/navigation';

interface Props {
  recentPayslip: any;
  loadingPayslip: boolean;
  role: string | null;
}

export default function HomePayslipCard({ recentPayslip, loadingPayslip, role }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootTabParamList>>();

  const payslipCardTitle = role === 'hr' ? 'Most Recent Payslip in System' : 'Your Most Recent Payslip';

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
        <ThemedText>{role === 'hr' ? 'No payslips found in the system.' : 'You have no payslips yet.'}</ThemedText>
      </Card>
    );
  }


  return (
    <TouchableOpacity onPress={() => navigation.navigate('Payslip')}>
      <Card
        title={payslipCardTitle}
        iconName="file-document-outline"
        buttonText="View Details"
        onButtonPress={() => navigation.navigate('Payslip')}
      >
        <ThemedText>Month: {recentPayslip.month}</ThemedText>
        <ThemedText>Year: {recentPayslip.year}</ThemedText>
        <ThemedText>File: {recentPayslip.file}</ThemedText>
        {role === 'hr' && <ThemedText>Employee ID: {recentPayslip.userId}</ThemedText>}
      </Card>
    </TouchableOpacity>
  );
}
