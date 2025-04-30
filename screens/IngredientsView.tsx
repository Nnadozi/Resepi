import { StyleSheet, View, FlatList, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Page from '../components/Page';
import MyButton from '../components/MyButton';
import MyText from '../components/MyText';

const IngredientsView = () => {
  const nav = useNavigation();
  const route = useRoute();
  const { ingredients } = route.params || {};
  const [userInput, setUserInput] = useState(''); 
  const generateRecipe = () => {
    nav.navigate('ViewRecipe', { ingredients, userInput }); 
  };

  const ingredientList = ingredients ? ingredients.split(',').map((item) => item.trim()) : [];

  return (
    <Page style={styles.container}>
      <MyText bold fontSize="large">Detected Ingredients</MyText>
      <FlatList
        data={ingredientList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <MyText style={{marginVertical:"2%"}}>• {item}</MyText>
        )}
        style={{marginVertical:"2%", width: '100%'}}
      />
      <View style={styles.feedbackContainer}>
        <MyText style={{marginBottom:"2%"}} fontSize='small'>Is something wrong with the ingredients?</MyText>
        <TextInput
          style={styles.textInput}
          placeholder="Explain what's missing or incorrect..."
          value={userInput}
          onChangeText={setUserInput}
          multiline
        />
      </View>
      <View style={{ width: '100%' }}>
        <MyButton style={{marginTop:'2.5%'}} width="100%" title="Proceed" onPress={generateRecipe} />
        <MyButton iconName='cancel' style={{marginTop:'2.5%'}} width="100%" title="Cancel" onPress={() => nav.navigate('IngredientsInput')} />
      </View>
    </Page>
  );
};

export default IngredientsView;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: '7.5%',
    marginBottom: '2%',
    paddingHorizontal: '5%',
  },
  feedbackContainer: {
    marginVertical: 10,
    width: '100%',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    padding:"3%",
    fontSize: 16,
    width: '100%',
    minHeight: "20%",
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: '2%',
  },
});