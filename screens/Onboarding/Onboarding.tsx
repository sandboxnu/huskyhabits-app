import { useEffect, useState } from 'react';
import { Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';
import * as ImagePicker from 'expo-image-picker';
import { Buffer } from 'buffer';
import { Body, ButtonText, ColumnContainer, FormContainer, Heading, InputContainer, InputTextLabel, LargeTextInput, PrimaryButton, RowContainer, SmallTextInput, StyledImage } from '../../components/Common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HuskyHabitsBackground from "../../assets/images/Pawprints.png";
import Camera from "../../assets/images/camera.svg";
import Colors from '../../theme/Colors';

export default function Onboarding() {
  const [username, setUsername] = useState<string>('');
  //const [firstName, setFirstName] = useState<string>('');
  //const [lastName, setLastName] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [photoBuffer, setPhotoBuffer] = useState<Buffer | null>(null);
  const [photoURI, setPhotoURI] = useState<string>('');

  const isCurrentStep = true;

  // simulate name being autofilled from oauth
  useEffect(() => {
    setName('Ross Newman');
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

  function OnboardingHeader(props: any) {
    return(
      <View style={styles.header}>
        <Heading>Registration</Heading>
        <RowContainer>
          <OnboardingStep stepNum={1} title="User Info" />
          <OnboardingStep stepNum={2} title="Habits" />
          <OnboardingStep stepNum={3} title="Add Friends" />
        </RowContainer>
      </View>
    );
  }

  function OnboardingStep({stepNum, title}: any) {
    return(
      <ColumnContainer>
        <View style={[isCurrentStep ? styles.stepFilled : styles.step]}>
          <Heading style={styles.centerStepText}>{stepNum}</Heading>
        </View>
        <Body>{title}</Body>
      </ColumnContainer>
    );
  }

  return(
    <ImageBackground source={HuskyHabitsBackground} style={styles.imageBackground} imageStyle={styles.image}>
      <OnboardingHeader>
      </OnboardingHeader>
      <KeyboardAwareScrollView style={styles.container}>
        <FormContainer>
          <InputContainer>
            <InputTextLabel>Username</InputTextLabel>
            <SmallTextInput
              placeholder={"ross3102"}
              onChangeText={setUsername}
              value={username}
            />
          </InputContainer>
          <InputContainer>
            <InputTextLabel>Name</InputTextLabel>
            <SmallTextInput
              placeholder={"Ross Newman"}
              onChangeText={setName}
              value={name}
            />
          </InputContainer>
          <InputContainer>
            <InputTextLabel>Bio</InputTextLabel>
            <LargeTextInput
              onChangeText={setBio}
              value={bio}
            />
          </InputContainer>
          <InputContainer>
            <TouchableOpacity 
              onPress={onChangeImage}
            >
              <Text
                lightColor="black"//"blue"
                darkColor="black"//"#EEEE"
                style={styles.changeImageLabel}>
                Upload Profile Picture
              </Text>
            </TouchableOpacity>
            <StyledImage
              source={{
                uri: photoURI || 'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png',
              }}
            />
          </InputContainer>
        </FormContainer>
        <View style={styles.nextContainer}>
          <PrimaryButton>
            <ButtonText>Next</ButtonText>
          </PrimaryButton>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 120
    },
    centerStepText: {
      marginLeft: 13,
      marginTop: 5,
    },
    header: {
      /* Top Navigation Bar */
      position: "absolute",
      width: 375,
      height: 145,
      left: 0,
      top: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 2,  
      elevation: 5,
      // boxShadow: 0px 1px 8px rgba(0, 0, 0, 0.25);
      borderRadius: 30,
      backgroundColor: "#F8F8F0",
      margin: "auto",
      alignItems: "center",
      justifyContent: "center"
    },
    step: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: `${Colors.malamute}`,
      borderColor: `${Colors.clifford}`,
      marginVertical: 5,
      marginHorizontal: 30,
    },
    stepFilled: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: `${Colors.clifford}`,
      borderColor: `${Colors.clifford}`,
      marginVertical: 5,
      marginHorizontal: 30,
    },
    nextContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginRight: 20,
      backgroundColor: "transparent"
    },
    imageBackground: {
      width: '100%',
      height: '100%',
      flex: 1,
    },
    image: {
      opacity: 0.5
    },
    changeImageLabel: {
      marginVertical: 10,
      marginHorizontal: 5,
    },
    separator: {
      marginVertical: 15,
      height: 1,
      width: '80%',
    },
});
