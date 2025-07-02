import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatDateLabelWithTodayYesterday } from '../utils/formatDate';

interface Props {
  date: Date;
}

export default function DateSeparator({ date }: Props) {
  const label = formatDateLabelWithTodayYesterday(date);

  return (
    <View style={styles.separatorContainer}>
      <Text style={styles.separatorText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  separatorContainer: {
    alignSelf: 'center',
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
    marginVertical: 30,
  },
  separatorText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '600',
  },
});
