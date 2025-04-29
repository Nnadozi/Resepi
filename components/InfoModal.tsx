import { StyleSheet, Modal, View } from 'react-native';
import React from 'react';
import MyText from './MyText';
import IconButton from './IconButton';
import { Divider, Icon } from '@rneui/base';

const iconData = [
  { iconName: 'camera', title: 'Camera', description: 'Snap a picture of some ingredients' },
  { iconName: 'flip-camera-ios', title: 'Flip Camera', description: 'Switch between front and back camera' },
  { iconName: 'add-photo-alternate', title: 'Photo Gallery', description: 'Choose a photo from device' },
  { iconName: 'history', title: 'History', description: 'View saved recipes' },
  { iconName: 'settings', title: 'Settings', description: 'Adjust app settings' },
];

const InfoModal = ({ visible, onClose }) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.topRow}>
          <Icon name='close' onPress={onClose} />
          <MyText bold fontSize='large'>Instructions</MyText>
          <View/> 
        </View>
        <Divider style={{ width: '100%', marginVertical: '2%' }} />
        {iconData.map(({ iconName, title, description }) => (
          <View key={iconName} style={styles.itemCon}>
            <IconButton scale={0.8} iconName={iconName} />
            <View style={styles.textContainer}>
              <MyText bold>{title}</MyText>
              <MyText fontSize="small">{description}</MyText>
            </View>
          </View>
        ))}
      </View>
    </View>
  </Modal>
);

export default InfoModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    padding: '3%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    width: '100%',
  },
  itemCon: {
    flexDirection: 'row',
    gap: '3%',
    alignItems: 'center',
    width: '100%',
    paddingVertical: '1%',
  },
  textContainer: {
    flex: 1,
    maxWidth: '80%',
  },
});
