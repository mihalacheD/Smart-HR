import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { lightColors, darkColors } from '../constants/colors';
import { useThemeContext } from '../context/ThemeContext';

interface Props {
  onDelete: () => void;
  children: React.ReactNode;
}

export default function SwipeToDelete({ children, onDelete }: Props) {

  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? darkColors : lightColors;

  const renderRightActions = (
    prog: SharedValue<number>,
    drag: SharedValue<number>
  ) => {
    const animatedStyles = useAnimatedStyle(() => ({
      transform: [{ translateX: drag.value + 85 }],
    }));

    return (
      <Animated.View style={[styles.rightActionWrapper, animatedStyles]}>
        <Pressable onPress={onDelete} style={[styles.deleteButton, { backgroundColor: colors.danger }]}>
          <MaterialCommunityIcons name="trash-can" size={24} color="white" />
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <ReanimatedSwipeable
      containerStyle={styles.swipeable}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={renderRightActions}
    >
      {children}
    </ReanimatedSwipeable>
  );
}

const styles = StyleSheet.create({
  swipeable: {
    marginBottom: 12,
  },
  rightActionWrapper: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    height: '90%',
  },
  deleteButton: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
