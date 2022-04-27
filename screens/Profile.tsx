import { useState, useEffect } from 'react';
import { StyleSheet, Image, ImageBackground, TouchableOpacity, Touchable, Dimensions } from 'react-native';
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
import { AuthTabScreenProps } from '../types';
import Text from '../theme/Text';
import NotebookTab from '../components/NotebookTabComponent'
import Challenge from '../components/ChallengeComponent';

export default function ProfileScreen({ navigation }: AuthTabScreenProps<'Profile'>) {
  const [profileData, setProfileData] = useState({
    username: 'bagel_gatekeeper',
    name: 'Jaime Gonora',
    bio: 'Hi, I’m a fifth year at NEU! I love to dance, take photos, and listen to kpop (specifically songs with good dances tho)',
    numberOfFriends: 50,
    numberOfChallenges: 3,
    numberOfHabits: 6,
  })
  const [challengeData, setChallengeData] = useState([
    { name: '📚 the bookies' },
    { name: '😭 trying our best' }
  ]);
  const [currentTab, setCurrentTab] = useState('Challenges');
  const windowHeight = Dimensions.get('window').height;

  // TODO: Connect to backend
  useEffect(() => {

  }, []);
  const challengesToRender = challengeData.map(challenge => <Challenge key={challenge.name} name={challenge.name} />);


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
          <Container style={styles.notebookPaper}>
            <View style={styles.tabContainer}>
              <NotebookTab title={'Challenges'} setCurrentTab={setCurrentTab} currentTab={currentTab} />
              <NotebookTab title={'Habits'} setCurrentTab={setCurrentTab} currentTab={currentTab}/>
              <NotebookTab title={'Posts'} setCurrentTab={setCurrentTab} currentTab={currentTab}/>
            </View>
            { currentTab === 'Challenges' &&
              <View style={styles.tabView}>
                <View style={[styles.textContainer, styles.shadowContainer]}>
                  <Heading style={[styles.infoText, styles.yellowText]}>
                    Challenges are groups you can make/join with your friends where you compete and/or work together to complete habits consistently!
                  </Heading>
                </View>
                {challengesToRender}
              </View>
            }
          </Container>
          <View style={styles.notebook}>
            <Image source={Notebook}/>
          </View>

        </Container>
      </ScrollContainer>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
  },

  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between'
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
    backgroundColor: 'white',
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
    //zIndex: 1,
    elevation: 5,
    shadowColor: 'transparent',
    backgroundColor: 'transparent',
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
    marginBottom: 10,
    marginTop: 5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  group: {
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
