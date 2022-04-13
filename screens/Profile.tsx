import { StyleSheet, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Text, View } from '../components/Themed';
import { Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useAppDispatch } from '../store/App.hooks';
import { AuthAction } from '../store/Auth.action';

export default function ProfileScreen() {
    const dispatch = useAppDispatch();


    const logout = () => {
        SecureStore.deleteItemAsync('auth-cookies').then(() => {
            alert('Logged out');
        })

        dispatch(AuthAction.setCookies(''));
    }

    return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri: 'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png',
          }}
        />
        <Text style={styles.title}>Ross Newman</Text>
        <Text style={styles.handle}>@ross3102</Text>
        <View style={styles.locationView}>
          <FontAwesome name="map-marker" size={20} style={{ marginRight: 5 }} />
          <Text>Boston, MA, USA</Text>
        </View>
        <Text style={styles.bio}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>

        <Button 
            onPress={logout}
            title="Log out"
            color="#ffffff">

        </Button>

        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />

        <View style={styles.groupsContainer}>
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
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#666',
    padding: 10,
    margin: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  handle: {
    fontSize: 20,
    color: '#999',
  },
  locationView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#666',
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 5,
  },
  bio: {
    textAlign: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
  },
  groupsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#666',
    width: '100%',
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
