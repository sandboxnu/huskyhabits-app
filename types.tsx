import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthStackParamList {}
  }
}

export type AuthStackParamList = {
  Onboarding: undefined;
  Root: NavigatorScreenParams<AuthTabParamList> | undefined;
  EditProfile: undefined;
  Profile: undefined;
  Login: undefined;
  NotFound: undefined;
};

export type AuthStackScreenProps<
  Screen extends keyof AuthStackParamList,
> = NativeStackScreenProps<AuthStackParamList, Screen>;

export type AuthTabParamList = {
  Onboarding: undefined;
  Profile: undefined;
  TabTwo: undefined;
};

export type RootModalParamList = {
  Profile: undefined;
  EditProfile: undefined;
};

export type RootStackModalProps<Screen extends keyof RootModalParamList> =
  NativeStackScreenProps<RootModalParamList>;

export type RootTabScreenProps<Screen extends keyof AuthTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<AuthTabParamList, Screen>,
    NativeStackScreenProps<AuthStackParamList>
  >;
