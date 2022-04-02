import { useState, useEffect } from 'react';
import { StyleSheet, Image, ImageBackground, TouchableOpacity, Touchable } from 'react-native';
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
import Notebook from '../assets/images/Notebook.png';
import Colors from '../theme/Colors';
import { RootTabScreenProps } from '../types';
import Text from '../theme/Text';

interface NotebookTabProps {
  title: string;
  setCurrentTab: (title: string) => void;
}

interface ChallengeProps {
  name: string;
}

export default function ProfileScreen({ navigation }: RootTabScreenProps<'Profile'>) {
  const [profileData, setProfileData] = useState({
    username: 'bagel_gatekeeper',
    name: 'Jaime Gonora',
    bio: 'Hi, I’m a fifth year at NEU! I love to dance, take photos, and listen to kpop (specifically songs with good dances tho)',
    numberOfFriends: 50,
    numberOfChallenges: 3,
    numberOfHabits: 6,
  })
  const [challengeData, setChallengeData] = useState([
    { name: 'the bookies'}
  ]);
  const [currentTab, setCurrentTab] = useState('Challenges');

  // TODO: Connect to backend
  useEffect(() => {
    
  }, []);

  function NotebookTab({ title, setCurrentTab }: NotebookTabProps) {
    return(
      <TouchableOpacity 
        onPress={() => setCurrentTab(title)} 
        style={[styles.tab, currentTab === title && styles.tabSelected]}>
        <Heading style={styles.tabText}>{title}</Heading>
      </TouchableOpacity>
    );
  };

  function Challenge({ name }: ChallengeProps) {
    return(
      <View style={styles.challenge}>
        <RowContainer>
          <ColContainer>
            <Heading style={styles.challengeHeading}>{name}</Heading>
            <SubHeadingItalic>9 members</SubHeadingItalic>
            <SubHeadingItalic style={styles.redText}>Last update: 2:32 pm</SubHeadingItalic>
          </ColContainer>
        </RowContainer>
      </View>
    );
  };

  return (
    <ImageBackground
      source={HuskyHabitsBackground}
      style={styles.imageBackground}
      imageStyle={styles.image}
    >
      <ScrollContainer>
        <Container style={styles.container}>
          <LeftAlign>
            <TitleText style={styles.yellowText}>@</TitleText>
            <TitleText>{profileData.username}</TitleText>
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
                <ProfileBody style={[styles.yellowText, styles.profileInfoText]}>{profileData.numberOfFriends} </ProfileBody>
                <Body style={[styles.yellowText, styles.profileInfoText]}>Friends </Body>
              </RowContainer>
              <RowContainer>
                <ProfileBody style={[styles.yellowText, styles.profileInfoText]}>{profileData.numberOfChallenges} </ProfileBody>
                <Body style={[styles.yellowText, styles.profileInfoText]}>Challenges </Body>
              </RowContainer>
              <RowContainer>
                <ProfileBody style={[styles.yellowText, styles.profileInfoText]}>{profileData.numberOfHabits} </ProfileBody>
                <Body style={[styles.yellowText, styles.profileInfoText]}>Habits </Body>
              </RowContainer>
              <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={styles.editProfileButton}>
                <ProfileBody style={styles.linkText}>
                  Edit Profile
                </ProfileBody>
              </TouchableOpacity>
            </ColContainer>
          </CenteredRowContainer>
          <Heading style={[styles.smallText, styles.padding]}>{profileData.bio}</Heading>
          <Image source={Notebook} style={styles.notebook} />
          <Container style={styles.notebookPaper}>
            <View style={styles.tabContainer}>
              <NotebookTab title={'Challenges'} setCurrentTab={setCurrentTab} />
              <NotebookTab title={'Habits'} setCurrentTab={setCurrentTab} />
              <NotebookTab title={'Posts'} setCurrentTab={setCurrentTab} />
            </View>
            { currentTab === 'Challenges' &&
              <View style={styles.tabView}>
                <View style={[styles.textContainer, styles.shadowContainer]}>
                  <Heading style={[styles.infoText, styles.yellowText]}>
                    Challenges are groups you can make/join with your friends where you compete and/or work together to complete habits consistently!
                  </Heading>
                </View>
                <Challenge name={'the bookies'} />
              </View>
            }
          </Container>
        </Container>
      </ScrollContainer>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
  },
  challenge: {
    width: '100%',
    height: 90,
    marginBottom: 10,
    padding: 10,
    backgroundColor: Colors.malamute,
    borderRadius: 18,
    borderWidth: 3.3,
    borderColor: Colors.goldendoodle
  },
  challengeHeading: {
    fontSize: 16
  },
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between'
  },
  tab: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: -40,
    backgroundColor: 'white',
    paddingTop: 8,
    width: 95,
    height: 33,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.25,
    // shadowRadius: 2,
  },
  tabSelected: {
    borderBottomColor: Colors.clifford,
    borderBottomWidth: 3,
  },
  tabText: {
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 13,
    lineHeight: 15,
    textAlign: 'center',
  },
  tabView: {
    marginLeft: 60,
    marginRight: 15,
    flex: 1,
    top: 0,
    justifyContent: 'flex-start',

  },
  textContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.tintedYellow,
    marginVertical: 20,
  },
  notebook: {
    position: 'absolute',
    height: 470,
    top: 400,
    zIndex: 1,
  },
  notebookPaper: {
    backgroundColor: 'white',
    height: 520,
    marginTop: 50,
    marginHorizontal: 10,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: -3 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 30,
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
    width: 160,
    backgroundColor: Colors.clifford,
    borderRadius: 20,
  },
  mainContainer: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  tape: {
    width: 99,
    height: 20,
    marginBottom: -10,
    zIndex: 1,
  },
  shadowContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
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
  },
  redText: {
    color: Colors.clifford,
  },
  profileInfoText: {
    fontSize: 18,
    lineHeight: 25
  },
  padding: {
    paddingLeft: 20,
  },
  profileHeader: {
    flexWrap: 'wrap'
  }
});
