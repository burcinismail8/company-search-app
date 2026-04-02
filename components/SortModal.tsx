import { View, Text, TouchableWithoutFeedback, Modal, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ICompanySort, SortDirection, SortField } from 'types';

interface SortModalProps {
  visible: boolean;
  onClose: () => void;
  sort: ICompanySort;
  onApply: (nextSort: ICompanySort) => void;
  onReset: () => void;
}

const SORT_FIELDS: { key: SortField; label: string }[] = [
  { key: 'name', label: 'Name' },
  { key: 'industry', label: 'Industry' },
  { key: 'founded_year', label: 'Founded Year' },
  { key: 'revenue', label: 'Revenue (latest year)' },
];

const SORT_DIRECTIONS: { key: SortDirection; label: string }[] = [
  { key: 'asc', label: 'Ascending' },
  { key: 'desc', label: 'Descending' },
];

const SortModal: React.FC<SortModalProps> = ({ visible, onClose, sort, onApply, onReset }) => {
  const [draftSort, setDraftSort] = useState<ICompanySort>(sort);

  useEffect(() => {
    if (visible) setDraftSort(sort);
  }, [visible, sort]);

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-end bg-black/50">
          <TouchableWithoutFeedback>
            <View className="rounded-t-[32px] bg-white p-6 pb-10 shadow-xl">
              <View className="mb-6 flex-row items-center justify-between">
                <Text className="text-xl font-bold text-slate-900">Sort Results</Text>
                <TouchableOpacity onPress={onClose} className="rounded-full bg-slate-100 p-2">
                  <Ionicons name="close" size={20} color="#64748b" />
                </TouchableOpacity>
              </View>

              <View className="mb-6">
                <Text className="mb-3 text-base font-semibold text-slate-700">Sort Field</Text>
                <View className="gap-2">
                  {SORT_FIELDS.map((field) => {
                    const isActive = draftSort.field === field.key;
                    return (
                      <TouchableOpacity
                        key={field.key}
                        onPress={() => setDraftSort((prev) => ({ ...prev, field: field.key }))}
                        className="flex-row items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
                        <Ionicons
                          name={isActive ? 'radio-button-on' : 'radio-button-off'}
                          size={20}
                          color={isActive ? '#10b981' : '#94a3b8'}
                        />
                        <Text className="text-slate-700">{field.label}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <View className="mb-6">
                <Text className="mb-3 text-base font-semibold text-slate-700">Direction</Text>
                <View className="flex-row gap-2">
                  {SORT_DIRECTIONS.map((direction) => {
                    const isActive = draftSort.direction === direction.key;
                    return (
                      <TouchableOpacity
                        key={direction.key}
                        onPress={() =>
                          setDraftSort((prev) => ({ ...prev, direction: direction.key }))
                        }
                        className={`flex-1 items-center rounded-lg border px-3 py-2 ${
                          isActive
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-slate-200 bg-white'
                        }`}>
                        <Text
                          className={
                            isActive ? 'font-semibold text-emerald-700' : 'text-slate-700'
                          }>
                          {direction.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

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
                    onApply(draftSort);
                    onClose();
                  }}
                  className="rounded-lg bg-emerald-500 px-5 py-2">
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

export default SortModal;
