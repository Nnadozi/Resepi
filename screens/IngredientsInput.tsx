import { Button, StyleSheet, Alert } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker'
import Page from '../components/Page'
import MyText from '../components/MyText'
import { useNavigation } from '@react-navigation/native'

const IngredientsInput = () => {
  const nav = useNavigation()

  const handleImageAction = async (action: 'library' | 'camera') => {
    const permissionResult =
      action === 'library'
        ? await ImagePicker.requestMediaLibraryPermissionsAsync()
        : await ImagePicker.requestCameraPermissionsAsync()

    if (!permissionResult.granted) {
      Alert.alert('Permission required', `You need to grant permission to access the ${action}.`)
      return
    }

    const result =
      action === 'library'
        ? await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: false, quality: 1 })
        : await ImagePicker.launchCameraAsync({ allowsEditing: false, quality: 1 })

    if (!result.canceled) {
      nav.navigate('VerifyIngredients', { imageUri: result.assets[0].uri})
    }
  }

  return (
    <Page>
      <MyText>Ingredients Input</MyText>
      <Button title='Upload Image' onPress={() => handleImageAction('library')} />
      <Button title='Take Picture' onPress={() => handleImageAction('camera')} />
    </Page>
  )
}

export default IngredientsInput

const styles = StyleSheet.create({})