import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import MyText from './MyText';
import { Icon } from '@rneui/base';
import { useTheme } from '@react-navigation/native';
import MyIcon from './MyIcon';

interface RecipePreviewProps {
  recipeTitle?: string;
  cookingTime?: string;
  difficulty?: string;
  onPress?: () => void;
  onDelete?: () => void;
}

const RecipePreview = (props: RecipePreviewProps) => {
  const {colors} = useTheme()
  return (
  <TouchableOpacity activeOpacity={0.5} onPress={props.onPress} style={[styles.container,
  {backgroundColor:colors.card,borderColor:colors.border}]}>
        <MyText bold fontSize="normal">{props.recipeTitle}</MyText> 
        <View style={{ marginTop: "3%",gap:"5%" }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: '2%' }}>
              <MyIcon iconName='clock' iconType='feather' size={18} />
              <MyText fontSize="small">Cooking Time: {props.cookingTime}</MyText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: '2%' }}>
              <MyIcon iconName='flame' iconType='ionicon' size={18} />
              <MyText fontSize="small">Difficulty: {props.difficulty}</MyText>
            </View>
        </View>
        <TouchableOpacity onPress={props.onDelete} style = {styles.bottomRow}>
          <MyIcon size={20} iconName="trash" iconType="feather" />
        </TouchableOpacity>
  </TouchableOpacity>
  );
};


export default RecipePreview;

const styles = StyleSheet.create({
  container: {
    justifyContent:"center",
    alignItems:"flex-start",
    width: '100%',
    borderWidth: 1,
    borderRadius: 30,
    height:150,
    marginVertical:"2%",
    padding: '5%',
  },
  bottomRow:{
    alignItems: 'center',
    width: '100%',
    flexDirection:"row-reverse",
    gap:"2%"
  },
});