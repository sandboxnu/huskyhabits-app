import { StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { View } from '../components/Themed';
import  Text  from '../theme/Text';
import { Heading, Body, CenterText, ScrollContainer, RowContainer, TitleText, ColContainer, LeftAlign, CenteredContainer, Container, CenteredRowContainer, SubHeadingItalic, ProfileBody, CenteredColContainer } from '../components/Common';
import Tape from '../assets/images/Tape.png';
import Colors from '../theme/Colors';

export default function ProfileScreen() {
  return (
    <ScrollContainer>
      <Container>
        <LeftAlign>
          <TitleText>
            @bagel_gatekeeper
          </TitleText>
        </LeftAlign>
        
        <CenteredRowContainer>
          <CenteredColContainer>
          <Image source={Tape} style={styles.tape}/>
          <View style={styles.shadowContainer}>
            <Image source={{
                uri: 'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png'
              }} style={styles.profilePicture}/>
          </View>
          </CenteredColContainer>
          
          <ColContainer> 
              <Heading> Jaime Gonora </Heading>
              <SubHeadingItalic> (she/her) </SubHeadingItalic>
              
              <RowContainer>
                <ProfileBody> 50 </ProfileBody>
                <Body>Friends </Body>
              </RowContainer>

              <RowContainer>
                <ProfileBody> 3 </ProfileBody>
                <Body>Challenges </Body>
              </RowContainer>
              
              <RowContainer>
                <ProfileBody> 6 </ProfileBody>
                <Body>Habits </Body>
              </RowContainer>
             
          </ColContainer>

        </CenteredRowContainer>
      </Container>
    </ScrollContainer>
  );
}

const styles = StyleSheet.create({
  profilePicture: {
    width: 152,
    height: 152,
    //box-shadow: 4px 5px 6px rgba(0, 0, 0, 0.25);
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
  yellowColor: {
    color: Colors.huskyYellow,
  },
});
