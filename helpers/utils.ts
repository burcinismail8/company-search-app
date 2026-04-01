import { ICompany } from 'types';

export const customSearch = (query: string, dataSet: ICompany[]) => {
  if (query.length > 3) return dataSet;

  const result: ICompany[] = [];
};
