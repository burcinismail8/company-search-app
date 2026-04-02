import { ScreenContent } from 'components/ScreenContent';
import { SearchField } from 'components/SearchField';

import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CompaniesList from 'components/CompaniesList';
import mockData from 'data/mockData.json';
import { ICompany, ICompanyFilters, ICompanySort } from 'types';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FilterModal from 'components/FilterModal';
import { applyCompanyFilters, customSearch, sortCompanies } from 'helpers/utils';
import SortModal from 'components/SortModal';

const initialFilters: ICompanyFilters = {
  companyType: 'All',
  industry: 'All',
  minRevenue: null,
  size: 'All',
};

const initialSort: ICompanySort = {
  direction: 'asc',
  field: 'name',
};

export default function App() {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [filters, setFilters] = useState<ICompanyFilters>(initialFilters);
  const [sort, setSort] = useState<ICompanySort>(initialSort);

  const industries = Array.from(
    new Set((mockData as ICompany[]).map((company) => company.industry))
  );

  useEffect(() => {
    const searched = customSearch(searchQuery, mockData as ICompany[]);
    const filtered = applyCompanyFilters(searched, filters);
    const sorted = sortCompanies(filtered, sort);
    setCompanies(sorted);
  }, [searchQuery, filters, sort]);

  return (
    <SafeAreaProvider>
      <ScreenContent>
        <View>
          <SearchField searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <View className="m-3 flex-row items-center justify-center gap-2 px-4">
            {/* Filter Button */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setFilterModalVisible(true)}
              className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-blue-50 py-3">
              <Ionicons name="filter" size={18} color="#3b82f6" />
              <Text className="text-sm font-bold text-blue-600">Filter</Text>
            </TouchableOpacity>

            {/* Sort Button */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setSortModalVisible(true)}
              className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 py-3">
              <Ionicons name="arrow-up-circle" size={18} color="#10b981" />
              <Text className="text-sm font-bold text-emerald-600">Sort</Text>
            </TouchableOpacity>
          </View>
        </View>
        <CompaniesList companies={companies} />
        <FilterModal
          visible={filterModalVisible}
          onClose={() => setFilterModalVisible(false)}
          filters={filters}
          industries={industries}
          onReset={() => setFilters(initialFilters)}
          onApply={(nextFilters) => setFilters(nextFilters)}
        />
        <SortModal
          visible={sortModalVisible}
          onClose={() => setSortModalVisible(false)}
          sort={sort}
          onApply={(nextSort) => setSort(nextSort)}
          onReset={() => setSort(initialSort)}
        />
      </ScreenContent>
    </SafeAreaProvider>
  );
}
