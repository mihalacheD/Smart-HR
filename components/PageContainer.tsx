// components/PageContainer.tsx
import React from 'react';
import { View, ScrollView, StyleSheet, ViewStyle, ScrollViewProps } from 'react-native';
import { useThemeColors } from '../hooks/useThemeColor';

interface Props extends ScrollViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  scrollable?: boolean;
}

export default function PageContainer({ children, style, scrollable = true, ...rest }: Props) {
  const colors = useThemeColors();

  if (scrollable) {
    return (
      <ScrollView
        contentContainerStyle={[styles.content, style]}
        style={{ backgroundColor: colors.background }}
        {...rest}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View style={[styles.content, { backgroundColor: colors.background }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    flexGrow: 1,
  },
});
