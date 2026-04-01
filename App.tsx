import { ScreenContent } from 'components/ScreenContent';
import { SearchField } from 'components/SearchField';

import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CompaniesList from 'components/CompaniesList';
import mockData from 'data/mockData.json';
import { ICompany } from 'types';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export default function App() {
  const [companies, setCompanies] = useState<ICompany[]>([]);
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
      setCompanies(filteredCompanies as ICompany[]);
    } else {
      setCompanies(mockData as ICompany[]);
    }
  }, [searchQuery]);
  return (
    <SafeAreaProvider>
      <ScreenContent>
        <View>
          <SearchField searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <View className="m-3 flex-row items-center justify-center gap-2 px-4">
            {/* Filter Button */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => console.log('Filter Pressed')}
              className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-blue-50 py-3">
              <Ionicons name="filter" size={18} color="#3b82f6" />
              <Text className="text-sm font-bold text-blue-600">Filter</Text>
            </TouchableOpacity>

            {/* Sort Button */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => console.log('Sort Pressed')}
              className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 py-3">
              <Ionicons name="arrow-up-circle" size={18} color="#10b981" />
              <Text className="text-sm font-bold text-emerald-600">Sort</Text>
            </TouchableOpacity>
          </View>
        </View>
        <CompaniesList companies={companies} />
      </ScreenContent>
    </SafeAreaProvider>
  );
}
