import { StyleSheet, View, FlatList, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyText from '../components/MyText';
import Page from '../components/Page';
import { useNavigation } from '@react-navigation/native';
import RecipePreview from '../components/RecipePreview';
import MyIcon from '../components/MyIcon';

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
    } catch (error) {
      console.error('Failed to delete recipe:', error);
    }
  };

  const confirmDelete = (id: number) => {
    Alert.alert(
      'Delete Recipe',
      'Are you sure you want to delete this recipe?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteRecipe(id) },
      ]
    );
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  return (
    <Page style={{justifyContent: 'flex-start',alignItems: 'flex-start',marginTop: '7.5%',marginBottom:"2%"}}> 
      <View style={styles.topRow}>
        <MyIcon size={30} onPress={() => nav.navigate("IngredientsInput")} iconName="arrow-back" />
        <MyText style={{ alignSelf: 'center' }} fontSize="large" bold>Saved Recipes</MyText>
        <View /> 
      </View>
      {recipes.length > 0 ? (
          <FlatList
            data={recipes}
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <RecipePreview
                recipeTitle={item.content.recipe}
                cookingTime={item.content.cookingTime}
                difficulty={item.content.difficulty}
                onPress={() => nav.navigate("ViewSavedRecipe", { recipe: item.content })}
                onDelete={() => confirmDelete(item.id)}
              />
            )}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <MyText color="gray">You haven't saved any recipes yet.</MyText>
          </View>        
        )}
    </Page>
  );
};

export default SavedRecipes;

const styles = StyleSheet.create({
  scroll:{
    width:"100%",
     paddingBottom:"10%"
  },
  scrollContent:{
    width:"100%",
    paddingBottom:"10%"
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: "5%",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
