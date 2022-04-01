import { useState } from 'react';
import { StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { View } from '../components/Themed';
import {
  Heading,
  Body,
  ScrollContainer,
  RowContainer,
  TitleText,
  ColContainer,
  LeftAlign,
  Container,
  CenteredRowContainer,
  SubHeadingItalic,
  ProfileBody,
  CenteredColContainer,
} from '../components/Common';
import Tape from '../assets/images/Tape.png';
import HuskyHabitsBackground from '../assets/images/Pawprints.png';
import Colors from '../theme/Colors';
import { RootTabScreenProps } from '../types';

export default function ProfileScreen({ navigation }: RootTabScreenProps<'Profile'>) {
  // TODO: Connect to backend
  const [profileData, setProfileData] = useState({
    name: 'Jaime Gonora',
    bio: 'Hi, I’m a fifth year at NEU! I love to dance, take photos, and listen to kpop (specifically songs with good dances tho)',
    numberOfFriends: 50,
    numberOfChallenges: 3,
    numberOfHabits: 6,
  })

  return (
    <ImageBackground
      source={HuskyHabitsBackground}
      style={styles.imageBackground}
      imageStyle={styles.image}
    >
      <ScrollContainer>
        <Container style={styles.container}>
          <LeftAlign>
            <TitleText style={{color: Colors.huskyYellow}}>@</TitleText>
            <TitleText>bagel_gatekeeper</TitleText>
          </LeftAlign>
          <CenteredRowContainer style={styles.mainContainer}>
            <CenteredColContainer>
              <Image source={Tape} style={styles.tape} />
              <View style={styles.shadowContainer}>
                <Image
                  source={{
                    uri: 'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png',
                  }}
                  style={styles.profilePicture}
                />
              </View>
            </CenteredColContainer>
            <ColContainer style={styles.padding}>
              <Heading style={styles.profileHeader}>{profileData.name}</Heading>
              <SubHeadingItalic> (she/her) </SubHeadingItalic>
              <RowContainer>
                <ProfileBody style={styles.yellowText}>{profileData.numberOfFriends} </ProfileBody>
                <Body style={styles.yellowText}>Friends </Body>
              </RowContainer>
              <RowContainer>
                <ProfileBody style={styles.yellowText}>{profileData.numberOfChallenges} </ProfileBody>
                <Body style={styles.yellowText}>Challenges </Body>
              </RowContainer>
              <RowContainer>
                <ProfileBody style={styles.yellowText}>{profileData.numberOfHabits} </ProfileBody>
                <Body style={styles.yellowText}>Habits </Body>
              </RowContainer>
              <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={styles.editProfileButton}>
                <ProfileBody style={styles.linkText}>
                  Edit Profile
                </ProfileBody>
              </TouchableOpacity>
            </ColContainer>
          </CenteredRowContainer>
          <Heading style={[styles.smallText, styles.padding]}>{profileData.bio}</Heading>
        </Container>
      </ScrollContainer>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
  },
  profilePicture: {
    width: 152,
    height: 152,
    //box-shadow: 4px 5px 6px rgba(0, 0, 0, 0.25);
  },
  smallText: {
    fontSize: 14
  },
  linkText: {
    color: '#fff',
    lineHeight: 30,
    textAlign: 'center',
  },
  editProfileButton: {
    margin: 10,
    height: 33,
    width: 150,
    backgroundColor: Colors.clifford,
    borderRadius: 20,
  },
  mainContainer: {
    marginVertical: 20,
  },
  tape: {
    width: 99,
    height: 20,
    marginBottom: -10,
    zIndex: 1,
  },
  shadowContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    alignItems: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  image: {
    opacity: 0.4,
  },
  yellowText: {
    color: Colors.huskyYellow,
    fontSize: 18,
    lineHeight: 25
  },
  padding: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  profileHeader: {
    flexWrap: 'wrap'
  }
});
