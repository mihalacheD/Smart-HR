import React from 'react';
import { View, StyleSheet } from 'react-native';
import ThemedText from './ThemedText';
import Spinner from './Spinner';

interface Props {
  loading: boolean;
  emptyMessage?: string;
}

export default function LoadingOrEmpty({ loading, emptyMessage = 'Nothing found.' }: Props) {
  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <ThemedText style={styles.text}>{emptyMessage}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    opacity: 0.6,
    textAlign: 'center',
  },
});
