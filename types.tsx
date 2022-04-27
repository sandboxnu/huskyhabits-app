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

// type for all screens
export type AllStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
  Login: undefined;
}

// type for authenticated screens
export type AuthStackParamList = {
  Onboarding: undefined;
  EditProfile: undefined;
  Profile: undefined;
  NotFound: undefined;
};

// type for authenticated tabs
export type AuthTabParamList = {
  Profile: undefined;
  TabTwo: undefined;
};

// type for authenticated modals and screens that navigate to/from modals
export type AuthModalParamList = {
  Profile: undefined;
  EditProfile: undefined;
};

// type for unauthenticated screens
export type RootParamList = {
  Login: undefined;
}

export type AuthStackScreenProps<
  Screen extends keyof AuthStackParamList,
> = NativeStackScreenProps<AuthStackParamList, Screen>;

export type AuthStackModalProps<Screen extends keyof AuthModalParamList> =
  NativeStackScreenProps<AuthModalParamList>;

export type AuthTabScreenProps<Screen extends keyof AuthTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<AuthTabParamList, Screen>,
    NativeStackScreenProps<AuthStackParamList>
  >;

export type RootScreenProps<Screen extends keyof RootParamList> = 
  NativeStackScreenProps<RootParamList>;
