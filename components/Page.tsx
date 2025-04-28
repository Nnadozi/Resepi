import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'

interface PageProps {
    style?: ViewStyle,
    children?: React.ReactNode
    padding?: string;
}

const Page = (props: PageProps) => {
  const defaultPadding = '5%';  
  return (
    <View style={[styles.con, props.style, { padding: props.padding || defaultPadding }]}>
        {props.children}
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
    con: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})
