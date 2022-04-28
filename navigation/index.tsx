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
import React, { useState, useEffect } from 'react';
import { Button, ColorSchemeName, Pressable } from 'react-native';
import useColorScheme from '../hooks/useColorScheme';
import LoginPage from '../screens/LoginPage';
import EditProfile from '../screens/EditProfile';
import NotFoundScreen from '../screens/NotFoundScreen';
import ProfileScreen from '../screens/Profile';
import TabTwoScreen from '../screens/TabTwoScreen';
import {
  AuthStackModalProps,
  AuthStackParamList,
  AuthStackScreenProps,
  AuthTabParamList,
  AuthTabScreenProps,
  RootScreenProps,
  RootParamList,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { useSelector } from 'react-redux';
import { selectCookies } from '../store/selectors/Auth.selector';
import Onboarding from '../screens/Onboarding/Onboarding';
import Colors from '../theme/Colors';

/*
 * We use react-navigation to render different Navigators depending on the screen we wish to render.
 * Navigation checks whether or not an authenticated state is currently stored.
 * - If so, renders accessible screens for the user.
 * The corresponding props and types for these screens are defined accordingly.
 */
export default function Navigation({ colorScheme }: {
    colorScheme: ColorSchemeName;
}) {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const cookies = useSelector(selectCookies);

    useEffect(() => {
        setAuthenticated(cookies !== '');
    }, [cookies]);

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
            <AuthStack.Screen name="Onboarding" component={Onboarding} />
            <AuthStack.Screen name="Profile" component={BottomTabNavigator} />
            <AuthStack.Screen
                name="NotFound"
                component={NotFoundScreen}
                options={{ title: 'Oops!' }}
            />
            <AuthStack.Group screenOptions={{ presentation: 'modal' }}>
                <AuthStack.Screen
                    name="EditProfile"
                    component={EditProfile}
                    options={({ navigation }: AuthStackModalProps<'EditProfile'>) => ({
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
        <BottomTab.Navigator initialRouteName="Profile" screenOptions={{}}>
            <BottomTab.Screen
                name="Profile"
                component={ProfileScreen}
                options={({ navigation }: AuthTabScreenProps<'Profile'>) => ({
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
