import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import {
  Body,
  ButtonText,
  FormContainer,
  InputContainer,
  InputTextLabel,
  PrimaryButton,
  SecondaryButton,
} from '../../components/Common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Step } from './Onboarding';

interface NewFriendSetupProps {
  setCurrentStep: (step: Step) => void;
}

export default function NewFriendSetup({
  setCurrentStep,
}: NewFriendSetupProps) {
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <FormContainer>
        <InputContainer>
          <InputTextLabel>
            Husky Habits is more fun with friends! Invite your friends to start
            using Husky Habits below!{' '}
          </InputTextLabel>
        </InputContainer>
        <Body>Share via:</Body>
        <PrimaryButton onPress={() => console.log('TODO')}>
          <ButtonText>Email</ButtonText>
        </PrimaryButton>
      </FormContainer>
      <View style={styles.buttonContainer}>
        <SecondaryButton onPress={() => setCurrentStep('habit')}>
          <ButtonText>Back</ButtonText>
        </SecondaryButton>
        <PrimaryButton onPress={() => console.log('TODO')}>
          <ButtonText>Finish</ButtonText>
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
