import { StyleSheet, Text, View, Button, Image, ActivityIndicator, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Page from '../components/Page'
import MyText from '../components/MyText'

const apiKey = process.env.EXPO_PUBLIC_API_KEY

const VerifyIngredients = () => {
  const nav = useNavigation()
  const route = useRoute()
  const { imageUri, base64 } = route.params || {}
  const [ingredients, setIngredients] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showInput, setShowInput] = useState(false)
  const [userInput, setUserInput] = useState<string>('')

  const createRecipe = () => {
    nav.navigate('ViewRecipe',{ ingredients, userInput })
  }

  useEffect(() => {
    async function examineImage() {
      if (!base64) return
      setLoading(true)
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `List the food ingredients shown in an image. Output only a comma-separated list, no explanations. 
                If no ingredients are visible, respond with: "I don't see any food ingredients in this image."`,
              },
              {
                role: 'user',
                content: [
                  { type: 'text', text: 'List the food ingredients shown in this image. Only output a simple comma-separated list, no explanations.' },
                  { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64}` } }
                ],
              },
            ],
          }),
        })

        const data = await response.json()
        if (!response.ok) throw new Error(data.error?.message || 'Unknown error')

        const reply = data.choices?.[0]?.message?.content
        setIngredients(reply || 'No ingredients found.')
      } catch (e: any) {
        console.error(e)
        setError('Failed to analyze image.')
      } finally {
        setLoading(false)
      }
    }

    examineImage()
  }, [])

  const isProceedDisabled = !ingredients || ingredients.toLowerCase().includes("no ingredients") || ingredients.toLowerCase().includes("don't see any food ingredients")

  return (
    <Page>
      <MyText>Verify Ingredients</MyText>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <MyText>No image selected</MyText>
      )}
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginVertical: 20 }} />
      ) : error ? (
        <MyText>{error}</MyText>
      ) : ingredients ? (
        <MyText>Ingredients detected: {ingredients}</MyText>
      ) : (
        <MyText>No ingredients detected.</MyText>
      )}
      {showInput && (
        <TextInput
          style={styles.input}
          placeholder="Enter missing or corrected ingredients"
          value={userInput}
          onChangeText={setUserInput}
        />
      )}
      <Button title="Proceed" onPress={createRecipe} disabled={isProceedDisabled && !userInput} />
      <Button title="Something's Wrong" disabled={loading || !ingredients || isProceedDisabled } onPress={() => setShowInput(true)} />
      <Button title="Back" onPress={nav.goBack} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
})