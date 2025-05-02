import { StyleSheet, View, FlatList, Button, Alert, Share, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyText from '../components/MyText';
import Page from '../components/Page';
import * as Clipboard from 'expo-clipboard';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/base';
import RecipePreview from '../components/RecipePreview';

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const nav = useNavigation();

  const loadRecipes = async () => {
    try {
      const savedRecipes = JSON.parse((await AsyncStorage.getItem('savedRecipes')) || '[]');
      setRecipes(savedRecipes);
    } catch (error) {
      console.error('Failed to load recipes:', error);
    }
  };

  const deleteRecipe = async (id: number) => {
    try {
      const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
      setRecipes(updatedRecipes);
      await AsyncStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
      Alert.alert('Success', 'Recipe deleted successfully!');
    } catch (error) {
      console.error('Failed to delete recipe:', error);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  return (
    <Page>
      <View style={styles.topRow}>
        <Icon size={25} onPress={() => nav.navigate("IngredientsInput")} name="arrow-back" />
        <MyText style={{ alignSelf: 'center' }} fontSize="large" bold>Saved Recipes</MyText>
        <View />
      </View>
      <View style={styles.mainCon}>
        {recipes.length > 0 ? (
          <FlatList
            data={recipes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <RecipePreview
                recipeTitle={item.content.recipe}
                cookingTime={item.content.cookingTime}
                difficulty={item.content.difficulty}
                onPress={() => nav.navigate("ViewSavedRecipe", { recipe: item.content })}
                onDelete={() => deleteRecipe(item.id)} 
              />
            )}
          />
        ) : (
          <MyText color="gray">You haven't saved any recipes yet.</MyText>
        )}
      </View>
    </Page>
  );
};

export default SavedRecipes;

const styles = StyleSheet.create({
  mainCon: {
    justifyContent: 'center',
    alignItems: 'center',
    width:"100%",
    flex:0.92
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom:"5%"
  },
});