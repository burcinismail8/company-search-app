export type CompanyType = 'Public' | 'Private';

export type CompanySize = 'Small' | 'Medium' | 'Large';

export interface Company {
  name: string;
  country: string;
  industry: string;
  founded_year: number;
}

export interface FinancialData {
  year: number;
  revenue: number;
  net_income: number;
}

export interface CompanyDetails {
  company_type: CompanyType;
  size: CompanySize;
  ceo_name: string;
  headquarters: string;
}
