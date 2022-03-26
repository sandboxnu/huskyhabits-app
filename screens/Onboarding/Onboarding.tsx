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
  ColumnContainer,
  Heading,
  RowContainer,
} from '../../components/Common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HuskyHabitsBackground from '../../assets/images/Pawprints.png';
import NewUserSetup from './NewUserSetup';
import NewHabitSetup from './NewHabitSetup';
import Camera from '../../assets/images/camera.svg';
import Colors from '../../theme/Colors';
import NewFriendSetup from './NewFriendSetup';
import OnboardingIntro from './OnboardingIntro';

export type Step = 'intro' | 'user' | 'habit' | 'invite_friend';

interface OnboardingStepProps {
  stepNum: number;
  id: string;
  title: string;
}

export default function Onboarding() {
  const [username, setUsername] = useState<string>('');
  //const [firstName, setFirstName] = useState<string>('');
  //const [lastName, setLastName] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<string>('intro');
  const [name, setName] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [photoBuffer, setPhotoBuffer] = useState<Buffer | null>(null);
  const [photoURI, setPhotoURI] = useState<string>('');
  const [habit, setHabit] = useState('');

  // simulate name being autofilled from oauth
  useEffect(() => {
    setName('Ross Newman');
  }, []);

  const isCurrentStep = (id: string) => {
    // checks if step has already been completed
    const isCompletedStep = () => {
      return (
        (currentStep === 'habit' && id === 'user') ||
        (currentStep === 'invite_friend' && (id === 'user' || id === 'habit'))
      );
    };
    return id === currentStep || isCompletedStep();
  };

  function OnboardingHeader(props: any) {
    return (
      <View style={styles.header}>
        <Heading>Registration</Heading>
        <RowContainer>
          <OnboardingStep stepNum={1} id="user" title="User Info" />
          <View
            style={styles.stepSeparator}
            lightColor="#eee"
            darkColor="#eee"
          />
          <OnboardingStep stepNum={2} id="habit" title="Habits" />
          <View
            style={styles.stepSeparator}
            lightColor="#eee"
            darkColor="#eee"
          />
          <OnboardingStep stepNum={3} id="invite_friend" title="Add Friends" />
        </RowContainer>
      </View>
    );
  }

  function OnboardingStep({ stepNum, id, title }: OnboardingStepProps) {
    return (
      <ColumnContainer>
        <View style={[isCurrentStep(id) ? styles.stepFilled : styles.step]}>
          <Heading style={styles.centerStepText}>{stepNum}</Heading>
        </View>
        <Body>{title}</Body>
      </ColumnContainer>
    );
  }

  const onChangeImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      if (result.base64) {
        const buffer: Buffer = Buffer.from(result.base64, 'base64');
        setPhotoURI('data:image/jpeg;base64,' + result.base64);
        setPhotoBuffer(buffer);
      }
    }
  };

  return (
    <ImageBackground
      source={HuskyHabitsBackground}
      style={styles.imageBackground}
      imageStyle={styles.image}
    >
      { currentStep !== 'intro' && <OnboardingHeader /> }
      {currentStep === 'intro' && (
        <OnboardingIntro setCurrentStep={setCurrentStep} />
      )}
      {currentStep === 'user' && (
        <NewUserSetup
          username={username}
          setUsername={setUsername}
          bio={bio}
          setBio={setBio}
          onChangeImage={onChangeImage}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep === 'habit' && (
        <NewHabitSetup
          habit={habit}
          setHabit={setHabit}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep === 'invite_friend' && (
        <NewFriendSetup setCurrentStep={setCurrentStep} />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 120,
  },
  stepSeparator: {
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1,
    height: 1,
    marginBottom: 15,
    marginHorizontal: -20,
    width: 70,
  },
  centerStepText: {
    marginLeft: 12,
    marginTop: 5,
  },
  header: {
    position: 'absolute',
    width: 375,
    height: 145,
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
  nextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
    backgroundColor: 'transparent',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  image: {
    opacity: 0.5,
  },
});
