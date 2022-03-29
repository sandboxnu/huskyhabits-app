import { StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Text, View } from '../components/Themed';
import { Heading, Body, CenterText, Container, ScrollContainer } from '../components/Common';

export default function ProfileScreen() {
  return (
    <ScrollContainer>
      <Container>
        <Image
          style={styles.profileImage}
          source={{
            uri: 'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png',
          }}
        />
        <Heading>Ross Newman</Heading>
        <Text style={styles.handle}>@ross3102</Text>
        <View style={styles.locationView}>
          <FontAwesome name="map-marker" size={20} style={{ marginRight: 5 }} />
          <Text>Boston, MA, USA</Text>
        </View>
        <CenterText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </CenterText>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Container>
          <Text style={styles.title}>Groups</Text>
          <View style={styles.group}>
            <Image
              style={styles.groupImage}
              source={{
                uri: 'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png',
              }}
            />
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>Group 1</Text>
              <Text>10 members</Text>
            </View>
          </View>
          <View style={styles.group}>
            <Image
              style={styles.groupImage}
              source={{
                uri: 'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png',
              }}
            />
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>Group 2</Text>
              <Text>150 members</Text>
            </View>
          </View>
          <View style={styles.group}>
            <Image
              style={styles.groupImage}
              source={{
                uri: 'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png',
              }}
            />
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>Group 3</Text>
              <Text>2 members</Text>
            </View>
          </View>
          <View style={styles.group}>
            <Image
              style={styles.groupImage}
              source={{
                uri: 'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png',
              }}
            />
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>Group 4</Text>
              <Text>50 members</Text>
            </View>
          </View>
        </Container>
      </Container>
    </ScrollContainer>
  );
}

const styles = StyleSheet.create({
  handle: {
    fontSize: 20,
  },
  locationView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  group: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#aaa',
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
    marginTop: 10,
  },
  groupImage: {
    width: 100,
    height: 100,
  },
  groupInfo: {
    backgroundColor: '#aaa',
    margin: 10,
  },
  groupName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
