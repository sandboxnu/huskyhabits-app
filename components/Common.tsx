import { KeyboardAwareScrollView as DefaultScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import Text from '../theme/Text';

export const Heading = styled.Text`
  fontSize: ${Text.size.heading};
  fontFamily: ${Text.font.heading};
  fontWeight: bold;
`;

export const Body = styled.Text`
  fontFamily: ${Text.font.body};
`;

export const SmallTextInput = styled.TextInput`
  height: 40px;
  maxWidth: 100%;
  borderRadius: 8px;
  margin: 5px;
  padding: 10px;
  background: #FFFFFF;
  boxShadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
`;

export const LargeTextInput = styled.TextInput`
  height: 100px;
  maxWidth: 100%;
  borderRadius: 8px;
  margin: 5px;
  padding: 10px;
  background: #FFFFFF;
  boxShadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
`;

export const Container = styled.View`
  alignItems: center;
  justifyContent: center;
  padding: 10px;
  width: 100%;
`;

export const InputTextLabel = styled.Text`
  fontFamily: ${Text.font.body};
  width: 100px;
  fontSize: ${Text.size.body};
  margin: 5px;
  padding: 0;
`

export const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

export const CenterText = styled.Text`
  textAlign: center;
`;

export const RowContainer = styled.View`
  flexDirection: row;
  alignItems: center;
`;