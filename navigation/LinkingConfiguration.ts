/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { AllStackParamList } from '../types';

const linking: LinkingOptions<AllStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Auth: {
        screens: {
          Onboarding: {
            screens: {
              Onboarding: '/onboarding',
            },
          },
          Profile: {
            screens: {
              Profile: 'profile',
              EditProfile: 'modal',
            },
          },
          NotFound: '*',
        },
      },
      Login: 'login',
    },
  },
};

export default linking;
