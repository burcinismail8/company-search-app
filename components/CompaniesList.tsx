import { ScrollView, Text, View } from 'react-native';
import React from 'react';
import { ICompany } from 'types';
import CompanyCard from './CompanyCard';

interface CompaniesListProps {
  companies: ICompany[];
}

const CompaniesList: React.FC<CompaniesListProps> = ({ companies }) => {
  if (companies.length === 0) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-base font-semibold text-slate-700">No results found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </ScrollView>
  );
};

const styles = {
  content: {
    paddingBottom: 20,
  },
};

export default CompaniesList;
