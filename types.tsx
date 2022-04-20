/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

 import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
 import {
   CompositeScreenProps,
   NavigatorScreenParams,
 } from '@react-navigation/native';
 import { NativeStackScreenProps } from '@react-navigation/native-stack';
 
 declare global {
   namespace ReactNavigation {
     interface RootParamList extends RootStackParamList {}
   }
 }

 export type AuthStackParamList = {
   Root: NavigatorScreenParams<AuthTabParamList> | undefined;
   EditProfile: undefined;
   NotFound: undefined;
 }

 export type AuthStackScreenProps = {
 }
 
 export type RootStackParamList = {
   Root: NavigatorScreenParams<AuthTabParamList> | undefined;
   Profile: undefined;
   EditProfile: undefined;
   Login: undefined;
   NotFound: undefined;
 };
 
 export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
   NativeStackScreenProps<RootStackParamList, Screen>;
 
 export type AuthTabParamList = {
   Profile: undefined;
   TabTwo: undefined;
 };
 
 export type RootModalParamList = {
   Profile: undefined;
   EditProfile: undefined;
 }

 export type RootParamList = {
  Login: undefined;
}

export type RootScreenProps<Screen extends keyof RootParamList> =
  NativeStackScreenProps<RootParamList, Screen>; 
 
 export type RootStackModalProps<Screen extends keyof RootModalParamList> = 
 NativeStackScreenProps<RootModalParamList, Screen>;
 
 export type RootTabScreenProps<Screen extends keyof AuthTabParamList> =
   CompositeScreenProps<
     BottomTabScreenProps<AuthTabParamList, Screen>,
     NativeStackScreenProps<RootStackParamList>
   >;