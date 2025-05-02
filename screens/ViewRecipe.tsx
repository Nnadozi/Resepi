import { StyleSheet, View, ActivityIndicator, ScrollView, Share } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Page from '../components/Page';
import MyText from '../components/MyText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import MyButton from '../components/MyButton';
import { Icon } from '@rneui/base';

const apiKey = process.env.EXPO_PUBLIC_API_KEY;

const formatRecipe = (data: any) => {
  return `🍽️ Recipe: ${data.recipe}
⏱️ Cooking Time: ${data.cookingTime}
🔥 Difficulty: ${data.difficulty}

📝 Ingredients:
${data.ingredients.map((item: string) => `- ${item}`).join('\n')}

👨‍🍳 Instructions:
${data.instructions.map((step: string, i: number) => `${i + 1}. ${step}`).join('\n')}`;
};

const ViewRecipe = () => {
  const nav = useNavigation();
  const route = useRoute();
  const { ingredients, userInput } = route.params || {};

  const [recipeData, setRecipeData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadingPhrases = [
    'Cooking up your recipe...',
    'Mixing ingredients for your dish...',
    'Preparing your delicious recipe...',
    'Whipping up something tasty...',
    'Creating your culinary masterpiece...',
  ];

  const randomPhrase = loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)];

  useEffect(() => {
    const generateRecipe = async () => {
      if (!ingredients) return;

      setLoading(true);
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4.1-nano',
            messages: [
              {
                role: 'system',
                content: `You are a recipe generator. Generate a recipe using the provided ingredients.
              
              ONLY add additional ingredients if the provided ingredients are NOT enough to make any kind of reasonable dish.
              For example, if the provided ingredients are just salt and pepper, you should add additional ingredients to make an actual dish.
              
              If additional ingredients are needed, clearly label them as "(additional)" and keep them minimal and logical.
              
              If the given ingredients are enough to make a real dish, DO NOT add anything else.
              
              Return the recipe in the following JSON format:
              {
                "recipe": "Name of the recipe",
                "cookingTime": "Time range (e.g., 30-45 minutes)",
                "difficulty": "Easy / Medium / Hard",
                "ingredients": [array of strings; label additions with '(additional)'],
                "instructions": [array of steps]
              }`
              },
              {
                role: 'user',
                content: `Ingredients: ${ingredients}.
              Notes or corrections (if any): ${userInput}`
              }
              
            ],
          }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error?.message || 'Failed to generate recipe.');

        const reply = data.choices?.[0]?.message?.content;
        setRecipeData(JSON.parse(reply));
      } catch (e: any) {
        console.error(e);
        setError('Failed to generate recipe.');
      } finally {
        setLoading(false);
      }
    };

    generateRecipe();
  }, [ingredients, userInput]);

  const saveRecipe = async () => {
    if (!recipeData) return;

    try {
      const savedRecipes = JSON.parse((await AsyncStorage.getItem('savedRecipes')) || '[]');
      const newRecipe = {
        id: Date.now(),
        content: recipeData,
      };

      await AsyncStorage.setItem('savedRecipes', JSON.stringify([...savedRecipes, newRecipe]));
      alert('Recipe saved successfully!');
      nav.navigate('SavedRecipes');
    } catch (error) {
      console.error('Failed to save recipe:', error);
      alert('Failed to save the recipe.');
    }
  };

  const copyToClipboard = async () => {
    if (!recipeData) return;
    const formatted = formatRecipe(recipeData);
    await Clipboard.setStringAsync(formatted);
  };

  const shareRecipe = async () => {
    if (!recipeData) return;
    try {
      const formatted = formatRecipe(recipeData);
      await Share.share({
        message: formatted,
      });
    } catch (error) {
      console.error('Failed to share recipe:', error);
    }
  };

  return (
    <Page>
      {loading ? (
        <>
          <MyText bold>{randomPhrase}</MyText>
          <ActivityIndicator size="large" color="#5b9ef0" style={{ marginVertical: '5%' }} />
        </>
      ) : error ? (
        <MyText>{error}</MyText>
      ) : recipeData ? (
        <ScrollView style={styles.recipeContainer} contentContainerStyle={{ paddingBottom: '10%' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <MyText bold fontSize='large'>Enjoy!</MyText>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Icon name='copy' type='feather' onPress={copyToClipboard} />
              <Icon name="share" type='entypo' onPress={shareRecipe} />
            </View>
          </View>
          <MyText style={{ marginVertical: "1%" }}>Recipe: {recipeData.recipe}</MyText>
          <View style={{ marginTop: "3%" }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: '2%' }}>
              <Icon name='clock' type='feather' size={18} />
              <MyText fontSize="small">Cooking Time: {recipeData.cookingTime}</MyText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: '2%' }}>
              <Icon name='flame' type='ionicon' size={18} />
              <MyText fontSize="small">Difficulty: {recipeData.difficulty}</MyText>
            </View>
          </View>
          <MyText bold style={{ marginTop: "3%" }}>Ingredients:</MyText>
          {recipeData.ingredients.map((ingredient: string, index: number) => (
            <MyText style={{ marginVertical: "1%" }} key={index}>• {ingredient}</MyText>
          ))}
          <MyText bold style={{ marginTop: "3%" }}>Instructions:</MyText>
          {recipeData.instructions.map((instruction: string, index: number) => (
            <MyText style={{ marginVertical: "1%" }} key={index}>{index + 1}. {instruction}</MyText>
          ))}
        </ScrollView>
      ) : (
        <MyText>No ingredients provided.</MyText>
      )}
      {recipeData && (
        <View style={styles.bottomButtons}>
          <MyText color='gray' style={{ transform: [{ scale: 0.8 }] }} fontSize={3} textAlign="center">
            ⚠️ Recipes are AI-generated. Always double-check ingredients and instructions.
          </MyText>
          <MyButton style={{ marginTop: '2.5%' }} title="Thanks!" onPress={() => nav.navigate('IngredientsInput')} />
          <MyButton iconName="save" style={{ marginTop: '2.5%' }} title="Save to History" onPress={saveRecipe} />
        </View>
      )}
    </Page>
  );
};

export default ViewRecipe;

const styles = StyleSheet.create({
  recipeContainer: {
    marginTop: '7.5%',
  },
  bottomButtons: {
    marginTop: '2%',
    width: '100%',
    marginBottom: '2%',
  },
});
