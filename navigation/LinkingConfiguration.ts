/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { AuthStackParamList } from '../types';

const linking: LinkingOptions<AuthStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      // Look at register
      Root: {
        screens: {
          Onboarding: {
            screens: {
              Onboarding: '/onboarding',
            }
          },
          Profile: {
            screens: {
              Profile: 'profile',
              EditProfile: 'modal',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
        },
      },
      Login: 'login',
      NotFound: '*',
    },
  },
};

export default linking;
