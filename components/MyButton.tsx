import { StyleSheet, ViewStyle } from 'react-native';
import React from 'react';
import { Button } from '@rneui/base';
import { useTheme } from '@react-navigation/native';

interface MyButtonProps {
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
  size?: 'md' | 'sm' | 'lg';
  width?: number | string;
  style?: ViewStyle;
  iconName?: string;
  iconType?: string;
  marginTop?:string;
  marginBottom?:string;
  marginVertical?:string;
}

const MyButton = ({ title, onPress, disabled, size = 'lg', width = "100%", 
  style,iconName,iconType, marginTop, marginBottom, marginVertical }: MyButtonProps) => {
  const {colors} = useTheme()
  return (
    <Button
      onPress={onPress}
      title={title}
      disabled={disabled}
      size={size}
      buttonStyle={{ borderRadius: 20, backgroundColor: colors.primary }} 
      containerStyle={[{ width, marginTop, marginBottom, marginVertical },style]}
      titleStyle={{ fontSize: 16,color:colors.background }}
      icon={iconName && iconType ? { name: iconName, type: iconType, color: colors.text, size: 15 } : null}
    />
  );
};

export default MyButton;

const styles = StyleSheet.create({});