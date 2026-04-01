import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { CompanyType } from 'types';

const FilterModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const [filters, setFilters] = useState<{ type: CompanyType | 'All' }>({ type: 'All' });
  const updateFilter = (key: keyof typeof filters, value: CompanyType | 'All') => {
    setFilters((prev) => ({ ...prev, [key]: value }));
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
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FilterModal;
