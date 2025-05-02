import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import MyText from './MyText';
import { Icon } from '@rneui/base';

interface RecipePreviewProps {
  recipeTitle?: string;
  cookingTime?: string;
  difficulty?: string;
  onPress?: () => void;
  onDelete?: () => void;
}

const RecipePreview = (props: RecipePreviewProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress} style={styles.con}>
        <MyText bold fontSize="normal">{props.recipeTitle}</MyText>
        <MyText fontSize="small">Cooking Time: {props.cookingTime}</MyText>
        <MyText fontSize="small">Difficulty: {props.difficulty}</MyText>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onDelete} style={styles.deleteButton}>
        <Icon name="trash" type="feather" color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default RecipePreview;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  con: {
    borderWidth: 1,
    borderRadius: 30,
    width: '85%',
    padding: '5%',
  },
  deleteButton: {
    marginLeft: 10,
  },
});