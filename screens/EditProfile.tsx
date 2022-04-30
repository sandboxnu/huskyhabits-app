import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import {
  RowContainer,
  SmallTextInput,
  LargeTextInput,
  ScrollContainer,
  InputTextLabel,
  Container,
  StyledImage,
} from '../components/Common';
import * as ImagePicker from 'expo-image-picker';
import { Buffer } from 'buffer';

export default function EditProfile() {
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

  return (
    <ScrollContainer>
      <Container>
        <View style={styles.photoContainer}>
          <StyledImage
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
        <RowContainer>
          <InputTextLabel>Username</InputTextLabel>
          <SmallTextInput
            placeholder={'ross3102'}
            onChangeText={setUsername}
            value={username}
          />
        </RowContainer>
        <RowContainer>
          <InputTextLabel>First Name</InputTextLabel>
          <SmallTextInput
            placeholder={'Ross'}
            onChangeText={setFirstName}
            value={firstName}
          />
        </RowContainer>
        <RowContainer>
          <InputTextLabel>Last Name</InputTextLabel>
          <SmallTextInput
            placeholder={'Newman'}
            onChangeText={setLastName}
            value={lastName}
          />
        </RowContainer>
        <RowContainer>
          <InputTextLabel>Bio</InputTextLabel>
          <LargeTextInput
            placeholder={"Hi! I'm a second year. This is my bio. lol"}
            multiline
            numberOfLines={4}
            maxLength={100}
            onChangeText={setBio}
            value={bio}
          />
        </RowContainer>
      </Container>
    </ScrollContainer>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%',
  },
});
