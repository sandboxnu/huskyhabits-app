import { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import {
  SmallTextInput,
  LargeTextInput,
  ProfileBody,
} from '../components/Common';
import * as ImagePicker from 'expo-image-picker';
import { Buffer } from 'buffer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../theme/Colors';
import { AuthStackModalProps } from '../types';
import ProfileServiceClient from '../services/profile/profileService';
import {
  GetProfileResponse,
  GetProfilePhotoResponse,
} from '../services/profile/types';

export default function EditProfile({
  navigation,
}: AuthStackModalProps<'EditProfile'>) {
  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [photoBuffer, setPhotoBuffer] = useState<Buffer | null>(null);
  const [photoURI, setPhotoURI] = useState<string>('');

  const [profileOrig, setProfileOrig] = useState<GetProfileResponse | null>();
  const [avatarOrig, setAvatarOrig] =
    useState<GetProfilePhotoResponse | null>();
  const [error, setError] = useState<string>('');

  // TODO: Make getting the profile data work
  const profileServiceClient: ProfileServiceClient = new ProfileServiceClient();

  const fetchData = async () => {
    try {
      const profileData = await profileServiceClient.getCurrentProfile();
      setProfileOrig(profileData);
      const profilePicData =
        await profileServiceClient.getCurrentProfilePhoto();
      setAvatarOrig(profilePicData);
    } catch (err: any) {
      console.log(err);
      setError(err);
    }
  };

  console.log(profileOrig);

  // fetch profile data
  useEffect(() => {
    if (!profileOrig || !avatarOrig) {
      fetchData();
    }
  }, []);

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

  const submitChanges = async () => {
    // Add requests to backend server here to update profile info
    navigation.navigate('Profile');
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.photoContainer}>
          <Image
            style={styles.profileImage}
            source={{
              uri:
                photoURI ||
                'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png',
            }}
          />
          <Text
            onPress={onChangeImage}
            lightColor="blue"
            darkColor="#EEEE"
            style={styles.changeImageLabel}
          >
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
          <SmallTextInput
            style={[styles.fixedTextInput, styles.shadowed]}
            onChangeText={(text) => setUsername(text)}
            defaultValue={profileOrig?.username || ''}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Name</Text>
          <SmallTextInput
            style={[styles.fixedTextInput, styles.shadowed]}
            onChangeText={(text) => setName(text)}
            defaultValue={profileOrig?.name || ''}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Bio</Text>
          <LargeTextInput
            multiline
            numberOfLines={4}
            style={[styles.fixedTextInput, styles.shadowed]}
            onChangeText={(text) => setBio(text)}
            defaultValue={profileOrig?.bio || ''}
          />
        </View>
      </View>
      <TouchableOpacity onPress={submitChanges} style={styles.editButton}>
        <ProfileBody style={styles.linkText}>Save</ProfileBody>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.tintedYellow,
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  photoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    backgroundColor: 'transparent',
  },
  profileContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: 'transparent',
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%',
  },
  fixedTextInput: {
    width: 200,
  },
  shadowed: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowColor: 'black',
    elevation: 2,
  },
  editButton: {
    margin: 10,
    height: 33,
    paddingHorizontal: 30,
    alignSelf: 'center',
    backgroundColor: Colors.clifford,
    borderRadius: 20,
  },
  linkText: {
    color: '#fff',
    lineHeight: 30,
    textAlign: 'center',
  },
});
