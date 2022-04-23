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
import { CreateProfileRequest } from '../../services/profile/types';
import { ProfileServiceClient } from '../../services';
import { bindActionCreators } from 'redux';

interface NewFriendSetupProps {
  setCurrentStep: (step: Step) => void;
  submitFormData: () => void;
}

const profileClient: ProfileServiceClient = new ProfileServiceClient();

export default function NewFriendSetup({
  setCurrentStep,
  submitFormData,
}: NewFriendSetupProps) {
  const submitForm = () => {
    submitFormData();
    setCurrentStep('loading');
  };
  return (
    <View style={styles.container}>
      <FormContainer>
        <InputContainer>
          <InputTextLabel>
            Husky Habits is more fun with friends! Invite your friends to start
            using Husky Habits below!{' '}
          </InputTextLabel>
        </InputContainer>
        <PrimaryButton
          style={styles.shareButton}
          onPress={() => console.log('TODO')}
        >
          <ButtonText>Share via Email</ButtonText>
        </PrimaryButton>
        <PrimaryButton
          style={styles.shareButton}
          onPress={() => console.log('TODO')}
        >
          <ButtonText>Share via Text</ButtonText>
        </PrimaryButton>
        <PrimaryButton
          style={styles.shareButton}
          onPress={() => console.log('TODO')}
        >
          <ButtonText>Share via Instagram</ButtonText>
        </PrimaryButton>
      </FormContainer>
      <View style={styles.buttonContainer}>
        <SecondaryButton onPress={() => setCurrentStep('habit')}>
          <ButtonText>Back</ButtonText>
        </SecondaryButton>
        <PrimaryButton onPress={() => submitForm}>
          <ButtonText>Finish</ButtonText>
        </PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 160,
    height: '75%',
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  shareButton: {
    marginVertical: 10,
    marginRight: 'auto',
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    backgroundColor: 'transparent',
  },
});
