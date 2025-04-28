import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Page from '../components/Page'
import MyText from '../components/MyText'

const ViewRecipe = () => {
  const nav = useNavigation()
  return (
    <Page>
      <MyText>View Recipe</MyText>
    </Page>
  )
}

export default ViewRecipe

const styles = StyleSheet.create({})