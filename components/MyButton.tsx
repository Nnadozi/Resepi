import { StyleSheet, ViewStyle } from 'react-native';
import React from 'react';
import { Button } from '@rneui/base';

interface MyButtonProps {
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
  size?: 'md' | 'sm' | 'lg';
  width?: number | string;
  style?: ViewStyle;
  iconName?: string;
  iconType?: string;
}

const MyButton = ({ title, onPress, disabled, size = 'lg', width = "100%", style,iconName,iconType }: MyButtonProps) => {
  return (
    <Button
      onPress={onPress}
      title={title}
      disabled={disabled}
      size={size}
      buttonStyle={[{ borderRadius: 20, backgroundColor: 'black' }, style]} 
      containerStyle={{ width }}
      titleStyle={{ fontSize: 15 }}
      icon = {{ name: iconName, type: iconType, color: 'white', size:15 }} 
    />
  );
};

export default MyButton;

const styles = StyleSheet.create({});