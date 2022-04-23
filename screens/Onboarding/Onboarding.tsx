import { useEffect, useState } from 'react';
import { Image, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
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
import { conditionalExpression } from '@babel/types';
import OnboardingLoadingScreen from './OnboardingLoadingScreen';
import Toast from 'react-native-toast-message';
import { AuthStackScreenProps } from '../../types';
import {
  AuthServiceClient,
  ProfileServiceClient,
  UserServiceClient,
} from '../../services';
import { GetUserResponse } from '../../services/user/types';
import {
  CreateProfileRequest,
  CreateProfileResponse,
  GetProfileResponse,
} from '../../services/profile/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';

export type Step = 'intro' | 'user' | 'habit' | 'invite_friend' | 'loading';

interface OnboardingStepProps {
  stepNum: number;
  id: string;
  title: string;
}

const authClient: AuthServiceClient = new AuthServiceClient();
const userClient: UserServiceClient = new UserServiceClient();
const profileClient: ProfileServiceClient = new ProfileServiceClient();

export default function Onboarding({
  navigation,
}: AuthStackScreenProps<'Onboarding'>) {
  const [userData, setUserData] = useState<GetUserResponse>();

  const [currentStep, setCurrentStep] = useState<string>('intro');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>(''); // get from oauth
  const [bio, setBio] = useState<string>('');
  const [photoBuffer, setPhotoBuffer] = useState<Buffer | null>(null);
  const [photoURI, setPhotoURI] = useState<string>('');
  const [habit, setHabit] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // TODO

  const formData: CreateProfileRequest = {
    username: username,
    name: name,
    bio: bio,
    photo: {
      data: photoBuffer,
      contentType: photoURI,
    },
    // habit: habit
  };

  const fetchData = async () => {
    try {
      // const data: GetUserResponse = await userClient.getCurrentUser();
      const userId = await SecureStore.getItemAsync('user-id');
      if (!userId) throw new Error('No user found.');

      const res = await userClient.getUserById({
        userId: userId,
      });
      setUserData({
        userId: userId,
        email: res.email,
        firstName: res.firstName,
        lastName: res.lastName,
      })
      console.log(userData);
      setUserData(userData);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const submitFormData = async () => {
    try {
      const data: CreateProfileResponse = await profileClient.createProfile(
        formData,
      );
      if (data) {
        // returns profileId
        console.log('SUBMISSION');
        console.log(data);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  // fetch user data
  useEffect(() => {
    // simulate loading while fetching oauth data
    if (!userData) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    setLoading(false);
    if (userData) {
      setEmail(userData.email);
      setName(userData.firstName + ' ' + userData.lastName);
      Toast.show({
        type: 'success',
        text1: `Sign up for ${userData.email} was successful`,
      });
    }
  }, [userData]);
    

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

  function OnboardingHeader(props: any) {
    return (
      <View style={styles.header}>
        <Heading>Registration</Heading>
        <RowContainer>
          <OnboardingStep stepNum={1} id="user" title="User Info" />
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
          <OnboardingStep stepNum={2} id="habit" title="Habits" />
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
      {currentStep !== 'intro' && <OnboardingHeader />}
      {currentStep === 'intro' && (
        <OnboardingIntro setCurrentStep={setCurrentStep} />
      )}
      {currentStep === 'user' && (
        <NewUserSetup
          username={username}
          setUsername={setUsername}
          name={name}
          setName={setName}
          bio={bio}
          setBio={setBio}
          photoBuffer={photoBuffer}
          setPhotoBuffer={setPhotoBuffer}
          photoURI={photoURI}
          setPhotoURI={setPhotoURI}
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
        <NewFriendSetup
          setCurrentStep={setCurrentStep}
          submitFormData={submitFormData}
        />
      )}
      {currentStep === 'loading' && (
        <OnboardingLoadingScreen setCurrentStep={setCurrentStep} />
      )}
      <Toast />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 160,
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
  toast: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    flexWrap: 'wrap',
  },
});
