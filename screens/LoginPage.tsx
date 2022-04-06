import { ImageBackground, Button, ScrollView } from "react-native"
import { Image, StyleSheet } from 'react-native';
import {SocialIcon} from 'react-native-elements';
import { Text, View, TextInput } from '../components/Themed';
import React, { useEffect } from 'react';
import AuthServiceClient from '../services/authService';
import * as Linking from 'expo-linking';
import { RootStackScreenProps } from "../types";

export default function Login({ navigation }: RootStackScreenProps<'Login'>) {
  const authClient: AuthServiceClient =  new AuthServiceClient();

  const handleAuth = async () => {
    const initialUrl = await Linking.getInitialURL() as string;
    const oAuthLogin = await authClient.loginWithGoogle(initialUrl);
    // returns error
    if (oAuthLogin) {
      console.log("OAuth failed");
    } 
    navigation.navigate('Root', { screen: 'Profile' });
  };
  
  return (
        <View style={styles.container}>
          <ImageBackground source = {require('../assets/images/pawprint-wallpaper.png')} resizeMode="cover" style={styles.image}>
            <Image source={require('../assets/images/welcome-logo.png')}/>
            <SocialIcon 
              title={'Sign in with Google'}
              button={true}
              type={"google"}
              onPress={handleAuth}
            />
          </ImageBackground>
            {/* <script src="https://apis.google.com/js/platform.js?onload=renderButton" async defer></script> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 1
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
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderColor: 'black',
      borderWidth: 1,
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    photoContainer: {
      flexDirection: "column",
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
      textAlign: "right",
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
