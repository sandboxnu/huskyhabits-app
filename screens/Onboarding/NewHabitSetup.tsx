import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View, TextInput } from '../../components/Themed';
import {
  Body,
  ButtonText,
  ColumnContainer,
  FormContainer,
  Heading,
  InputContainer,
  InputTextLabel,
  LargeTextInput,
  PrimaryButton,
  RowContainer,
  SecondaryButton,
  SmallTextInput,
  StyledImage,
} from '../../components/Common';
import * as ImagePicker from 'expo-image-picker';
import { Buffer } from 'buffer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Step } from './Onboarding';

interface NewHabitSetupProps {
  habit: string;
  setHabit: (habit: string) => void;
  setCurrentStep: (step: Step) => void;
}

export default function NewHabitSetup({ setCurrentStep }: NewHabitSetupProps) {
  const [habit, setHabit] = useState<string>('');

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <FormContainer>
        <InputContainer>
          <InputTextLabel>Create your first habit below!</InputTextLabel>
          <SecondaryButton onPress={() => console.log('TODO')}>
            <ButtonText>Add a Habit</ButtonText>
          </SecondaryButton>
        </InputContainer>
      </FormContainer>
      <View style={styles.buttonContainer}>
        <SecondaryButton onPress={() => setCurrentStep('user')}>
          <ButtonText>Back</ButtonText>
        </SecondaryButton>
        <PrimaryButton onPress={() => setCurrentStep('invite_friend')}>
          <ButtonText>Next</ButtonText>
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
    backgroundColor: 'transparent',
  },
});
