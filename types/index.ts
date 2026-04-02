export type CompanyType = 'Public' | 'Private';

export type CompanySize = 'Small' | 'Medium' | 'Large';

export interface ICompanyFilters {
  industry: string | 'All';
  size: CompanySize | 'All';
  companyType: CompanyType | 'All';
  minRevenue: number | null;
}

export interface ICompany {
  id: string;
  name: string;
  country: string;
  industry: string;
  founded_year: number;
  details: { company_type: CompanyType; size: CompanySize; ceo_name: string; headquarters: string };
  financialData: { year: number; revenue: number; net_income: number }[];
}
