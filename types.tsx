import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthenticatedStackParamList {}
  }
}

export type AuthenticatedStackParamList = {
  Onboarding: undefined;
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  EditProfile: undefined;
  NotFound: undefined;
};

export type AuthenticatedStackScreenProps<
  Screen extends keyof AuthenticatedStackParamList,
> = NativeStackScreenProps<AuthenticatedStackParamList, Screen>;

export type RootTabParamList = {
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

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<AuthenticatedStackParamList>
  >;
