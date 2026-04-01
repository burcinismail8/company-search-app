import { ScreenContent } from 'components/ScreenContent';
import { SearchField } from 'components/SearchField';

import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CompaniesList from 'components/CompaniesList';
import mockData from 'data/mockData.json';
import { Company } from 'types';
import { useEffect, useState } from 'react';
export default function App() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    if (searchQuery.length > 3) {
      const filteredCompanies = mockData.filter(
        (company) =>
          company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.details.ceo_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.details.headquarters.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setCompanies(filteredCompanies as Company[]);
    } else {
      setCompanies(mockData as Company[]);
    }
  }, [searchQuery]);
  return (
    <SafeAreaProvider>
      <ScreenContent>
        <SearchField searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <CompaniesList companies={companies} />
      </ScreenContent>
    </SafeAreaProvider>
  );
}
