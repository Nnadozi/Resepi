import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Page from '../components/Page';
import MyText from '../components/MyText';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import AppVersion from '../constants/AppVersion';
import { Dropdown } from 'react-native-element-dropdown';
import { useTranslation } from 'react-i18next';
import i18n from '../localization/il18n';
import { useTheme } from '../context/ThemeContext';
import MyIcon from '../components/MyIcon';
import {Image} from "expo-image"

const settingsSection = (
  sectionTitle: string,
  iconName: string,
  iconType: string,
  subtitle?: string,
  touch?: boolean,
  onPress?: () => void,
  dropdownData?: { label: string; value: string }[],
  dropdownValue?: string,
  onDropdownChange?: (value: string) => void
) => {
  const Container = touch ? TouchableOpacity : View;
  const { currentTheme } = useTheme(); 
  return (
    <Container
      style={{ marginVertical: '5%' }}
      key={sectionTitle}
      onPress={touch ? onPress : undefined}
    >
      <View style={styles.sectionTitleRow}>
        <MyIcon iconName={iconName} iconType={iconType} size={30} />
        <View style={{ flex: 1, marginLeft: '3%' }}>
          <MyText bold>{sectionTitle}</MyText>
          {subtitle && <MyText fontSize="small">{subtitle}</MyText>}
        </View>
        {dropdownData ? (
          <Dropdown
            style={[styles.dropdown,{backgroundColor:currentTheme.colors.border}]}
            data={dropdownData}
            itemTextStyle={{color:currentTheme.colors.text}}
            itemContainerStyle={{backgroundColor:currentTheme.colors.card}}
            selectedTextStyle={{color:currentTheme.colors.text}}
            activeColor={currentTheme.colors.border}
            containerStyle={{borderWidth:0}}
            labelField="label"
            valueField="value"
            placeholder="Select"
            value={dropdownValue}
            onChange={(item) => onDropdownChange?.(item.value)}
          />
        ) : touch ? (
          <Icon name="chevron-right" type="material" size={30} />
        ) : null}
      </View>
    </Container>
  );
};

const Settings = () => {
  const nav = useNavigation();
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme(); 

  return (
    <Page style={styles.container}>
      <View style={styles.topRow}>
        <MyIcon size={28} onPress={nav.goBack} iconName="arrow-back" />
        <MyText style={{ alignSelf: 'center' }} fontSize="large" bold>
          {t('screens.settings.title')}
        </MyText>
        <View />
      </View>
      {settingsSection(
        t('screens.settings.theme.title'),
        'sun',
        'feather',
        t('screens.settings.theme.subtitle'),
        false,
        undefined,
        [
          { label: t('screens.settings.theme.options.light'), value: 'light' },
          { label: t('screens.settings.theme.options.dark'), value: 'dark' },
          { label: t('screens.settings.theme.options.system'), value: 'system' }
        ],
        theme,
        setTheme 
      )}
      {settingsSection(
        t('screens.settings.version.title'),
        'smartphone',
        'material',
        t('screens.settings.version.value', { version: AppVersion }),
        false
      )}
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
    borderRadius: 20,
    borderColor: '#ccc',
    paddingHorizontal: "3%",
    paddingVertical: "2%",
  },
});
