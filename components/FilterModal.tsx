import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { CompanySize, CompanyType, ICompanyFilters } from 'types';

const TYPES: (CompanyType | 'All')[] = ['All', 'Private', 'Public'];
const SIZES: (CompanySize | 'All')[] = ['All', 'Small', 'Medium', 'Large'];

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: ICompanyFilters;
  onApply: (nextFilters: ICompanyFilters) => void;
  onReset: () => void;
  industries: string[];
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  filters,
  onApply,
  onReset,
  industries,
}) => {
  const [draftFilters, setDraftFilters] = useState<ICompanyFilters>(filters);

  useEffect(() => {
    if (visible) setDraftFilters(filters);
  }, [visible, filters]);

  const updateDraft = <K extends keyof ICompanyFilters>(key: K, value: ICompanyFilters[K]) => {
    setDraftFilters((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      {/* 1. Backdrop: Dimmed background that closes on tap */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-end bg-black/50">
          {/* 2. Content: The actual "Little Screen" */}
          <TouchableWithoutFeedback>
            <View className="rounded-t-[32px] bg-white p-6 pb-10 shadow-xl">
              {/* Header */}
              <View className="mb-6 flex-row items-center justify-between">
                <Text className="text-xl font-bold text-slate-900">Filter Results</Text>
                <TouchableOpacity onPress={onClose} className="rounded-full bg-slate-100 p-2">
                  <Ionicons name="close" size={20} color="#64748b" />
                </TouchableOpacity>
              </View>

              <ScrollView className="max-h-[420px]" showsVerticalScrollIndicator={false}>
                <View className="mb-6">
                  <Text className="mb-3 text-base font-semibold text-slate-700">Industry</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {['All', ...industries].map((industry) => {
                      const isActive = draftFilters.industry === industry;

                      return (
                        <TouchableOpacity
                          key={industry}
                          onPress={() => updateDraft('industry', industry)}
                          className={`rounded-full border px-4 py-2 ${
                            isActive ? 'border-blue-500 bg-blue-500' : 'border-slate-300 bg-white'
                          }`}>
                          <Text className={`${isActive ? 'text-white' : 'text-slate-700'}`}>
                            {industry}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                <View className="mb-6">
                  <Text className="mb-3 text-base font-semibold text-slate-700">Company Size</Text>
                  <View className="gap-2">
                    {SIZES.map((size) => {
                      const isActive = draftFilters.size === size;
                      return (
                        <TouchableOpacity
                          key={size}
                          onPress={() => updateDraft('size', size)}
                          className="flex-row items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
                          <Ionicons
                            name={isActive ? 'checkbox' : 'square-outline'}
                            size={20}
                            color={isActive ? '#3b82f6' : '#94a3b8'}
                          />
                          <Text className="text-slate-700">{size}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                <View className="mb-6">
                  <Text className="mb-3 text-base font-semibold text-slate-700">Company Type</Text>
                  <View className="gap-2">
                    {TYPES.map((type) => {
                      const isActive = draftFilters.companyType === type;
                      return (
                        <TouchableOpacity
                          key={type}
                          onPress={() => updateDraft('companyType', type)}
                          className="flex-row items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
                          <Ionicons
                            name={isActive ? 'checkbox' : 'square-outline'}
                            size={20}
                            color={isActive ? '#3b82f6' : '#94a3b8'}
                          />
                          <Text className="text-slate-700">{type}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                <View className="mb-2">
                  <Text className="mb-3 text-base font-semibold text-slate-700">
                    Revenue Greater Than
                  </Text>
                  <TextInput
                    value={draftFilters.minRevenue === null ? '' : String(draftFilters.minRevenue)}
                    onChangeText={(value) => {
                      const numeric = Number(value.replace(/[^0-9.-]/g, ''));
                      updateDraft(
                        'minRevenue',
                        Number.isNaN(numeric) || value.length === 0 ? null : numeric
                      );
                    }}
                    keyboardType="numeric"
                    placeholder="e.g. 1000000"
                    placeholderTextColor="#94a3b8"
                    className="rounded-lg border border-slate-300 px-3 py-3 text-slate-900"
                  />
                  <Text className="mt-2 text-xs text-slate-500">
                    Example: 1000000 keeps companies with latest revenue above 1,000,000.
                  </Text>
                </View>
              </ScrollView>

              {/* Actions */}
              <View className="flex-row justify-between">
                <TouchableOpacity
                  onPress={() => {
                    onReset();
                    onClose();
                  }}
                  className="px-4 py-2">
                  <Text className="text-slate-500">Reset</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    onApply(draftFilters);
                    onClose();
                  }}
                  className="rounded-lg bg-blue-500 px-5 py-2">
                  <Text className="font-semibold text-white">Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FilterModal;
