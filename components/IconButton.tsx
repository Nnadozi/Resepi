import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/base';
import { useTheme } from '@react-navigation/native';

interface IconButtonProps {
  iconName?: string;
  iconType?: string;
  iconSize?: number;
  onPress?: () => void;
  style?: ViewStyle;
  scale?: number; 
}

const IconButton = (props: IconButtonProps) => {
  const { scale = 1 } = props; 
  const {colors, dark} = useTheme()
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={props.onPress} 
    style={[styles.con, props.style, 
    { transform: [{ scale }] }, 
    {backgroundColor:dark ? colors.border : colors.primary}
    ]}>
      <Icon
        name={props.iconName || 'default-icon'}
        type={props.iconType ?? undefined}
        size={props.iconSize || 50}
        color={dark ? colors.primary : "white"}
      />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  con: {
    backgroundColor: "#5b9ef0",
    padding: "3%",
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
  },
});
