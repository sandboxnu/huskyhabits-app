import { ImageBackground, Image, StyleSheet } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import AuthServiceClient from '../services/auth/authService';
import * as Linking from 'expo-linking';
import * as SecureStore from 'expo-secure-store';
import { AuthAction } from '../store/actions/Auth.action';
import { useAppDispatch } from '../store/App.hooks';
import { RootScreenProps } from '../types';
import HuskyHabitsBackground from '../assets/images/Pawprints.png';
import WelcomeLogo from '../assets/images/welcome-logo.png';

export default function Login({ navigation }: RootScreenProps<'Login'>) {
  const authClient: AuthServiceClient = new AuthServiceClient();
  const dispatch = useAppDispatch();

  const handleAuth = async () => {
    const initialUrl = (await Linking.getInitialURL()) as string;
    const oAuthLogin = await authClient.loginWithGoogle(initialUrl);
    // returns error
    if (oAuthLogin) alert('OAuth failed: ' + oAuthLogin.message);

    // stores cookies and user id
    const cookies = await SecureStore.getItemAsync('auth-cookies');
    const userId = await SecureStore.getItemAsync('user-id');
    dispatch(AuthAction.setCookies(cookies || ''));
    dispatch(AuthAction.setUserId(userId || ''));
  };

  return (
    <ImageBackground
      source={HuskyHabitsBackground}
      style={styles.imageContainer}
      imageStyle={styles.image}
    >
      <Image source={WelcomeLogo} />
      <SocialIcon
        style={styles.googleButton}
        title={'Sign in with Google'}
        button={true}
        type={'google'}
        onPress={handleAuth}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
  },
  pageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  input: {
    height: 40,
    width: 200,
    margin: 5,
    borderWidth: 1,
    padding: 10,
  },
  multilineInput: {
    height: 100,
    width: 200,
    margin: 5,
    borderWidth: 1,
    padding: 10,
  },
  googleButton: {
    width: '90%'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    opacity: 0.4,
  },
  photoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  profileContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  changeImageLabel: {
    marginTop: 5,
  },
  textLabel: {
    textAlign: 'right',
    width: 100,
    fontSize: 15,
    marginRight: 10,
    padding: 0,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%',
  },
});
