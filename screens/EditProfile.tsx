import { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Text, View, TextInput } from '../components/Themed';
import * as ImagePicker from 'expo-image-picker';
import { Buffer } from 'buffer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


export default function EditProfile() {
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [photoBuffer, setPhotoBuffer] = useState<Buffer | null>(null);
  const [photoURI, setPhotoURI] = useState<string>("");

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
        const buffer: Buffer = Buffer.from(result.base64, "base64");
        setPhotoURI("data:image/jpeg;base64,"+result.base64);
        setPhotoBuffer(buffer);
      }
    }
  }

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.photoContainer}>
          <Image
            style={styles.profileImage}
            source={{
              uri: photoURI || 'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png',
            }}
          />
          <Text 
            onPress={onChangeImage}
            lightColor="blue"
            darkColor="#EEEE"
            style={styles.changeImageLabel}>
            Change profile photo
            </Text>
        </View>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Username</Text>
          <TextInput style={styles.input} 
            placeholder={"ross3102"}
            onChangeText={setUsername}
            value={username} 
            lightColor="gray"
            darkColor="white"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>First Name</Text>
          <TextInput style={styles.input} 
            placeholder={"Ross"}
            onChangeText={setFirstName}
            value={firstName} 
            lightColor="gray"
            darkColor="white"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Last Name</Text>
          <TextInput 
          style={styles.input} 
            placeholder={"Newman"}
            onChangeText={setLastName}
            value={lastName} 
            lightColor="gray"
            darkColor="white"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Bio</Text>
          <TextInput 
          style={styles.multilineInput} 
            placeholder={"Hi! I'm a second year. This is my bio. lol"}
            multiline
            numberOfLines={4}
            maxLength={40}
            onChangeText={setBio}
            value={bio} 
            lightColor="gray"
            darkColor="white"
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%',
  },
});
