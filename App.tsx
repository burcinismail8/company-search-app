import { ScreenContent } from 'components/ScreenContent';
import { SearchField } from 'components/SearchField';
import { StatusBar } from 'expo-status-bar';

import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <ScreenContent>
        <SearchField />
      </ScreenContent>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
