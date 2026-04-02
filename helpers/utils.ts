import { ICompany, ICompanyFilters } from 'types';

const normalizeText = (value: string): string => value.trim().toLowerCase();

const getSearchableTokens = (company: ICompany): string[] => {
  const tokens = [
    company.id,
    company.name,
    company.country,
    company.industry,
    String(company.founded_year),
    company.details.company_type,
    company.details.size,
    company.details.ceo_name,
    company.details.headquarters,
  ];

  for (let i = 0; i < company.financialData.length; i += 1) {
    const entry = company.financialData[i];
    tokens.push(String(entry.year), String(entry.revenue), String(entry.net_income));
  }

  return tokens;
};

export const customSearch = (query: string, dataSet: ICompany[]): ICompany[] => {
  const normalizedQuery = normalizeText(query);
  if (normalizedQuery.length < 3) return dataSet;

  const result: ICompany[] = [];
  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  for (let i = 0; i < dataSet.length; i += 1) {
    const company = dataSet[i];
    const tokens = getSearchableTokens(company);

    let matchesAllTerms = true;
    for (let termIndex = 0; termIndex < terms.length; termIndex += 1) {
      const term = terms[termIndex];
      let termMatched = false;

      for (let tokenIndex = 0; tokenIndex < tokens.length; tokenIndex += 1) {
        const token = normalizeText(tokens[tokenIndex]);
        if (token === term || token.indexOf(term) >= 0) {
          termMatched = true;
          break;
        }
      }

      if (!termMatched) {
        matchesAllTerms = false;
        break;
      }
    }

    if (matchesAllTerms) result.push(company);
  }

  return result;
};

const getLatestRevenue = (company: ICompany): number => {
  if (company.financialData.length === 0) return 0;

  let latest = company.financialData[0];
  for (let i = 1; i < company.financialData.length; i += 1) {
    if (company.financialData[i].year > latest.year) latest = company.financialData[i];
  }

  return latest.revenue;
};

export const applyCompanyFilters = (
  companies: ICompany[],
  filters: ICompanyFilters
): ICompany[] => {
  const result: ICompany[] = [];

  for (let i = 0; i < companies.length; i += 1) {
    const company = companies[i];
    let matches = true;

    if (
      filters.industry !== 'All' &&
      normalizeText(company.industry) !== normalizeText(filters.industry)
    ) {
      matches = false;
    }

    if (matches && filters.size !== 'All' && company.details.size !== filters.size) {
      matches = false;
    }

    if (
      matches &&
      filters.companyType !== 'All' &&
      company.details.company_type !== filters.companyType
    ) {
      matches = false;
    }

    if (
      matches &&
      filters.minRevenue !== null &&
      !(getLatestRevenue(company) > filters.minRevenue)
    ) {
      matches = false;
    }

    if (matches) result.push(company);
  }

  return result;
};
