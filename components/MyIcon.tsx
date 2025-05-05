import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/base';
import { useTheme } from '@react-navigation/native';

interface MyIconProps {
    iconName?:string;
    iconType?:string;
    size?:number
    onPress?:() => void;
    style?:ViewStyle;
}

const MyIcon = (props:MyIconProps) => {
  const {colors} = useTheme()
  return (
    <Icon 
    name={props.iconName || 'default-icon'}
    type={props.iconType}
    size={props.size}
    color={colors.text}
    onPress={props.onPress}
    containerStyle={props.style}
    />
  )
}

export default MyIcon

const styles = StyleSheet.create({})