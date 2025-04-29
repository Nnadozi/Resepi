import { View, StyleSheet, Text, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import IconButton from '../components/IconButton';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import InfoModal from '../components/InfoModal';
import MyText from '../components/MyText';

const IngredientsInput = () => {
  const nav = useNavigation();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState<CameraType>('back');
  const cameraRef = useRef<any>(null);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.5 });
      nav.navigate('VerifyIngredients', {
        imageUri: photo.uri,
        base64: photo.base64,
      });
    }
  };

  const toggleCameraFacing = () => {
    setCameraType((current) => (current === 'back' ? 'front' : 'back'));
  };

  const uploadFromLibrary = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission required to access library!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      nav.navigate('VerifyIngredients', {
        imageUri: result.assets[0].uri,
        base64: result.assets[0].base64,
      });
    }
  };

  if (!cameraPermission) {
    return <View style={styles.center}><Text>Requesting permissions...</Text></View>;
  }

  if (!cameraPermission.granted) {
    return (
      <SafeAreaView style={styles.center}>
        <MyText>Camera permission is required to use this feature.</MyText>
        <TouchableOpacity
          style={{backgroundColor: '#007BFF', padding: 15, borderRadius: 8,}}
          onPress={requestCameraPermission}
        >
          <MyText>Grant Permission</MyText>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing={cameraType}
        ref={cameraRef}
      />
      <View style={styles.controls}>
        <IconButton iconName="camera" onPress={takePicture} />
        <View>
          <IconButton scale={0.75} iconName="flip-camera-ios" onPress={toggleCameraFacing} />
          <IconButton scale={0.75} iconName="add-photo-alternate" onPress={uploadFromLibrary} />
        </View>
      </View>
      <View style={{ position: 'absolute', left: '-1%', top: '4%' }}>
        <IconButton iconName="history" scale={0.6} onPress={() => nav.navigate('SavedRecipes')} />
      </View>
      <View style={{ position: 'absolute', right: '-1%', top: '4%' }}>
        <IconButton iconName="settings" scale={0.6} onPress={() => nav.navigate('Settings')} />
      </View>
      <View style={{ position: 'absolute', left: '-1%', bottom: '1%' }}>
        <IconButton iconName="info" scale={0.45} onPress={() => setIsInfoModalVisible(true)} />
      </View>

      <InfoModal
        visible={isInfoModalVisible}
        onClose={() => setIsInfoModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default IngredientsInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  controls: {
    position: 'absolute',
    bottom: '3%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
