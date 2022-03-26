import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View, TextInput } from '../../components/Themed';
import {
  Body,
  ButtonText,
  ColumnContainer,
  FormContainer,
  Heading,
  InputContainer,
  InputTextLabel,
  LargeTextInput,
  PrimaryButton,
  RowContainer,
  SmallTextInput,
  StyledImage,
} from '../../components/Common';
import * as ImagePicker from 'expo-image-picker';
import { Buffer } from 'buffer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Step } from './Onboarding';

interface NewUserSetupProps {
  username: string;
  setUsername: (user: string) => void;
  onChangeImage: (image: any) => void;
  bio: string;
  setBio: (bio: string) => void;
  setCurrentStep: (step: Step) => void;
}

export default function NewUserSetup({ setCurrentStep }: NewUserSetupProps) {
  const [username, setUsername] = useState<string>('');
  //const [firstName, setFirstName] = useState<string>('');
  //const [lastName, setLastName] = useState<string>('');
  const [name, setName] = useState<string>('');
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
    <KeyboardAwareScrollView style={styles.container}>
      <FormContainer>
        <InputContainer>
          <InputTextLabel>Username</InputTextLabel>
          <SmallTextInput
            placeholder={'ross3102'}
            onChangeText={setUsername}
            value={username}
          />
        </InputContainer>
        <InputContainer>
          <InputTextLabel>Name</InputTextLabel>
          <SmallTextInput
            placeholder={'Ross Newman'}
            onChangeText={setName}
            value={name}
          />
        </InputContainer>
        <InputContainer>
          <InputTextLabel>Bio</InputTextLabel>
          <LargeTextInput onChangeText={setBio} value={bio} />
        </InputContainer>
        <InputContainer>
          <TouchableOpacity onPress={onChangeImage}>
            <Text
              lightColor="black" //"blue"
              darkColor="black" //"#EEEE"
              style={styles.changeImageLabel}
            >
              Upload Profile Picture
            </Text>
          </TouchableOpacity>
          <StyledImage
            source={{
              uri:
                photoURI ||
                'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png',
            }}
          />
        </InputContainer>
      </FormContainer>
      <View style={styles.nextContainer}>
        <PrimaryButton onPress={() => setCurrentStep('habit')}>
          <ButtonText>Next</ButtonText>
        </PrimaryButton>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 120,
  },
  changeImageLabel: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  nextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
    backgroundColor: 'transparent',
  },
});
