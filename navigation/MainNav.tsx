import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SavedRecipes from '../screens/SavedRecipes'
import Settings from '../screens/Settings'
import IngredientsInput from '../screens/IngredientsInput'
import VerifyIngredients from '../screens/VerifyIngredients'
import ViewRecipe from '../screens/ViewRecipe'
import IngredientsView from '../screens/IngredientsView'
import ViewSavedRecipe from '../screens/ViewSavedRecipe'

const MainNav = () => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled:false}}>
      <Stack.Screen name="IngredientsInput" component={IngredientsInput}/>
      <Stack.Screen name="VerifyIngredients" component={VerifyIngredients}/>
      <Stack.Screen name="IngredientsView" component={IngredientsView}/>
      <Stack.Screen name="ViewRecipe" component={ViewRecipe}/>
      <Stack.Screen name="SavedRecipes" component={SavedRecipes}/>
      <Stack.Screen name="ViewSavedRecipe" component={ViewSavedRecipe}/>
      <Stack.Screen name="Settings" component={Settings}/>
    </Stack.Navigator>
  )
}

export default MainNav

const styles = StyleSheet.create({})