import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Page from '../components/Page';
import MyText from '../components/MyText';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import AppVersion from '../constants/AppVersion';
import { Dropdown } from 'react-native-element-dropdown';

const settingsSection = (
  sectionTitle: string,
  iconName: string,
  iconType: string,
  subtitle?: string,
  touch?: boolean,
  onPress?: () => void
) => {
  const [dropdownValue, setDropdownValue] = useState(null);
  const dropdownData =
    sectionTitle === 'Theme'
      ? [
          { label: 'Light', value: 'light' },
          { label: 'Dark', value: 'dark' },
          { label: 'System', value: 'system' },
        ]
      : sectionTitle === 'Language'
      ? [
          { label: 'English', value: 'en' },
          { label: 'Spanish', value: 'es' },
          { label: 'French', value: 'fr' },
          { label: 'Arabic', value: 'ar' },
          { label: 'Portuguese', value: 'pt' },
          { label: 'Russian', value: 'ru' },
          { label: 'German', value: 'de' },
        ]
      : [];

  const Container = touch ? TouchableOpacity : View;

  return (
    <Container
      style={{ marginVertical: '5%' }}
      key={sectionTitle}
      onPress={touch ? onPress : undefined}
    >
      <View style={styles.sectionTitleRow}>
        <Icon name={iconName} type={iconType} size={30} />
        <View style={{ flex: 1, marginLeft: '3%' }}>
          <MyText bold>{sectionTitle}</MyText>
          {subtitle && <MyText fontSize="small">{subtitle}</MyText>}
        </View>
        {touch ? (
          <Icon name="chevron-right" type="material" size={30} />
        ) : dropdownData.length > 0 ? (
          <Dropdown
            style={styles.dropdown}
            data={dropdownData}
            labelField="label"
            valueField="value"
            placeholder="Select"
            value={dropdownValue}
            onChange={(item) => setDropdownValue(item.value)}
          />
        ) : null}
      </View>
    </Container>
  );
};

const Settings = () => {
  const nav = useNavigation();
  return (
    <Page style={styles.container}>
      <View style={styles.topRow}>
        <Icon size={25} onPress={nav.goBack} name="arrow-back" />
        <MyText style={{ alignSelf: 'center' }} fontSize="large" bold>
          App Settings
        </MyText>
        <View />
      </View>
      {settingsSection('Theme', 'sun', 'feather', 'Change your appearance', false)}
      {settingsSection('Language', 'language', 'entypo', 'Pick your language', false)}
      {settingsSection(
        'Privacy Policy / TOS',
        'privacy-tip',
        'material',
        'View the privacy policy',
        true,
        () => console.log('Privacy Policy pressed')
      )}
      {settingsSection(
        'Rate and Review',
        'star',
        'antdesign',
        'Rate Resepi and leave a review',
        true,
        () => console.log('Rate and Review pressed')
      )}
      {settingsSection(
        'Feedback',
        'mail',
        'antdesign',
        'Give feedback for improvements',
        true,
        () => console.log('Feedback pressed')
      )}
      {settingsSection('Version', 'smartphone', 'material', `Version ${AppVersion}`, false)}
    </Page>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: '7.5%',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '3%',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  dropdown: {
    width: "30%",
    borderWidth: 1,
    borderRadius:20,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});