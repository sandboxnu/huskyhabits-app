import { View } from '../../components/Themed';
import {
  Heading,
  RowContainer,
  ColumnContainer,
  Body,
} from '../../components/Common';
import { StyleSheet } from 'react-native';
import Colors from '../../theme/Colors';

interface OnboardingHeaderProps {
  currentStep: string;
}

interface OnboardingStepProps {
  isCurrentStep: (id: string) => boolean;
  stepNum: number;
  id: string;
  title: string;
}

// Displays onboarding step with step data and color fill based on step completion
function OnboardingStep({
  isCurrentStep,
  stepNum,
  id,
  title,
}: OnboardingStepProps) {
  return (
    <ColumnContainer>
      <View style={[isCurrentStep(id) ? styles.stepFilled : styles.step]}>
        <Heading style={styles.centerStepText}>{stepNum}</Heading>
      </View>
      <Body>{title}</Body>
    </ColumnContainer>
  );
}

// Displays sticky header component that shows onboarding steps completed so far
export default function OnboardingHeader({
  currentStep,
}: OnboardingHeaderProps) {
  const isCurrentStep = (id: string) => {
    // checks if step has already been completed
    const isCompletedStep = () => {
      const isBeforeHabit = currentStep === 'habit' && id === 'user';
      const isBeforeInviteFriend =
        currentStep === 'invite_friend' && (id === 'user' || id === 'habit');
      const isLoading = currentStep === 'loading';
      return isBeforeHabit || isBeforeInviteFriend || isLoading;
    };
    return id === currentStep || isCompletedStep();
  };

  return (
    <View style={styles.header}>
      <Heading>Registration</Heading>
      <RowContainer>
        <OnboardingStep
          isCurrentStep={isCurrentStep}
          stepNum={1}
          id="user"
          title="User Info"
        />
        <View
          style={[
            styles.stepSeparator,
            isCurrentStep('habit')
              ? styles.stepSeparatorComplete
              : styles.stepSeparatorIncomplete,
          ]}
          lightColor="#eee"
          darkColor="#eee"
        />
        <OnboardingStep
          isCurrentStep={isCurrentStep}
          stepNum={2}
          id="habit"
          title="Habits"
        />
        <View
          style={[
            styles.stepSeparator,
            isCurrentStep('invite_friend')
              ? styles.stepSeparatorComplete
              : styles.stepSeparatorIncomplete,
          ]}
          lightColor="#eee"
          darkColor="#eee"
        />
        <OnboardingStep
          isCurrentStep={isCurrentStep}
          stepNum={3}
          id="invite_friend"
          title="Add Friends"
        />
      </RowContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  centerStepText: {
    marginLeft: 12,
    marginTop: 5,
  },
  header: {
    position: 'absolute',
    width: 375,
    height: 165,
    left: 0,
    top: 0,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    // boxShadow: 0px 1px 8px rgba(0, 0, 0, 0.25);
    borderRadius: 30,
    backgroundColor: '#F8F8F0',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepSeparator: {
    borderWidth: 1,
    borderRadius: 1,
    height: 1,
    marginBottom: 15,
    marginHorizontal: -20,
    width: 70,
  },
  stepSeparatorIncomplete: {
    borderColor: Colors.pug,
    borderStyle: 'dotted',
  },
  stepSeparatorComplete: {
    borderStyle: 'solid',
    borderColor: Colors.clifford,
  },
  step: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${Colors.malamute}`,
    borderColor: `${Colors.clifford}`,
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 20,
  },
  stepFilled: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${Colors.clifford}`,
    borderWidth: 1,
    borderColor: `${Colors.clifford}`,
    marginVertical: 5,
    marginHorizontal: 20,
  },
});
