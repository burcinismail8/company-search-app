import React from 'react';
import { Text, View } from 'react-native';

import { ICompany } from 'types';

interface CompanyCardProps {
  company: ICompany;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <View className="mx-5 my-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-300">
      {/* Header Section: Primary Info */}
      <View className="border-b border-slate-100 bg-slate-50/50 p-4">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-2">
            <Text className="text-xl font-bold leading-tight text-slate-900">{company.name}</Text>
            <Text className="mt-1 text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Founded in {company.country}
            </Text>
            <Text className="mt-1 text-xs font-semibold uppercase tracking-wider text-indigo-600">
              {company.founded_year}
            </Text>
          </View>
          <View
            className={`rounded-full px-3 py-1 ${
              company.details.company_type === 'Public' ? 'bg-blue-100' : 'bg-emerald-100'
            }`}>
            <Text
              className={`text-[10px] font-bold uppercase ${
                company.details.company_type === 'Public' ? 'text-blue-800' : 'text-emerald-800'
              }`}>
              {company.details.company_type}
            </Text>
          </View>
        </View>
      </View>

      {/* Details Section: Metadata */}
      <View className="p-4 pt-3">
        <View className="mb-4 flex-row items-center justify-between">
          <View>
            <Text className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">
              CEO
            </Text>
            <Text className="text-sm font-medium text-slate-700">{company.details.ceo_name}</Text>
          </View>
          <View className="items-end">
            <Text className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">
              Size / HQ
            </Text>
            <Text className="text-sm font-medium text-slate-700">
              {company.details.size} • {company.details.headquarters}
            </Text>
          </View>
        </View>

        {/* Financial Data: List Style */}
        <Text className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Financial History
        </Text>

        {company.financialData.map(
          (financial: { year: number; revenue: number; net_income: number }) => (
            <View
              key={financial.year}
              className="mb-2 flex-row items-center justify-between rounded-xl border border-slate-100 bg-slate-50/30 p-3">
              <View>
                <Text className="text-xs font-bold text-slate-900">{financial.year}</Text>
                <Text className="text-[10px] text-slate-500">Fiscal Year</Text>
              </View>

              <View className="items-center">
                <Text className="text-xs font-bold text-slate-900">{financial.revenue}</Text>
                <Text className="text-[10px] text-slate-500">Revenue</Text>
              </View>

              <View className="items-end">
                <Text
                  className={`text-xs font-bold ${financial.net_income >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {financial.net_income}
                </Text>
                <Text className="text-[10px] text-slate-500">Net Income</Text>
              </View>
            </View>
          )
        )}
      </View>
    </View>
  );
};

export default CompanyCard;
