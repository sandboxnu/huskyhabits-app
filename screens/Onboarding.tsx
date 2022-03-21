import { useState } from 'react';
import { Button, Image, StyleSheet } from 'react-native';
import { Text, View, TextInput } from '../components/Themed';
import * as ImagePicker from 'expo-image-picker';
import { Buffer } from 'buffer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface SetupUsernameProps {
    username: string,
    setUsername: (name: string) => void,
    setStep: (step: Step) => void
}

interface SetupPhotoProps {
  photoURI: string,
  onChangeImage: () => void,
  setStep: (step: Step) => void
}

interface SetupInfoProps {
  username: string,
  firstName: string,
  setFirstName: (name: string) => void,
  lastName: string,
  setLastName: (name: string) => void,
  bio: string,
  setBio: (bio: string) => void,
  setStep: (step: Step) => void
}

type Step = 'username' | 'info' | 'photo';

const SetupUsername = ({username, setUsername, setStep}: SetupUsernameProps) => (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.title} lightColor='blue' darkColor='#eeee'>Choose a username</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} 
            placeholder={"username"}
            onChangeText={setUsername}
            value={username} 
            lightColor="gray"
            darkColor="white"
          />
        </View>
        <Button
            onPress={() => setStep('info')}
            disabled={username === ''}
            title="next"
        />
      </View>
    </KeyboardAwareScrollView>
);

const SetupInfo = ({username, firstName, setFirstName, lastName, setLastName, bio, setBio, setStep}: SetupInfoProps) => (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.title} lightColor='blue' darkColor='#eeee'>Welcome, {username}!</Text>
        <Text style={styles.title} lightColor='blue' darkColor='#eeee'>Tell us about yourself</Text>
        <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>First Name</Text>
            <TextInput style={styles.input} 
                placeholder={"John"}
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
                placeholder={"Doe"}
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
                placeholder={"Enter bio here"}
                multiline
                numberOfLines={4}
                maxLength={40}
                onChangeText={setBio}
                value={bio} 
                lightColor="gray"
                darkColor="white"
            />
        </View>
        <Button
            onPress={() => setStep('photo')}
            disabled={firstName === '' || lastName === ''}
            title="next"
        />
      </View>
    </KeyboardAwareScrollView>
);

const SetupPhoto = ({photoURI, onChangeImage, setStep}: SetupPhotoProps) => (
    <View style={styles.photoContainer}>
        <Text style={styles.title} lightColor='blue' darkColor='#eeee'>Lastly, add a profile picture</Text>
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
        <Button
            onPress={() => setStep('photo')}
            disabled={photoURI === ''}
            title="next"
        />
    </View>
);

export default function OnboardingScreen() {
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [photoBuffer, setPhotoBuffer] = useState<Buffer | null>(null);
  const [photoURI, setPhotoURI] = useState<string>("");
  const [step, setStep] = useState<Step>('username');

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
    <div>
        { step === 'username' && 
            <SetupUsername 
                username={username} setUsername={setUsername} 
                setStep={setStep} 
            /> 
        }
        { step === 'info' && 
            <SetupInfo 
                username={username}
                firstName={firstName} setFirstName={setFirstName} 
                lastName={lastName} setLastName={setLastName} 
                bio={bio} setBio={setBio}
                setStep={setStep} 
            /> 
        }
        { step === 'photo' && 
            <SetupPhoto 
                photoURI={photoURI}
                onChangeImage={onChangeImage}
                setStep={setStep}
            /> 
        }
    </div>
  )
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
  nextButton: {
      marginVertical: 10
  }
});
