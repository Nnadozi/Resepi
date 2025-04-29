import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface MyTextProps {
  children: React.ReactNode
  bold?: boolean;
  fontSize?: 'small' | 'normal' | 'large' | 'XL'
  maxWidth?: string;
}

const fontSizes = {
  small: 15,
  normal: 18 ,
  large: 25,
  XL: 30,
}

const MyText = ({ children, bold, fontSize = 'normal', maxWidth }: MyTextProps) => {
    return (
      <Text style={[{ fontSize: fontSizes[fontSize] }, bold && { fontWeight: 'bold' },{maxWidth:maxWidth}]}>
        {children}
      </Text>
    )
}

export default MyText

const styles = StyleSheet.create({})