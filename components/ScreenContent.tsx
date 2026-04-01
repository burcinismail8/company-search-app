import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenContentProps {
  children?: React.ReactNode;
}

export const ScreenContent: React.FC<ScreenContentProps> = ({ children }) => {
  return (
    <View className={styles.root}>
      <SafeAreaView className={styles.safe} edges={['top', 'left', 'right']}>
        {children}
      </SafeAreaView>
    </View>
  );
};

const styles = {
  root: `flex-1 bg-white`,
  safe: `flex-1`,
};
