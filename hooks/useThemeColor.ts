import { useThemeContext } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';

export const useThemeColors = () => {
  const { theme } = useThemeContext();
  return theme === 'dark' ? darkColors : lightColors;
};
