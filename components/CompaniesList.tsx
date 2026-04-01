import { ScrollView } from 'react-native';
import React from 'react';
import { Company } from 'types';
import CompanyCard from './CompanyCard';

interface CompaniesListProps {
  companies: Company[];
}

const CompaniesList: React.FC<CompaniesListProps> = ({ companies }) => {
  return (
    <ScrollView>
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </ScrollView>
  );
};

export default CompaniesList;
