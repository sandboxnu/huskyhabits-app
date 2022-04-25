import { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Buffer } from 'buffer';
import HuskyHabitsBackground from '../../assets/images/Pawprints.png';
import NewUserSetup from './NewUserSetup';
import NewHabitSetup from './NewHabitSetup';
import NewFriendSetup from './NewFriendSetup';
import OnboardingIntro from './OnboardingIntro';
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
  SetProfilePhotoRequest,
  SetProfilePhotoResponse,
} from '../../services/profile/types';
import OnboardingHeader from './OnboardingHeader';

export type Step = 'intro' | 'user' | 'habit' | 'invite_friend' | 'loading';

const userClient: UserServiceClient = new UserServiceClient();
const profileClient: ProfileServiceClient = new ProfileServiceClient();

// Complete Onboarding components for setting up a user profile, adding a habit, and inviting friends
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
  const [error, setError] = useState(''); // TODO
  const [loading, setLoading] = useState(true); // TODO

  const fetchData = async () => {
    try {
      const res = await userClient.getCurrentUser(); // fetches current user data
      setUserData({
        userId: res.userId,
        email: res.email,
        first_name: res.first_name,
        last_name: res.last_name,
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const submitFormData = async () => {
    try {
      const profileFormData: CreateProfileRequest = {
        username: username,
        bio: bio,
        // name: name,
        // habit: habit
      };
      if (!profileFormData)
        throw new Error('No profile form data was submitted');

      const profileData: CreateProfileResponse =
        await profileClient.createProfile(profileFormData);
      if (!profileData) {
        setError('Error in creating profile');
        return;
      }

      const profileId = profileData.profileId; // returns profileId
      // only update if photo was added
      if (profileId && photoURI) {
        const photoFormData: SetProfilePhotoRequest = {
          profileId: profileId,
          photo: photoURI,
        };
        const photoData: SetProfilePhotoResponse =
          await profileClient.setProfilePhoto(photoFormData);
        if (!photoData) setError('Photo not set.');
      }
    } catch (err: any) {
      console.log(err.message);
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

  // display any errors
  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: `Error: ${error}`,
      });
    }
  }, [error]);

  useEffect(() => {
    setLoading(false);
    if (userData) {
      setEmail(userData.email);
      setName(userData.first_name + ' ' + userData.last_name);
      Toast.show({
        type: 'success',
        text1: `Sign up for ${userData.email} was successful`,
      });
    }
  }, [userData]);

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
        // setPhotoURI('data:image/jpeg;base64,' + result.base64);
        setPhotoURI(result.uri);
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
      {currentStep !== 'intro' && (
        <OnboardingHeader currentStep={currentStep} />
      )}
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
      {currentStep === 'loading' && <OnboardingLoadingScreen />}
      <Toast />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 160,
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
