import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Timestamp } from 'firebase/firestore';
import ThemedText from './ThemedText';
import Card from './Card';
import RequestBadge from './RequestBadge';
import { formatDateLabel } from '../utils/formatDate';
import Button from './Button';
import { lightColors, darkColors } from '../constants/colors';
import { useThemeContext } from '../context/ThemeContext';
import { useEmployees } from '../hooks/useEmployees';
import { getDisplayName } from '../utils/getDisplayName';

interface Request {
  id: string;
  userId: string;
  fromDate: any;
  toDate: any;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  userEmail?: string;
  type: 'Holiday' | 'Work from home' | 'Medical';
}

interface Props {
  item: Request;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  title?: string;
  subtitle?: string;
}

const toDate = (input: any): Date => {
  if (!input) return new Date('');
  if (input instanceof Timestamp) return input.toDate();
  if (input.seconds && input.nanoseconds) return new Timestamp(input.seconds, input.nanoseconds).toDate();
  return new Date(input);
};

export default function RequestCard({ item, onApprove, onReject, title, subtitle }: Props) {
  const { employees } = useEmployees();
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? darkColors : lightColors;

  const employeeName = getDisplayName(item.userId, employees, { email: item.userEmail });

  return (
    <Card title={(title ?? employeeName) || 'Request'} iconName="calendar-clock">
      {subtitle && <ThemedText style={{ fontSize: 14, marginBottom: 6, color: colors.textSecondary }}>From: {employeeName}</ThemedText>}

      <RequestBadge type={item.type} />

      <ThemedText>
        Date: {formatDateLabel(toDate(item.fromDate))} → {formatDateLabel(toDate(item.toDate))}
      </ThemedText>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ThemedText>Status: </ThemedText>
        <ThemedText
          style={{
            color:
              item.status === 'approved'
                ? colors.success
                : item.status === 'rejected'
                  ? colors.danger
                  : colors.textSecondary,
            fontWeight: 'bold',
          }}
        >
          {item.status}
        </ThemedText>
      </View>

      <ThemedText>Message: {item.message}</ThemedText>

      {item.status === 'pending' && onApprove && onReject && (
        <View style={styles.buttonRow}>
          <Button
            title="Approve"
            backgroundColor={colors.success}
            onPress={() => onApprove(item.id)}
            style={{ flex: 1 }}
          />
          <View style={{ width: 10 }} />
          <Button
            title="Reject"
            backgroundColor={colors.danger}
            onPress={() => onReject(item.id)}
            style={{ flex: 1 }}
          />
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
