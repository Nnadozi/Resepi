import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyText from '../components/MyText';
import Page from '../components/Page';

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  const loadRecipes = async () => {
    try {
      const savedRecipes = JSON.parse((await AsyncStorage.getItem('savedRecipes')) || '[]');
      setRecipes(savedRecipes);
    } catch (error) {
      console.error('Failed to load recipes:', error);
    }
  };

  const clearRecipes = async () => {
    try {
      await AsyncStorage.removeItem('savedRecipes');
      setRecipes([]);
      alert('All recipes cleared!');
    } catch (error) {
      console.error('Failed to clear recipes:', error);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  return (
    <Page>
      <MyText>Saved Recipes</MyText>
      {recipes.length > 0 ? (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.recipeContainer}>
              <MyText>{item.content}</MyText>
            </View>
          )}
        />
      ) : (
        <MyText>No saved recipes found.</MyText>
      )}
      <Button title="Clear All Recipes" onPress={clearRecipes} />
    </Page>
  );
};

export default SavedRecipes;

const styles = StyleSheet.create({
  recipeContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});