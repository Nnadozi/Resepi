import { SafeAreaView, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';

interface PageProps {
    style?: ViewStyle,
    children?: React.ReactNode
    padding?: string;
}

const Page = (props: PageProps) => {
  const defaultPadding = '5%';  
  const {currentTheme} = useTheme()
  return (
    <>
    <StatusBar style={currentTheme.dark ? "light" : "dark"} />
    <SafeAreaView  style={[
      styles.con, 
      { padding: props.padding || defaultPadding},
      props.style, 
      ]}>
        {props.children}
    </SafeAreaView>
    </>
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
