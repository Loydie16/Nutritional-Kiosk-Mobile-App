import { useColorScheme as nativeUseColorScheme } from 'nativewind';

export function useColorScheme() {
  const { colorScheme, toggleColorScheme, setColorScheme } = nativeUseColorScheme();
  return { colorScheme, toggleColorScheme, setColorScheme };
}
