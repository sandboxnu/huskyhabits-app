import { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Text, View } from '../../components/Themed';
import * as ImagePicker from 'expo-image-picker';
import { Buffer } from 'buffer';
import {
  Body,
  ButtonText,
  ColumnContainer,
  Container,
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
import HuskyHabitsLogo from '../../assets/images/HuskyHabitsLogo.png';
import Colors from '../../theme/Colors';

interface OnboardingIntroProps {
  setCurrentStep: (step: Step) => void;
}

export default function OnboardingIntro({
  setCurrentStep,
}: OnboardingIntroProps) {
  return (
    <Container style={styles.onboardingContainer}>
      <Body style={styles.welcomeText}>Thank you for signing up with</Body>
      <Image source={HuskyHabitsLogo} style={styles.logoImage} />
      <Body style={styles.introText}>
        Let's start building your user profile!
      </Body>
      <PrimaryButton onPress={() => setCurrentStep('user')}>
        <ButtonText>Let's Go!</ButtonText>
      </PrimaryButton>
    </Container>
  );
}

const styles = StyleSheet.create({
  onboardingContainer: {
    flex: 1,
  },
  welcomeText: {
    width: '60%',
    textAlign: 'right',
    marginLeft: 40,
    fontSize: 24,
    color: Colors.goldendoodle,
    fontFamily: 'BeVietnam-Bold',
    lineHeight: 26,
  },
  logoImage: {
    marginTop: -20,
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').height * 0.13,
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  introText: {
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: 26,
    lineHeight: 37,
    width: '50%',
    marginVertical: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    flex: 1,
    backgroundColor: 'transparent',
  },
});
