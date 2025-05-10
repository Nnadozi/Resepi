import { StyleSheet, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import Page from '../components/Page';
import MyText from '../components/MyText';
import MyButton from '../components/MyButton';
import * as ImageManipulator from 'expo-image-manipulator';

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

      const compressedBase64 = await compressImage(base64);

      try {
        const response = await fetch('https://resepi-ss25.onrender.com/analyze-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ base64: compressedBase64 }),
        });

        const text = await response.text();
        if (!response.ok) {
          throw new Error(`Server error: ${text}`);
        }

        let data;
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          throw new Error('Invalid JSON returned from server.');
        }

        const reply = data.reply;

        if (reply?.toLowerCase().includes("i don't see any food ingredients")) {
          setNoIngredientsFound(true);
        } else {
          nav.navigate('IngredientsView', { ingredients: reply });
        }
      } catch (e: any) {
        console.error(e);
        setError(e.message || 'Failed to analyze image.');
      } finally {
        setLoading(false);
      }
    }

    examineImage();
  }, [base64]);

  const compressImage = async (uri: string) => {
    try {
      const manipulationResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800 } }], 
        { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG } 
      );
      return manipulationResult.uri;
    } catch (error) {
      console.error('Error compressing image:', error);
      return uri; 
    }
  };

  const handleCancel = () => {
    nav.goBack();
  };

  return (
    <Page>
      {loading && <MyText bold fontSize="large">Verifying Ingredients...</MyText>}
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <MyText>No image selected</MyText>
      )}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#5b9ef0"
          style={{ marginTop: '7.5%', transform: [{ scale: 1.25 }] }}
        />
      ) : error ? (
        <>
          <MyText textAlign="center" style={{ marginVertical: '5%' }}>
            An error occurred: {error}
          </MyText>
          <MyButton width="100%" title="Back" onPress={handleCancel} />
        </>
      ) : noIngredientsFound ? (
        <>
          <MyText textAlign="center" style={{ marginVertical: '5%' }}>
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
    width: '95%',
    height: undefined,
    resizeMode: 'cover',
    aspectRatio: 1,
    marginTop: '5%',
    borderRadius: 30,
  },
});
