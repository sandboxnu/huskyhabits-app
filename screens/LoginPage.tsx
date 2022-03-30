import { Button, ScrollView } from "react-native"
import { Image, StyleSheet } from 'react-native';
import { Text, View, TextInput } from '../components/Themed';
import AuthServiceClient from '../services/authService';

export default function Login() {
  const authClient: AuthServiceClient = new AuthServiceClient(undefined);

  return (
        <View style={styles.pageContainer}>
            <Text style={styles.title}>Husky Habits</Text>
            <Button 
              title='Log in with Google'
              onPress={() => { authClient.loginWithGoogle(); }}
            />
            {/* <script src="https://apis.google.com/js/platform.js?onload=renderButton" async defer></script> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
      fontSize: 20,
      fontWeight: 'bold',
      margin: 20,
    },
    separator: {
      marginVertical: 15,
      height: 1,
      width: '80%',
    },
  });  
