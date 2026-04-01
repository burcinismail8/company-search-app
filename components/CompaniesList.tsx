import { ScrollView } from 'react-native';
import React from 'react';
import { ICompany } from 'types';
import CompanyCard from './CompanyCard';

interface CompaniesListProps {
  companies: ICompany[];
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
