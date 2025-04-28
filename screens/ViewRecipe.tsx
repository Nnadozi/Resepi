import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import Page from '../components/Page'
import MyText from '../components/MyText'
import Markdown from 'react-native-markdown-display'

const apiKey = process.env.EXPO_PUBLIC_API_KEY

const ViewRecipe = () => {
  const route = useRoute()
  const { ingredients, userInput } = route.params || {}

  const [recipe, setRecipe] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [insufficientIngredients, setInsufficientIngredients] = useState(false)
  const [recommendedRecipe, setRecommendedRecipe] = useState<string | null>(null)

  useEffect(() => {
    const generateRecipe = async () => {
      if (!ingredients) return

      setLoading(true)
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `You are a recipe generator. Create a recipe based on the provided ingredients.
                If the ingredients are insufficient, respond with: "Not enough ingredients to make a dish."`,
              },
              {
                role: 'user',
                content: userInput
                  ? `Generate a recipe using these ingredients: ${ingredients}. Note: The following corrections or missing ingredients were provided: ${userInput}.`
                  : `Generate a recipe using these ingredients: ${ingredients}.`,
              },
            ],
          }),
        })

        const data = await response.json()
        if (!response.ok) throw new Error(data.error?.message || 'Failed to generate recipe.')

        const reply = data.choices?.[0]?.message?.content

        // Check if the ingredients are insufficient
        if (reply?.toLowerCase().includes('not enough ingredients')) {
          setInsufficientIngredients(true)

          // Recommend a recipe with additional ingredients
          const recommendationResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'gpt-4o-mini',
              messages: [
                {
                  role: 'system',
                  content: 'You are a recipe generator. Recommend a recipe with additional ingredients.',
                },
                {
                  role: 'user',
                  content: `The ingredients provided (${ingredients}) are insufficient to make a dish. Recommend a recipe with additional ingredients that can make a complete dish.`,
                },
              ],
            }),
          })

          const recommendationData = await recommendationResponse.json()
          if (!recommendationResponse.ok) throw new Error(recommendationData.error?.message || 'Failed to recommend a recipe.')

          const recommendationReply = recommendationData.choices?.[0]?.message?.content
          setRecommendedRecipe(recommendationReply || 'No recommendation available.')
        } else {
          setRecipe(reply || 'No recipe generated.')
        }
      } catch (e: any) {
        console.error(e)
        setError('Failed to generate recipe.')
      } finally {
        setLoading(false)
      }
    }

    generateRecipe()
  }, [ingredients, userInput])

  return (
    <Page>
      {loading ? (
        <>
          <MyText>Generating recipe...</MyText>
          <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 20 }} />
        </>
      ) : error ? (
        <MyText>{error}</MyText>
      ) : insufficientIngredients ? (
        <ScrollView style={styles.recipeContainer}>
          <MyText>The given ingredients are insufficient to make a dish.</MyText>
          <MyText>Recommended Recipe:</MyText>
          <Markdown>{recommendedRecipe}</Markdown>
        </ScrollView>
      ) : recipe ? (
        <ScrollView style={styles.recipeContainer}>
          <MyText>Generated Recipe:</MyText>
          <Markdown>{recipe}</Markdown>
        </ScrollView>
      ) : (
        <MyText>No ingredients provided.</MyText>
      )}
    </Page>
  )
}

export default ViewRecipe

const styles = StyleSheet.create({
  recipeContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
})