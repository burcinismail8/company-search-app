import { ScreenContent } from 'components/ScreenContent';
import { SearchField } from 'components/SearchField';
import { StatusBar } from 'expo-status-bar';

import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CompaniesList from 'components/CompaniesList';
import mockData from 'data/mockData.json';
import { Company } from 'types';
import { useEffect, useState } from 'react';
export default function App() {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    setCompanies(mockData as Company[]);
  }, []);
  return (
    <SafeAreaProvider>
      <ScreenContent>
        <SearchField />
        <CompaniesList companies={companies} />
      </ScreenContent>
    </SafeAreaProvider>
  );
}
