import { StyleSheet, Text, View, Button, Image } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Page from '../components/Page'
import MyText from '../components/MyText'

const apiKey = process.env.EXPO_PUBLIC_RECIPE_API_KEY;
//Use openai api to detect ingredients in the image. gpt-4o-mini or gpt-4.1-nano?

const VerifyIngredients = () => {
  const nav = useNavigation()
  const route = useRoute()
  const { imageUri } = route.params || {}

  const createRecipe = () => {
    nav.navigate('ViewRecipe')
  }

  return (
    <Page>
      <MyText>Verify Ingredients</MyText>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <MyText>No image selected</MyText>
      )}
      <Button title='Proceed' onPress={createRecipe} />
    </Page>
  )
}

export default VerifyIngredients

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginVertical: 20,
  },
})