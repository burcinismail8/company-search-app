export type CompanyType = 'Public' | 'Private';

export type CompanySize = 'Small' | 'Medium' | 'Large';

export interface Company {
  id: string;
  name: string;
  country: string;
  industry: string;
  founded_year: number;
  details: { company_type: CompanyType; size: CompanySize; ceo_name: string; headquarters: string };
  financialData: { year: number; revenue: number; net_income: number }[];
}
