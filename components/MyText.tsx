import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';

interface MyTextProps {
  children: React.ReactNode
  bold?: boolean;
  fontSize?: 'small' | 'normal' | 'large' | 'XL'
  maxWidth?: string;
  style?:ViewStyle
  textAlign?:string;
  color?:string;
}

const fontSizes = {
  small: 15,
  normal: 18 ,
  large: 25,
  XL: 30,
}

const MyText = ({ children, bold, fontSize = 'normal', maxWidth,style, textAlign,color }: MyTextProps) => {
    const {colors} = useTheme()
     return (
      <Text style={[
        style,
        { fontSize: fontSizes[fontSize] }, 
        bold && { fontWeight: 'bold' },
        {maxWidth:maxWidth},{textAlign:textAlign},
        {color:color || colors.text} 
        ]}>
        {children}
      </Text>
    )
}

export default MyText

const styles = StyleSheet.create({})