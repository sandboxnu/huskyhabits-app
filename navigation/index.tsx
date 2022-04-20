/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
 import { FontAwesome } from '@expo/vector-icons';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import {
   NavigationContainer,
   DefaultTheme,
   DarkTheme,
 } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import * as React from 'react';
 import { Button, ColorSchemeName, Pressable } from 'react-native';
 import useColorScheme from '../hooks/useColorScheme';
 import LoginPage from '../screens/LoginPage';
 import EditProfile from '../screens/EditProfile';
 import NotFoundScreen from '../screens/NotFoundScreen';
 import ProfileScreen from '../screens/Profile';
 import TabTwoScreen from '../screens/TabTwoScreen';
 import {
   RootStackModalProps,
   AuthStackParamList,
   AuthStackScreenProps,
   AuthTabParamList,
   RootTabScreenProps,
   RootScreenProps,
   RootParamList,
 } from '../types';
 import LinkingConfiguration from './LinkingConfiguration';
 import * as SecureStore from 'expo-secure-store';
import { useSelector } from 'react-redux';
import { selectCookies } from '../store/Auth.selector';

 export default function Navigation({
   colorScheme,
 }: {
   colorScheme: ColorSchemeName;
 }) {

    // const isUser: boolean = false
   const [authenticated, setAuthenticated] = React.useState<boolean>(false);
   const cookies = useSelector(selectCookies);

   React.useEffect(() => {
    setAuthenticated(cookies !== '');

   }, [ cookies ]);

   return (
     <NavigationContainer
       linking={LinkingConfiguration}
       theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
     >
       {authenticated ? <AuthNavigator /> : <RegisterNavigator />}
     </NavigationContainer>
   );
 }

 /**
  * AuthNavigator holds all screens for authenticated users.
  */
 const AuthStack = createNativeStackNavigator<AuthStackParamList>();

 function AuthNavigator() {
   return (
     <AuthStack.Navigator screenOptions={{ headerShown: false }}>
       <AuthStack.Screen
         name="Root"
         component={BottomTabNavigator}
       />
       <AuthStack.Screen
         name="NotFound"
         component={NotFoundScreen}
         options={{ title: 'Oops!' }}
       />
       <AuthStack.Group screenOptions={{ presentation: 'modal' }}>
         <AuthStack.Screen
           name="EditProfile"
           component={EditProfile}
           options={({ navigation }: RootStackModalProps<'EditProfile'>) => ({
             title: 'Edit Profile',
             headerRight: () => (
               <Button
                 onPress={() => navigation.navigate('Profile')}
                 title="Done"
               />
             ),
           })}
         />
       </AuthStack.Group>
     </AuthStack.Navigator>
   );
 }
 
 /**
  * RegisterNavigator holds all screens for unauthenticated users.
  */
 const RootStack = createNativeStackNavigator<RootParamList>();

 function RegisterNavigator() {
   return (
     <RootStack.Navigator>
       <RootStack.Screen
         name="Login"
         component={LoginPage}
         options={{ headerShown: false }}
       />
     </RootStack.Navigator>
   );
 }
 
 /**
  * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
  * https://reactnavigation.org/docs/bottom-tab-navigator
  */
 const BottomTab = createBottomTabNavigator<AuthTabParamList>();
 
 function BottomTabNavigator() {
   const colorScheme = useColorScheme();
 
   return (
     <BottomTab.Navigator
       initialRouteName="Profile"
       screenOptions={{
       }}
     >
       <BottomTab.Screen
         name="Profile"
         component={ProfileScreen}
         options={({ navigation }: RootTabScreenProps<'Profile'>) => ({
           title: 'Profile',
           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
           headerRight: () => (
             <Pressable
               onPress={() => navigation.navigate('EditProfile')}
               style={({ pressed }) => ({
                 opacity: pressed ? 0.5 : 1,
               })}
             >
               <FontAwesome
                 name="pencil-square-o"
                 size={25}
                 style={{ marginRight: 15 }}
               />
             </Pressable>
           ),
         })}
       />
       {/* <BottomTab.Screen
         name="TabTwo"
         component={TabTwoScreen}
         options={{
           title: 'Tab Two',
           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
         }}
       /> */}
     </BottomTab.Navigator>
   );
 }
 
 /**
  * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
  */
 function TabBarIcon(props: {
   name: React.ComponentProps<typeof FontAwesome>['name'];
   color: string;
 }) {
   return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
 }