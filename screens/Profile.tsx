import { StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Text, View } from '../components/Themed';
import { Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useAppDispatch } from '../store/App.hooks';
import { AuthAction } from '../store/actions/Auth.action';
import {
  Heading,
  Body,
  CenterText,
  Container,
  ScrollContainer,
  StyledImage,
} from '../components/Common';

export default function ProfileScreen() {
  const dispatch = useAppDispatch();

  const logout = async (): Promise<void> => {
    await SecureStore.deleteItemAsync('auth-cookies');
    await SecureStore.deleteItemAsync('user-id');
    alert('Logged out');
    dispatch(AuthAction.setCookies(''));
    dispatch(AuthAction.setUserId(''));
  };

  return (
    <ScrollContainer>
      <Container>
        <StyledImage
          source={{
            uri: 'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png',
          }}
        />
        <Heading>Ross Newman</Heading>
        <Text style={styles.handle}>@ross3102</Text>
        <View style={styles.locationView}>
          <FontAwesome name="map-marker" size={20} style={{ marginRight: 5 }} />
          <Text>Boston, MA, USA</Text>
        </View>
        <CenterText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </CenterText>
        <Button onPress={logout} title="Log out" color="#ffffff"></Button>
      </Container>
    </ScrollContainer>
  );
}

const styles = StyleSheet.create({
  handle: {
    fontSize: 20,
  },
  locationView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  group: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#aaa',
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
    marginTop: 10,
  },
  groupImage: {
    width: 100,
    height: 100,
  },
  groupInfo: {
    backgroundColor: '#aaa',
    margin: 10,
  },
  groupName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
