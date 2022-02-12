import { useState } from 'react';
import { Image, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';

export default function EditProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  // const [photo, setPhoto] = useState("");

  const onChangeImage = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
    }
    const image = await launchImageLibrary(options);
    console.log(image);
  }

  return (
    <View style={styles.profileContainer}>
      <View style={styles.photoContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri: 'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png',
          }}
        />
        <Text 
          onPress={onChangeImage}
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
        <Text style={styles.textLabel}>First Name</Text>
        <TextInput style={styles.input} 
          placeholder={"Ross"}
          onChangeText={setFirstName}
          value={firstName} 
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.textLabel}>Last Name</Text>
        <TextInput 
        style={styles.input} 
          placeholder={"Newman"}
          onChangeText={setLastName}
          value={lastName} 
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.textLabel}>Bio</Text>
        <TextInput 
        style={styles.multilineInput} 
          placeholder={"Hi! I'm a second year. lol"}
          multiline
          numberOfLines={4}
          maxLength={40}
          onChangeText={setBio}
          value={bio} 
        />
      </View>
    </View>
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
    flex: 1,
    paddingVertical: 20,
    alignItems: 'center',
  },
  changeImageLabel: {
    marginTop: 5,
    color: "blue"
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
