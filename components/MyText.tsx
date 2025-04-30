import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'

interface MyTextProps {
  children: React.ReactNode
  bold?: boolean;
  fontSize?: 'small' | 'normal' | 'large' | 'XL'
  maxWidth?: string;
  style?:ViewStyle
  textAlign?:string;
}

const fontSizes = {
  small: 15,
  normal: 18 ,
  large: 25,
  XL: 30,
}

const MyText = ({ children, bold, fontSize = 'normal', maxWidth,style, textAlign }: MyTextProps) => {
    return (
      <Text style={[
        style,
        { fontSize: fontSizes[fontSize] }, 
        bold && { fontWeight: 'bold' },
        {maxWidth:maxWidth},{textAlign:textAlign}
        ]}>
        {children}
      </Text>
    )
}

export default MyText

const styles = StyleSheet.create({})