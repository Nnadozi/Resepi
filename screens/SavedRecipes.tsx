import { StyleSheet, View, FlatList, Button, Alert, Share, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyText from '../components/MyText';
import Page from '../components/Page';
import * as Clipboard from 'expo-clipboard';
import { useNavigation } from '@react-navigation/native';

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const nav = useNavigation()

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
      Alert.alert('Success', 'All recipes cleared!');
    } catch (error) {
      console.error('Failed to clear recipes:', error);
    }
  };

  const copyToClipboard = async (content: any) => {
    await Clipboard.setStringAsync(content);
    Alert.alert('Copied to Clipboard', 'The recipe has been copied to your clipboard.');
  };

  const shareRecipe = async (content: any) => {
    try {
      await Share.share({
        message: content,title: 'Check out this recipe!',
      });
    } catch (error) {
      console.error('Failed to share recipe:', error);
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
              {typeof item.content === 'string' ? (
                <MyText>{item.content}</MyText> 
              ) : (
                <MyText>{JSON.stringify(item.content, null, 2)}</MyText>
              )}
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => copyToClipboard(typeof item.content === 'string' ? item.content : JSON.stringify(item.content))}
                >
                  <MyText style={styles.actionButtonText}>Copy</MyText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => shareRecipe(typeof item.content === 'string' ? item.content : JSON.stringify(item.content))}
                >
                  <MyText style={styles.actionButtonText}>Share</MyText>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <MyText>No saved recipes found.</MyText>
      )}
      <Button title="Clear All Recipes" onPress={clearRecipes} />
      <Button title="Back" onPress={() => nav.navigate("IngredientsInput")} />
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});