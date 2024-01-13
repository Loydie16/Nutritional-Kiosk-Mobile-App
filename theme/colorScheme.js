import { useColorScheme as nativeUseColorScheme } from 'nativewind';

export function useColorScheme() {
  const { colorScheme, toggleColorScheme } = nativeUseColorScheme();
  return { colorScheme, toggleColorScheme };
}
