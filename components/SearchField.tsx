import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

export function SearchField() {
  const [query, setQuery] = useState('');

  return (
    <View className={styles.wrapper}>
      <View className={styles.field}>
        <View className={styles.iconSearch}>
          <Ionicons name="search" size={20} color="#6b7280" />
        </View>
        <TextInput
          className={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Search"
          placeholderTextColor="#9ca3af"
        />
        {query.length > 0 ? (
          <Pressable
            accessibilityLabel="Clear search"
            className={styles.clearHit}
            hitSlop={8}
            onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={22} color="#9ca3af" />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = {
  clearHit: `p-1`,
  field: `flex-row items-center rounded-lg border border-gray-200 bg-gray-50 px-3`,
  iconSearch: `mr-2`,
  input: `min-h-[48px] flex-1 py-3 text-base text-gray-900`,
  wrapper: `w-full px-4 pt-2`,
};
