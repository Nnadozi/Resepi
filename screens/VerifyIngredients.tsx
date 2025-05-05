import { StyleSheet,  Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import Page from '../components/Page';
import MyText from '../components/MyText';
import MyButton from '../components/MyButton';

const apiKey = process.env.EXPO_PUBLIC_API_KEY;

const VerifyIngredients = () => {
  const nav = useNavigation();
  const route = useRoute();
  const { imageUri, base64 } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noIngredientsFound, setNoIngredientsFound] = useState(false); 

  useFocusEffect(
    useCallback(() => {
      setLoading(false);
      setError(null);
      setNoIngredientsFound(false);
    }, [])
  );

  useEffect(() => {
    async function examineImage() {
      if (!base64) return;
      setLoading(true);
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `List the food ingredients shown in an image. Output only a comma-separated list, no explanations. 
                If no ingredients are visible, respond with: "I don't see any food ingredients in this image."`,
              },
              {
                role: 'user',
                content: [
                  { type: 'text', text: 'List the food ingredients shown in this image (or within an image). Only output a simple comma-separated list, no explanations.' },
                  { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64}` } },
                ],
              },
            ],
          }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error?.message || 'Unknown error');

        const reply = data.choices?.[0]?.message?.content;

        if (reply?.toLowerCase().includes("i don't see any food ingredients")) {
          setNoIngredientsFound(true); 
        } else {
          nav.navigate('IngredientsView', { ingredients: reply }); 
        }
      } catch (e: any) {
        console.error(e);
        setError('Failed to analyze image.');
      } finally {
        setLoading(false);
      }
    }
    examineImage();
  }, []);

  const handleCancel = () => {
    nav.goBack();
  };

  return (
    <Page>
      <MyText bold fontSize="large">Verifying Ingredients...</MyText>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <MyText>No image selected</MyText>
      )}
      {loading ? (
        <ActivityIndicator size="large" color="#5b9ef0" style={{ marginTop: '7.5%', transform: [{ scale: 1.25 }] }} />
      ) : error ? (
        <MyText>{error}</MyText>
      ) : noIngredientsFound ? ( 
        <>
          <MyText textAlign='center' style={{ marginVertical: '5%' }}>
            No food ingredients were found. Please upload another image.
          </MyText>
          <MyButton width="100%" title="Back" onPress={handleCancel} />
        </>
      ) : null}
    </Page>
  );
};

export default VerifyIngredients;

const styles = StyleSheet.create({
  image: {
    width: '90%',
    height: undefined,
    resizeMode: 'cover',
    aspectRatio: 1,
    marginTop: '5%',
    borderRadius: 30,
  },
});