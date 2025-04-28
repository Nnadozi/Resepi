import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'

const IngredientsInput = () => {
  const nav = useNavigation()
  const [cameraPermission, requestCameraPermission] = useCameraPermissions()
  const [cameraType, setCameraType] = useState<CameraType>('back')
  const cameraRef = useRef<any>(null)

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.5 })
      nav.navigate('VerifyIngredients', {
        imageUri: photo.uri,
        base64: photo.base64,
      })
    }
  }

  const toggleCameraFacing = () => {
    setCameraType((current) => (current === 'back' ? 'front' : 'back'))
  }

  const uploadFromLibrary = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permissionResult.granted) {
      alert('Permission required to access library!')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.5,
      base64: true,
    })

    if (!result.canceled) {
      nav.navigate('VerifyIngredients', {
        imageUri: result.assets[0].uri,
        base64: result.assets[0].base64,
      })
    }
  }

  if (!cameraPermission) {
    return <View style={styles.center}><Text>Requesting permissions...</Text></View>
  }

  if (!cameraPermission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.permissionText}>We need your permission to use the camera</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestCameraPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing={cameraType}
        ref={cameraRef}
      />

      {/* Buttons Overlay */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={takePicture}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={uploadFromLibrary}>
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={() => nav.navigate('SavedRecipes')}>
          <Text style={styles.buttonText}>Saved Recipes</Text>
        </TouchableOpacity>
      </View>

      {/* Top Right Flip Camera Button */}
      <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
        <Text style={styles.buttonText}>Flip</Text>
      </TouchableOpacity>
    </View>
  )
}

export default IngredientsInput

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionText: {
    fontSize: 18,
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
  },
  controls: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  controlButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  flipButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
})
