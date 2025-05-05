import { StyleSheet, Text, View, Share, Alert, ScrollView} from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Page from '../components/Page'
import * as Clipboard from 'expo-clipboard';
import MyButton from '../components/MyButton';
import MyText from '../components/MyText';
import { Icon } from '@rneui/base';
import MyIcon from '../components/MyIcon';

const ViewSavedRecipe = () => {
  const route = useRoute()
  const nav = useNavigation()
  const { recipe } = route.params || {}
  const formatRecipe = (data: any) => {
    return `🍽️ Recipe: ${data.recipe}
  ⏱️ Cooking Time: ${data.cookingTime}
  🔥 Difficulty: ${data.difficulty}
  
  📝 Ingredients:
  ${data.ingredients.map((item: string) => `- ${item}`).join('\n')}
  
  👨‍🍳 Instructions:
  ${data.instructions.map((step: string, i: number) => `${i + 1}. ${step}`).join('\n')}
  `;
  };

  const copyToClipboard = async (content: any) => {
    await Clipboard.setStringAsync(formatRecipe(recipe));
    Alert.alert('Copied to Clipboard', 'The recipe has been copied to your clipboard.');
  };

  const shareRecipe = async (content: any) => {
    try {
      await Share.share({
        message: formatRecipe(recipe) ,title: 'Check out this recipe!',
      });
    } catch (error) {
      console.error('Failed to share recipe:', error);
    }
  };
  
  return (
    <Page style={{marginTop:"7.5%"}}>
        <ScrollView  contentContainerStyle={{paddingBottom: '10%'}}>
            <View style={styles.iconRow}>
                <MyText bold fontSize='large'>Enjoy!</MyText>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <MyIcon size={25} iconName='copy' iconType='feather' onPress={copyToClipboard} />
                  <MyIcon size={25} iconName="share" iconType='entypo' onPress={shareRecipe} />
                </View>
            </View>
            <MyText style={{marginVertical:"1%"}}>Recipe: {recipe.recipe}</MyText>
            <View style = {{marginTop:"2%"}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap:'2%' }}>
                  <MyIcon iconName='clock' iconType='feather' size={18} />
                  <MyText fontSize="small">Cooking Time: {recipe.cookingTime}</MyText>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap:'2%' }}>
                  <MyIcon iconName='flame' iconType='ionicon' size={18} />
                  <MyText fontSize="small">Difficulty: {recipe.difficulty}</MyText>
                </View>
            </View>
            <MyText bold style={{ marginTop: "3%" }}>Ingredients:</MyText>
            {recipe.ingredients.map((ingredient: string, index: number) => (
            <MyText style={{marginVertical:"1%"}} key={index}>• {ingredient}</MyText>
            ))}
            <MyText bold style={{ marginTop: "3%" }}>Instructions:</MyText>
            {recipe.instructions.map((instruction: string, index: number) => (
            <MyText style={{marginVertical:"1%"}} key={index}>{index + 1}. {instruction}</MyText>
            ))}
        </ScrollView>
        <View style={{width:"100%", marginBottom:"2%",marginTop:"2%"}}>
            <MyText color = 'gray' style={{  transform: [{ scale: 0.8 }] }} fontSize='small' textAlign="center">
                ⚠️ Recipes are AI-generated. Always double-check ingredients and instructions.
            </MyText>
            <MyButton style={{marginTop:"2%"}} title='Ok' onPress={() => nav.goBack()}/>
        </View>
    </Page>
  )
}

export default ViewSavedRecipe

const styles = StyleSheet.create({
    iconRow:{
     flexDirection: 'row', 
     alignItems: 'center', 
     justifyContent: 'space-between',
     width:"100%"
    }
})