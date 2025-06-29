import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useThemeContext } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';

interface RequestBadgeProps {
  type: 'Holiday' | 'Work from home' | 'Medical';
}

const RequestBadge: React.FC<RequestBadgeProps> = ({ type }) => {
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? darkColors : lightColors;

  const getColorByType = () => {
    switch (type) {
      case 'Holiday':
        return colors.accent; // portocaliu
      case 'Work from home':
        return colors.secondary; // cyan
      case 'Medical':
        return colors.success; // verde
      default:
        return colors.textSecondary; // fallback gri
    }
  };

  return (
    <View style={[styles.badge, { backgroundColor: getColorByType() }]}>
      <Text style={styles.badgeText}>{type}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
badge: {
  minHeight: 24,
  paddingHorizontal: 10,
  paddingVertical: 2,
  marginBottom: 8,
  borderRadius: 8,
  alignSelf: 'flex-start',
  justifyContent: 'center',
  alignItems: 'center',
},
badgeText: {
  color: 'white',
  fontWeight: '600',
  fontSize: 12,
  lineHeight: 16,
  textAlign: 'center',
},

});

export default RequestBadge;
