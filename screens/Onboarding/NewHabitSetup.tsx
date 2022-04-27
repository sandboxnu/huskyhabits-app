import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';
import {
  ButtonText,
  FormContainer,
  InputContainer,
  InputTextLabel,
  PrimaryButton,
  SecondaryButton,
} from '../../components/Common';
import { Step } from './Onboarding';

interface NewHabitSetupProps {
  habit: object;
  setHabit: (habit: string) => void;
  setCurrentStep: (step: Step) => void;
}

export default function NewHabitSetup({ setCurrentStep }: NewHabitSetupProps) {
  const [habit, setHabit] = useState<string>('');

  return (
    <View style={styles.container}>
      <FormContainer>
        <InputContainer>
          <InputTextLabel>Create your first habit below!</InputTextLabel>
          <SecondaryButton
            style={styles.habitButton}
            onPress={() => console.log('TODO')}
          >
            <ButtonText>Add a Habit</ButtonText>
          </SecondaryButton>
        </InputContainer>
      </FormContainer>
      <View style={styles.buttonFooter}>
        <View style={styles.buttonContainer}>
          <SecondaryButton onPress={() => setCurrentStep('user')}>
            <ButtonText>Back</ButtonText>
          </SecondaryButton>
          <PrimaryButton onPress={() => setCurrentStep('invite_friend')}>
            <ButtonText>Next</ButtonText>
          </PrimaryButton>
        </View>
        <TouchableOpacity onPress={() => setCurrentStep('invite_friend')}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
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
  buttonFooter: {
    backgroundColor: 'transparent',
  },
  skipText: {
    textAlign: 'right',
    marginTop: 10,
    textDecorationLine: 'underline',
    marginRight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    backgroundColor: 'transparent',
  },
  habitButton: {
    marginVertical: 20,
    borderStyle: 'dashed',
    width: '40%',
  },
});
