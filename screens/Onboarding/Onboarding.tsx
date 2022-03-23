import { useState } from 'react';
import { StyleSheet } from 'react-native';
import NewUserSetupScreen from './NewUserSetup';

export type Step = 'user_info' | 'habit' | 'invite_friend';

export default function OnboardingScreen() {
  const [step, setStep] = useState<Step>('user_info');

  return (
    <div>
      { step === 'user_info' && <NewUserSetupScreen setStep={setStep} /> }
    </div>
  );
}

const styles = StyleSheet.create({
  
});
