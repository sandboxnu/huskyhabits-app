import { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Text, View } from '../../components/Themed';
import * as ImagePicker from 'expo-image-picker';
import { Buffer } from 'buffer';
import {
  Body,
  ButtonText,
  ColumnContainer,
  FormContainer,
  Heading,
  InputContainer,
  InputTextLabel,
  PrimaryButton,
  RowContainer,
  SecondaryButton,
} from '../../components/Common';
import { Step } from './Onboarding';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface OnboardingIntroProps {
    setCurrentStep: (step: Step) => void;
}

export default function OnboardingIntro({
    setCurrentStep,
  }: OnboardingIntroProps) {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={() => setCurrentStep('user')}>
            <ButtonText>Let's Go!</ButtonText>
          </PrimaryButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 120,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 20,
      flex: 1,
      backgroundColor: 'transparent',
    },
  });