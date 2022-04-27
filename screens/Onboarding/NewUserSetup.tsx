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
  RequiredLabel,
  RowContainer,
  SmallTextInput,
  StyledImage,
} from '../../components/Common';
import * as ImagePicker from 'expo-image-picker';
import { Buffer } from 'buffer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Camera from '../../assets/images/Camera.png';
import { Step } from './Onboarding';
import Colors from '../../theme/Colors';
import { Image } from 'react-native-elements/dist/image/Image';

interface NewUserSetupProps {
  username: string;
  setUsername: (user: string) => void;
  name: string;
  setName: (name: string) => void;
  bio: string;
  setBio: (bio: string) => void;
  photoBuffer: Buffer | null;
  setPhotoBuffer: (photoBuffer: Buffer | null) => void;
  photoURI: string;
  setPhotoURI: (photoURI: string) => void;
  onChangeImage: (image: any) => void;
  setCurrentStep: (step: Step) => void;
}

export default function NewUserSetup({
  username,
  setUsername,
  name,
  setName,
  bio,
  setBio,
  photoBuffer,
  setPhotoBuffer,
  photoURI,
  setPhotoURI,
  onChangeImage,
  setCurrentStep,
}: NewUserSetupProps) {
  const isIncomplete = username === '' || name === '';

  const submitUserData = () => {
    setUsername(username);
    setName(name);
    setBio(bio);
    setPhotoURI(photoURI);
    setPhotoBuffer(photoBuffer);
    setCurrentStep('habit');
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <FormContainer>
        <InputContainer>
          {/* TODO: Username validation: check if username already exists */}
          <InputTextLabel>
            Username
            <RequiredLabel>*</RequiredLabel>
          </InputTextLabel>
          <SmallTextInput onChangeText={setUsername} value={username} />
        </InputContainer>
        <InputContainer>
          <InputTextLabel>
            Name
            <RequiredLabel>*</RequiredLabel>
          </InputTextLabel>
          <SmallTextInput onChangeText={setName} value={name} />
        </InputContainer>
        <InputContainer>
          <InputTextLabel>Bio</InputTextLabel>
          <LargeTextInput
            multiline
            numberOfLines={4}
            maxLength={100}
            onChangeText={setBio}
            value={bio}
          />
        </InputContainer>
        <InputContainer>
          <Text
            lightColor="black" //"blue"
            darkColor="black" //"#EEEE"
            style={styles.changeImageLabel}
          >
            Upload Profile Picture
          </Text>
          <TouchableOpacity onPress={onChangeImage}>
            <View style={styles.imageContainer}>
              <Image
                source={photoURI ? { uri: photoURI } : Camera}
                style={photoURI ? styles.photoIcon : styles.cameraIcon}
              />
            </View>
          </TouchableOpacity>
        </InputContainer>
      </FormContainer>
      <View style={styles.nextContainer}>
        <PrimaryButton
          style={[isIncomplete && { backgroundColor: Colors.mastiff }]}
          onPress={submitUserData}
          disabled={isIncomplete}
        >
          <ButtonText>Next</ButtonText>
        </PrimaryButton>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 160,
  },
  changeImageLabel: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
  nextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
    backgroundColor: 'transparent',
  },
});
