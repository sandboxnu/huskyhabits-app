import { useState } from 'react';
import { Image, StyleSheet, ImageBackground } from 'react-native';
import { Text, View, TextInput } from '../components/Themed';
import * as ImagePicker from 'expo-image-picker';
import { Buffer } from 'buffer';
import { InputTextLabel, LargeTextInput, SmallTextInput } from '../components/Common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { HuskyHabitsBackground }  from "../assets/images/Pawprints.png";


export default function Onboarding() {
  const [username, setUsername] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [photoBuffer, setPhotoBuffer] = useState<Buffer | null>(null);
  const [photoURI, setPhotoURI] = useState<string>('');

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

  return(
      <KeyboardAwareScrollView style={styles.container}>
        {/* <HuskyHabitsBackground style={{ height: '500px', width: '200px' }} />
         */}
         {/* <HuskyHabitsBackground /> */}
         {/* <Image source={HuskyHabitsBackground} style={styles.imageBackground} /> */}
         <ImageBackground source={HuskyHabitsBackground} style={styles.imageBackground}>
          <View style={styles.formContainer}>
            <Text 
                onPress={onChangeImage}
                lightColor="blue"
                darkColor="#EEEE"
                style={styles.changeImageLabel}>
                Change profile photo lol
            </Text>
            <View
              style={styles.separator}
              lightColor="#eee"
              darkColor="rgba(255,255,255,0.1)"
            />
            <View style={styles.inputContainer}>
              <InputTextLabel>Username</InputTextLabel>
              <SmallTextInput
                placeholder={"ross3102"}
                onChangeText={setUsername}
                value={username}
              />
            </View>
            <View style={styles.inputContainer}>
              <InputTextLabel>Bio</InputTextLabel>
              <LargeTextInput
                onChangeText={setBio}
                value={bio}
              />
              </View>
            </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    imageBackground: {
      width: '100%',
      height: '100%',
      // position: 'absolute',
      // top: 0,
      // left: 0,
      // bottom: 0,
      // right: 0,
      // zIndex: -1,
      flex: 1,
    },
    inputContainer: {
      flexDirection: "column",
      width: "100%",
    },
    formContainer: {
      margin: 10,
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
    },
    separator: {
      marginVertical: 15,
      height: 1,
      width: '80%',
    },
});
